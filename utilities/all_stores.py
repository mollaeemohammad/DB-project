from connection import conn
from mysql.connector import Error


def all_stores() -> list:
    try:
        cursor = conn.cursor()
        cursor.execute(
            f'SELECT * \
            FROM Store;'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
