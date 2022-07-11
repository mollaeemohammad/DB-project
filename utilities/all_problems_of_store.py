from connection import conn
from mysql.connector import Error


def all_problems_of_store(store_id: int, also_nothing: bool = True) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        if also_nothing:
            cursor.execute(f'SELECT * FROM Problem \
                            WHERE store_id = {store_id};')
        else:
            cursor.execute(f'SELECT * FROM Problem \
                            WHERE store_id = {store_id} AND problem_type != "NOTHING";')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
