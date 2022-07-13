from connection import conn
from mysql.connector import Error


def all_problems_of_order(order_id: int, also_nothing: bool = True) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        if also_nothing:
            cursor.execute(f'SELECT * FROM Problem \
                            WHERE order_id = {order_id};')
        else:
            cursor.execute(f'SELECT * FROM Problem \
                            WHERE order_id = {order_id} AND problem_type != "NOTHING";')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
