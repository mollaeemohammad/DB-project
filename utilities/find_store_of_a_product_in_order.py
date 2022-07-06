from connection import conn
from mysql.connector import Error


def find_store_of_a_product_in_order(product_id: int, order_id: int) -> list:
    """
    Used for adding ticket of problem, by customer.
    :param product_id:
    :param order_id:
    :return: [(store_id,)]
    """
    try:
        cursor = conn.cursor()
        cursor.execute(
            f'SELECT store_id FROM ordered_products WHERE product_id = {product_id} AND order_id = {order_id};'
        )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']