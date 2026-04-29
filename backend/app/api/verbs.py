# backend/app/api/verbs.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from ..db.database import get_db
from ..models import domain
from pydantic import BaseModel

router = APIRouter()

# Esquema para que el script de carga funcione
class VerbCreate(BaseModel):
    base_form: str
    spanish: str
    gerund: str
    example: str

@router.get("/")
def read_all_verbs(db: Session = Depends(get_db)):
    return db.query(domain.Verb).all()

@router.post("/")
def create_verb(verb: VerbCreate, db: Session = Depends(get_db)):
    db_verb = domain.Verb(**verb.dict())
    db.add(db_verb)
    db.commit()
    db.refresh(db_verb)
    return db_verb

@router.get("/daily")
def get_daily_verbs(db: Session = Depends(get_db)):
    user_id = 1
    now = datetime.utcnow()
    
    # Verbos que no tienen progreso O cuya fecha de revisión ya venció
    verbs = db.query(domain.Verb).outerjoin(
        domain.UserVerbProgress, 
        domain.Verb.id == domain.UserVerbProgress.verb_id
    ).filter(
        (domain.UserVerbProgress.id == None) | 
        (domain.UserVerbProgress.next_review_date <= now)
    ).limit(10).all()
    
    return verbs

@router.post("/{verb_id}/swipe")
def handle_verb_swipe(verb_id: int, mastered: bool, db: Session = Depends(get_db)):
    # 1. Asegurarnos de que el usuario 1 existe (si no, lo creamos)
    user = db.query(domain.User).filter(domain.User.id == 1).first()
    if not user:
        user = domain.User(id=1, email="vanni@katana.com")
        db.add(user)
        db.commit()

    # 2. Buscar progreso
    progress = db.query(domain.UserVerbProgress).filter(
        domain.UserVerbProgress.verb_id == verb_id,
        domain.UserVerbProgress.user_id == 1
    ).first()

    if not progress:
        progress = domain.UserVerbProgress(user_id=1, verb_id=verb_id)
        db.add(progress)

    # 3. Lógica de repetición
    if mastered:
        progress.consecutive_corrects += 1
        dias = 2 ** progress.consecutive_corrects
        progress.next_review_date = datetime.utcnow() + timedelta(days=dias)
    else:
        progress.consecutive_corrects = 0
        progress.next_review_date = datetime.utcnow() # Se queda para hoy mismo
        
    db.commit()
    return {"status": "success"}