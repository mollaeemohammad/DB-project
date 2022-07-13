from connection import conn
from mysql.connector import Error


def all_orders_of_customer(customer_id: int) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM `order` \
                        WHERE customer_id = {customer_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
