from connection import conn


def login_customer(username: str, password: str) -> list:
    cursor = conn.cursor()
    cursor.execute(
        f'SELECT * \
         FROM Customer \
         WHERE username = "{username}" AND password = {password};'
    )
    return cursor.fetchall()


def login_admin(name: str, password: str):
    cursor = conn.cursor()
    cursor.execute(
        f'SELECT * \
        FROM Admin \
        WHERE name = "{name}" AND password = {password};'
    )
    return cursor.fetchall()


def login_store(name: str, password: str):
    cursor = conn.cursor()
    cursor.execute(
        f'SELECT * \
            FROM Store \
            WHERE name = "{name}" AND password = {password};'
    )
    return cursor.fetchall()