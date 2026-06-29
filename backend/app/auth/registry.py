from os import getenv
from dotenv import load_dotenv, find_dotenv

print("find_dotenv:", find_dotenv())

load_dotenv()

print("USER_1_USERNAME =", getenv("USER_1_USERNAME"))
print("USER_1_PASSWORD =", getenv("USER_1_PASSWORD"))

def load_users() -> dict:
    users = {}

    for i in range(1, 6):
        username = getenv(f"USER_{i}_USERNAME")
        password = getenv(f"USER_{i}_PASSWORD")

        if username and password:
            users[username] = {
                "username": username,
                "password": password
            }

    return users


USER_DB = load_users()

if len(USER_DB) == 0:
    raise Exception("Nenhum usuario carregado do .env")

def get_user(username: str):
    if username in USER_DB:
        return USER_DB[username]
    else:
        return None