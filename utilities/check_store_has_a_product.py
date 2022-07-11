from connection import conn
from mysql.connector import Error


def store_has_a_product(store_id: int, product_id: int) -> int:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM Store AS s \
                        INNER JOIN Supplies AS su ON s.id = su.store_id \
                        WHERE s.id = {store_id} AND su.product_id = {product_id};')
        return len(cursor.fetchall()) > 0
    except Error as error:
        print(error)
        return None
