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

USER_1=admin
PASSWORD_1=admin123

USER_2=malu
PASSWORD_2=senha456
```

```
Após iniciar, a API ficará disponível em:

- [http://127.0.0.1:8000](http://127.0.0.1:8000/)
- Documentação automática (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

