from connection import conn
from mysql.connector import Error


def all_categories() -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(
            f'SELECT * \
            FROM Category;'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
