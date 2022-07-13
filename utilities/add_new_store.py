from connection import conn
from mysql.connector import Error


def add_new_store(name: str, password: str, location: str) -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO store (name, password, location) \
                        VALUES ("{name}", "{password}", "{location}")')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
