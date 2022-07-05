from connection import conn
from mysql.connector import Error


def add_new_category(name: str) -> None:
    try:
        cursor = conn.cursor()
        cursor.execute(f'INSERT INTO Category (name) VALUES ("{name}")')
        conn.commit()
    except Error as error:
        print(error)