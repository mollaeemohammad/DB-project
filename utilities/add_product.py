from connection import conn
from mysql.connector import Error
from datetime import date


def add_product(store_id: int, product_id: int, count: int, discount_percentage: float) -> None:
    try:
        cursor = conn.cursor()
        cursor.execute(f'UPDATE supplies \
                        SET count = {count}, added_date = (CURRENT_DATE), \
                         discount_percentage = {discount_percentage} \
                        WHERE store_id = {store_id} AND product_id = {product_id}')
        conn.commit()
    except Error as error:
        print(error)

# UPDATE supplies
# SET count = count, added_date = (CURRENT_DATE), discount_percentage = discount_percentage
# WHERE store_id = store_id AND product_id = product_id
