from connection import conn
from mysql.connector import Error


def all_problems_of_store(store_id: int) -> list:
    try:
        cursor = conn.cursor()
        cursor.execute(f'SELECT * FROM Problem WHERE store_id = {store_id}')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
