from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from services.groq_service import GroqService
from prompts.resume_formatter import PROMPT_ANALISE_VAGA, PROMPT_FORMATACAO_CURRICULO

router = APIRouter()
groq_service = GroqService()

# Schema de entrada: FastAPI valida o JSON do Front automaticamente aqui
class ChatRequest(BaseModel):
    mensagem: str
    historico: List[Dict[str, str]] = []

@router.post("/vaga/analisar")
def analisar_vaga(request: ChatRequest):  # 1. REMOVIDO 'async'
    # 2. REMOVIDO 'await' - Chamada direta ao service síncrono (requests)
    resultado = groq_service.obter_resposta_ia(
        prompt_sistema=PROMPT_ANALISE_VAGA,
        historico=request.historico,
        mensagem_usuario=request.mensagem
    )

    # 3. Lógica de sucesso baseada no dicionário retornado pelo Service
    if resultado["sucesso"] == True:
        return {
            "status": "success",
            "data": resultado["resposta"],
            "chat_history": resultado["historico_atualizado"]
        }
    
    # 4. Se der merda, o erro tratado no Service sobe aqui
    raise HTTPException(status_code=400, detail=resultado.get("erro"))

@router.post("/curriculo/formatar")
def formatar_curriculo(request: ChatRequest):  # 1. REMOVIDO 'async'
    # 2. REMOVIDO 'await'
    resultado = groq_service.obter_resposta_ia(
        prompt_sistema=PROMPT_FORMATACAO_CURRICULO,
        historico=request.historico,
        mensagem_usuario=request.mensagem
    )

    if resultado["sucesso"] == True:
        return {
            "status": "success",
            "data": resultado["resposta"],
            "chat_history": resultado["historico_atualizado"]
        }
    
    raise HTTPException(status_code=400, detail=resultado.get("erro"))