import os
from os import getenv

from fastapi import FastAPI, HTTPException, Header, Depends
from dotenv import load_dotenv
from jose import jwt

from app.auth.router import router as auth_router


# Carrega as variáveis do arquivo .env
load_dotenv()


# Configuração JWT
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")


app = FastAPI(title=os.getenv("APP_NAME"))


@app.get("/config")
def get_config():
    debug_mode = os.getenv("DEBUG")
    
    if debug_mode == "True":
        return {"modo": "desenvolvimento", "porta": os.getenv("PORT")}
    else:
        return {"modo": "produção"}


def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Token de acesso não fornecido")

    parts = authorization.split(" ")

    if len(parts) != 2 or parts[0] != "Bearer":
        raise HTTPException(status_code=401, detail="Formato de token inválido")
    
    token = parts[1]

    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    username = payload.get("sub")

    if username is None:
        raise HTTPException(status_code=401, detail="Dados de usuário não encontrados no token")

    return username


@app.get("/chat")
def chat(user: str = Depends(get_current_user)):
    return {
        "message": f"Acesso permitido para {user}"
    }


app.include_router(auth_router, prefix="/auth")