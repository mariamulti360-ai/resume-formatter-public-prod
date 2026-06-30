import os
from pathlib import Path
from os import getenv

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from jose import jwt

# Seus imports de rotas existentes
from app.auth.router import router as auth_router
# Import do novo Controller da Groq
from controllers.groq_controller import router as groq_router

load_dotenv()

# Configuração JWT
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")

app = FastAPI(title=os.getenv("APP_NAME", "FORMATADOR DE CURRICULO"))

# --- CONFIGURAÇÃO DE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, pode restringir se desejar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DEPENDÊNCIA DE AUTENTICAÇÃO ---
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
        raise HTTPException(
            status_code=401,
            detail="Dados de usuário não encontrados no token"
        )

    return username


# --- ROTAS ---

@app.get("/config")
def get_config():
    debug_mode = os.getenv("DEBUG")
    if debug_mode == "True":
        return {
            "modo": "desenvolvimento",
            "porta": os.getenv("PORT")
        }

    return {"modo": "produção"}


@app.get("/chat")
def chat(user: str = Depends(get_current_user)):
    return {"message": f"Acesso permitido para {user}"}


# Registro dos Routers
app.include_router(auth_router, prefix="/auth")
app.include_router(groq_router, prefix="/api/v1")


