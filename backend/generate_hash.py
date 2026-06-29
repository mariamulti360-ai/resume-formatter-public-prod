from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

senha = "xxxxx"

print(pwd_context.hash(senha))