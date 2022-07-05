from connection import conn


def all_products_of_category(category_name: str) -> list:
    cursor = conn.cursor()
    cursor.execute(f'SELECT * \
                    FROM Category AS c \
                    INNER JOIN CATEGORIZATION AS CA ON c.id = CA.category_id \
                    INNER JOIN product p on CA.product_id = p.id \
                    WHERE c.name = "{category_name}"')
    return cursor.fetchall()