from connection import conn
from mysql.connector import Error


def all_wanted_customers(product_id: int) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT w.customer_id \
                        FROM Product AS p \
                        INNER JOIN Wanted AS w ON p.id = w.product_id;')
        result = cursor.fetchall()

        # Not to have multiple times notifications for a single product for a single customer
        cursor.execute(f'DELETE FROM Wanted WHERE product_id = {product_id}')
        conn.commit()

        return result

    except Error as error:
        print(error)
        return ['Something went wrong']
