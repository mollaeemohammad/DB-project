from connection import conn
from mysql.connector import Error


def all_products_of_category_id(category_id: int) -> list:
    try:
        cursor = conn.cursor()
        cursor.execute(f'SELECT p.id, p.rating, p.price, p.name, p.picture \
                        FROM Category AS c \
                        INNER JOIN CATEGORIZATION AS CA ON c.id = CA.category_id \
                        INNER JOIN product p on CA.product_id = p.id \
                        WHERE c.id = "{category_id}"')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ["Something went wrong"]
