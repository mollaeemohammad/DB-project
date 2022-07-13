from connection import conn
from mysql.connector import Error


def all_products_of_category(category_name: str) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT p.id, p.rating, p.price, p.name, p.picture, p.weight, p.color, p.dimensions, p.description \
                        FROM Category AS c \
                        INNER JOIN CATEGORIZATION AS CA ON c.id = CA.category_id \
                        INNER JOIN product p on CA.product_id = p.id \
                        WHERE c.name = "{category_name}"')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
