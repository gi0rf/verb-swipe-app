# backend/app/api/verbs.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.models.domain import Verb
from app.schemas.verb_schema import VerbCreate, VerbResponse
from app.db.database import get_db

# APIRouter es como un mini-FastAPI dedicado solo a esta sección
router = APIRouter()

# 1. Ruta POST: Para agregar un verbo nuevo a la base de datos
@router.post("/", response_model=VerbResponse)
def create_verb(verb_data: VerbCreate, db: Session = Depends(get_db)):
    # Convertimos los datos validados al modelo de la base de datos
    nuevo_verbo = Verb(**verb_data.model_dump())
    
    db.add(nuevo_verbo)
    db.commit()          # Guardamos los cambios físicos
    db.refresh(nuevo_verbo) # Obtenemos el ID generado
    
    return nuevo_verbo

# 2. Ruta GET: Para obtener la lista de todos los verbos
@router.get("/", response_model=List[VerbResponse])
def get_all_verbs(db: Session = Depends(get_db)):
    # Hacemos una consulta SQL (Select * from verbs) usando Python
    verbos = db.query(Verb).filter(Verb.is_active == True).all()
    return verbos