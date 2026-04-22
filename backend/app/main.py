import os
from fastapi import FastAPI
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

app = FastAPI(title=os.getenv("APP_NAME"))

@app.get("/config")
def get_config():
    # Verificação simples de condição
    debug_mode = os.getenv("DEBUG")
    
    if debug_mode == "True":
        return {"modo": "desenvolvimento", "porta": os.getenv("PORT")}
    else:
        return {"modo": "produção"}