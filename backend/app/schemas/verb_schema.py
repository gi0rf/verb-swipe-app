# backend/app/schemas/verb_schema.py
from pydantic import BaseModel

# --- NUEVO: Schema para validar los datos al crear un verbo ---
class VerbCreate(BaseModel):
    base_form: str
    spanish: str
    gerund: str
    example: str

# Schema para la información que enviaremos a React (el que ya tenías)
class VerbResponse(BaseModel):
    id: int
    base_form: str
    spanish: str
    gerund: str
    example: str

    class Config:
        from_attributes = True 

class SwipeAction(BaseModel):
    user_id: int
    verb_id: int
    knew_it: bool