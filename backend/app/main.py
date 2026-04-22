import os
from os import getenv
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware  # Importação necessária para o Frontend
from dotenv import load_dotenv
from jose import jwt

# Seus imports de rotas existentes
from app.auth.router import router as auth_router
# Import do novo Controller da Groq
from controllers.groq_controller import router as groq_router

load_dotenv()

# Configuração JWT
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")

app = FastAPI(title=os.getenv("APP_NAME", "ATS_Optimizer"))

# --- CONFIGURAÇÃO DE CORS (Essencial para React/Vite) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, coloque o endereço do seu front (ex: http://localhost:5173)
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
    
    # Nota: Aqui o ideal seria um try/catch apenas para a lib jose, 
    # mas mantendo sua regra de IF/ELSE para lógica de negócio:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")

    if username is None:
        raise HTTPException(status_code=401, detail="Dados de usuário não encontrados no token")

    return username

# --- ROTAS ---

@app.get("/config")
def get_config():
    debug_mode = os.getenv("DEBUG")
    if debug_mode == "True":
        return {"modo": "desenvolvimento", "porta": os.getenv("PORT")}
    return {"modo": "produção"}

# Rota de teste protegida
@app.get("/chat")
def chat(user: str = Depends(get_current_user)):
    return {"message": f"Acesso permitido para {user}"}

# Registro dos Routers
app.include_router(auth_router, prefix="/auth")

# Incluindo o router da Groq. 
# Se quiser que TODAS as rotas da Groq exijam login, use:
# app.include_router(groq_router, prefix="/api/v1", dependencies=[Depends(get_current_user)])
app.include_router(groq_router, prefix="/api/v1")