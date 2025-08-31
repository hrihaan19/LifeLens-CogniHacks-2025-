from fastapi import APIRouter
from .utils import generate_lifelens_response
from pydantic import BaseModel

router = APIRouter()

class UserInput(BaseModel):
    grade: str
    interests: str
    subjects: str
    career_ideas: str
    hobbies: str
    habits: str
    future_years: int
    alternate_goal: str = None

@router.post("/api/lifelens")
async def lifelens_chat(user_input: UserInput):
    result = await generate_lifelens_response(user_input)
    return {"result": result}
