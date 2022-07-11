from connection import conn
from mysql.connector import Error


def all_products_of_store(store_id: int) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM store AS s \
                        INNER JOIN supplies s2 on s.id = s2.store_id \
                        INNER JOIN product p on s2.product_id = p.id \
                        WHERE store_id = {store_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
