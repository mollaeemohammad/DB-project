from connection import conn
from mysql.connector import Error


def add_new_category(name: str) -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO Category (name) VALUES ("{name}")')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
