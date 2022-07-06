from connection import conn
from mysql.connector import Error


def store_has_a_product(store_id: int, product_id: int) -> bool:
    try:
        cursor = conn.cursor()
        cursor.execute(f'SELECT * \
                        FROM Store AS s \
                        INNER JOIN Supplies AS su ON s.id = su.store_id \
                        WHERE s.id = {store_id} AND su.product_id = {product_id};')
        if len(cursor.fetchall()) > 0:
            return True
        return False
    except Error as error:
        print(error)
        return None
