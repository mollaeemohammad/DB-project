from connection import conn


def search_in_products(title: str) -> list:
    cursor = conn.cursor()
    cursor.execute(f'SELECT * \
                    FROM Product \
                    WHERE name LIKE "%{title}%"')
    return cursor.fetchall()
