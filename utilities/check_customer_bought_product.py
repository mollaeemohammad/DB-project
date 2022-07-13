from connection import conn
from mysql.connector import Error


def check_customer_bought_product(customer_id: int, product_id: int) -> bool:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM customer AS c \
                        INNER JOIN `order` AS o ON c.id = o.customer_id \
                        INNER JOIN ordered_products AS op on o.id = op.order_id \
                        WHERE c.id = {customer_id} AND op.product_id = {product_id};')
        if len(cursor.fetchall()) > 0 :
            return True
        return False
    except Error as error:
        print(error)
        return None


