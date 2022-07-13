from connection import conn
from mysql.connector import Error


def all_orders_of_store(store_id: int) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM `Order` as o \
                        INNER JOIN ordered_products as op on o.id=op.order_id \
                        INNER JOIN product as p on p.id=op.product_id \
                        INNER JOIN supplies as sp on sp.product_id=op.product_id AND sp.store_id=op.store_id  \
                        INNER JOIN store as s on s.id=op.store_id \
                        WHERE s.id = {store_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
