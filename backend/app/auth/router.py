from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.auth.registry import get_user
from app.auth.security import verify_password, create_access_token


router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    user = get_user(data.username)

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    password_valid = verify_password(data.password, user["password"])

    if password_valid is False:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["username"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }