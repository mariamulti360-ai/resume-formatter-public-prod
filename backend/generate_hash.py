from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

print(pwd_context.hash("Cactus55Solar"))


# para rodar o arquivo digite:    python generate_hash.py