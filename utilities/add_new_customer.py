from connection import conn
from mysql.connector import Error


def add_new_customer(first_name: str, last_name: str, password: str, username: str) -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO customer (last_name, first_name, password, username) \
                        VALUES ("{last_name}", "{first_name}", "{password}", "{username}")')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
