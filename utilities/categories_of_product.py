from connection import conn
from mysql.connector import Error


def categories_of_product(product_id: int) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT category_id \
                        FROM Categorization \
                        WHERE product_id = {product_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
