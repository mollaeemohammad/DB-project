from connection import conn
from mysql.connector import Error
from datetime import date


def update_product_count(store_id: int, product_id: int, count: int, discount_percentage: float) -> int:
    try:
        cursor = conn.cursor(buffered=True)
        if discount_percentage is None:
            cursor.execute(f'UPDATE supplies \
                            SET count = {count} \
                            WHERE store_id = {store_id} AND product_id = {product_id}')
        else:
            cursor.execute(f'UPDATE supplies \
                            SET count = {count}, \
                             discount_percentage = {discount_percentage} \
                            WHERE store_id = {store_id} AND product_id = {product_id}')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1

# UPDATE supplies
# SET count = count, added_date = (CURRENT_DATE), discount_percentage = discount_percentage
# WHERE store_id = store_id AND product_id = product_id
