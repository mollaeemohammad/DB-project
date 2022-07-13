from connection import conn
from mysql.connector import Error


def all_stores() -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(
            f'SELECT id, `name`, location \
            FROM Store;'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
