# backend/app/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# URL de la base de datos local (SQLite). 
# Cuando usemos Neon en producción, esta será la única línea que cambiaremos.
SQLALCHEMY_DATABASE_URL = "sqlite:///./verb_swipe.db"

# engine es el motor que se comunica con la base de datos
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Esto solo se requiere para SQLite
)

# SessionLocal es la fábrica de "sesiones" o conexiones individuales
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Función inyectable (Dependency) que le dará una conexión a cada petición que llegue a tu API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()