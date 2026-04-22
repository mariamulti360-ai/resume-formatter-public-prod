import os
import requests  # Substituímos o httpx por requests
from typing import List, Dict, Any

class GroqService:
    def __init__(self):
        # Carrega as variáveis de ambiente
        self.api_key = os.getenv("GROQ_API_KEY")
        # DICA: Já guardamos a URL completa no .env ou concatenamos aqui para evitar o 404
        self.base_uri = os.getenv("GROQ_BASE_URI")
        self.model = "llama-3.3-70b-versatile"

    def obter_resposta_ia(self, prompt_sistema: str, historico: List[Dict[str, str]], mensagem_usuario: str) -> Dict[str, Any]:
        # 1. Montagem das mensagens (Payload)
        mensagens_para_enviar = [{"role": "system", "content": prompt_sistema}]
        mensagens_para_enviar.extend(historico)
        mensagens_para_enviar.append({"role": "user", "content": mensagem_usuario})

        # 2. Configuração dos Headers
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        # 3. Corpo da requisição
        json_data = {
            "model": self.model,
            "messages": mensagens_para_enviar,
            "temperature": 0.3
        }

        # 4. A Requisição Síncrona
        # O verify=False ignora erros de SSL (como você já estava fazendo)
        # O timeout evita que o sistema trave se a Groq demorar
        url_completa = f"{self.base_uri.rstrip('/')}/chat/completions"
        
        response = requests.post(
            url_completa, 
            headers=headers, 
            json=json_data, 
            timeout=20, 
            verify=False
        )

        # 5. Validação Explícita (IF/ELSE conforme solicitado)
        if response.status_code == 200:
            dados = response.json()
            
            # Verificação de integridade do JSON retornado
            if "choices" in dados and len(dados["choices"]) > 0:
                conteudo_ia = dados["choices"][0]["message"]["content"]
                
                # Atualiza o histórico para o frontend
                historico.append({"role": "user", "content": mensagem_usuario})
                historico.append({"role": "assistant", "content": conteudo_ia})
                
                return {
                    "sucesso": True,
                    "resposta": conteudo_ia,
                    "historico_atualizado": historico
                }
            
            return {"sucesso": False, "erro": "Estrutura de resposta da Groq inválida."}

        # 6. Tratamento de Erros de Status
        return {
            "sucesso": False,
            "erro": f"Erro na API Groq: Status {response.status_code}",
            "detalhe": response.text
        }