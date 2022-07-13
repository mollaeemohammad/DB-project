from connection import conn
from mysql.connector import Error
from datetime import date


def insert_new_order(status: str, customer_id: int, estimate_date: date, total_cost, order_date: date,
                     discount_percent) -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO `order` (status, customer_id, estimate_date, total_cost,order_date, discount_percent) \
                        VALUES ("{status}", {customer_id}, "{estimate_date}", {total_cost},"{order_date}", {discount_percent});')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
