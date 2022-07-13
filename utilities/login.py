from connection import conn
from mysql.connector import Error


def login_customer(username: str, password: str) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(
            f'SELECT * \
             FROM Customer \
             WHERE username = "{username}" AND password = "{password}";'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']


def login_admin(name: str, password: str):
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(
            f'SELECT * \
            FROM Admin \
            WHERE name = "{name}" AND password = "{password}";'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']



def login_store(name: str, password: str):
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(
            f'SELECT * \
                FROM Store \
                WHERE name = "{name}" AND password = "{password}";'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']