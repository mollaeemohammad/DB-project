from connection import conn
from mysql.connector import Error


def choose_order(order_id: int) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM `Order` as o\
                        INNER JOIN ordered_products as op on o.id=op.order_id \
                        INNER JOIN product as p on p.id=op.product_id \
                        INNER JOIN store as s on s.id=op.store_id \
                        INNER JOIN supplies as sp on s.id=sp.store_id and p.id=sp.product_id \
                        WHERE order_id = {order_id};')

        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']

