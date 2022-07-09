from connection import conn
from mysql.connector import Error


def update_discount(store_id: int, product_id: int, discount_percentage: float) -> None:
    """
    This function is used by stores for their supplying products
    :param store_id:
    :param product_id:
    :param discount_percentage:
    :return:
    """
    try:
        cursor = conn.cursor()
        cursor.execute(f'UPDATE supplies \
                        SET discount_percentage = {discount_percentage} \
                        WHERE store_id = {store_id} AND product_id =  {product_id};')
        conn.commit()
    except Error as error:
        print(error)
