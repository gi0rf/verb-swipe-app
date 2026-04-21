# backend/app/models/domain.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relación bidireccional
    progress = relationship("UserVerbProgress", back_populates="user")

class Verb(Base):
    __tablename__ = "verbs"

    id = Column(Integer, primary_key=True, index=True)
    base_form = Column(String, index=True, nullable=False)
    spanish = Column(String, nullable=False)
    gerund = Column(String, nullable=False)
    example = Column(String, nullable=False)
    
   
    is_active = Column(Boolean, default=True) 
    
    progress = relationship("UserVerbProgress", back_populates="verb")

class UserVerbProgress(Base):
    __tablename__ = "user_verb_progress"
    
    # Esta tabla es el CEREBRO de tu app. Conecta Usuarios con Verbos.
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    verb_id = Column(Integer, ForeignKey("verbs.id"), nullable=False)
    
    # Para el algoritmo tipo "Tinder" (Spaced Repetition)
    consecutive_corrects = Column(Integer, default=0) # Si acierta mucho, no se lo mostramos pronto
    next_review_date = Column(DateTime, default=datetime.utcnow) # ¿Cuándo le toca repasar este verbo?
    is_mastered = Column(Boolean, default=False)
    
    # Relaciones
    user = relationship("User", back_populates="progress")
    verb = relationship("Verb", back_populates="progress")