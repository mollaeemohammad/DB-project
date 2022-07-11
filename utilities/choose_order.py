from connection import conn
from mysql.connector import Error


def choose_order(order_id: int) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM `Order` \
                        WHERE id = {order_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']

