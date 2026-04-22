from fastapi import FastAPI

app = FastAPI()

@app.get("/status")
def get_status():
    # Verificação simples por condição
    servidor_pronto = True
    
    if servidor_pronto:
        return {"status": "operacional", "sistema": "FastAPI"}
    else:
        return {"status": "erro", "detalhe": "falha na inicialização"}