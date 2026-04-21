# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Importamos CORS
from app.models import domain
from app.db.database import engine
from app.api import verbs 

domain.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Verb Swipe API",
    description="Backend para la app de aprendizaje de idiomas",
    version="1.0.0"
)

# 2. Configuramos CORS para permitir que React (y luego tu app móvil) se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción pondremos la URL exacta de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verbs.router, prefix="/api/verbs", tags=["Verbos"])

@app.get("/")
def read_root():
    return {"status": "success", "message": "¡El motor de FastAPI está funcionando perfectamente, vanni!"}