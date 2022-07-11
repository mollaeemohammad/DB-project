from connection import conn
from mysql.connector import Error


def search_in_products(title: str) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT id, rating, price, `name`, `picture`, `description`, `color` \
                        FROM Product \
                        WHERE name LIKE "%{title}%"')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
