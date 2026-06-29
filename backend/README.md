## Acessando o backend do monorepositorio

Com o CMD aberto, entre na pasta backend

```
cd backend
```

----
## Criando o Ambiente Virtual
```bash
python -m venv venv
```
	
## Ativando o Ambiente Virtual (VS Code)
- No POWERSHELL
```
.\venv\Scripts\Activate.ps1
```
	
- No CMD
```
venv\Scripts\activate
```
	
## Gerenciamento de dependências 
	
- Instalando dependências do projeto
```bash
pip install -r requirements.txt
```
	
- Atualize o arquivo requirements.txt
```bash
pip freeze > requirements.txt
```
## Executando a API
```bash
uvicorn app.main:app --reload
```

- Crie um .env baseando-se no exemplo.

Sem um .env configurado com os nomes de parametros corretos, o backend nao funciona. 

```bash

USER_1_USERNAME=admin
USER_1_PASSWORD=hash_da_senha

```

Em seguida, gere um "secret_key" JWT para configurar o env 

```bash

USER_1_USERNAME=admin
USER_1_PASSWORD=hash_da_senha

```
SECRET_KEY=minha-chave-super-secreta-123456789
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

```
# Backend

- main.py
    - Inicializa a aplicação FastAPI, configura o CORS, registra as rotas, define a autenticação via JWT e centraliza as configurações da API.

- registry.py
    - Carrega os usuários do `.env`, armazena-os em memória e fornece esses dados para outras partes da aplicação.

- router.py (/login)
    - Recebe as credenciais do usuário, valida o login e, se estiverem corretas, retorna um token JWT.

- security.py
    - Centraliza as funções de segurança da autenticação, como a verificação da senha e a geração do token JWT.

- generate_hash.py
    - Gera o hash bcrypt de uma senha em texto puro para que ela possa ser armazenada com segurança no `.env`.
```

```
Após iniciar, a API ficará disponível em:

- [http://127.0.0.1:8000](http://127.0.0.1:8000/)
- Documentação automática (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

