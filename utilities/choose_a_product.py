from connection import conn
from mysql.connector import Error


def choose_a_product_id(product_id: int) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM Product AS p \
                        INNER JOIN SUPPLIES AS s ON p.id = s.product_id \
                        INNER JOIN Store AS st ON s.store_id = st.id \
                        LEFT JOIN Reviews AS r on p.id = r.product_id \
                        WHERE p.id = "{product_id}" \
                        ORDER BY r.up_votes DESC ;')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']


def choose_a_product_name(product_name: str) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM Product AS p \
                        INNER JOIN SUPPLIES AS s ON p.id = s.product_id \
                        INNER JOIN Store AS st ON s.store_id = st.id \
                        WHERE p.name = "{product_name}" \
                        ;')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']

def choose_a_product_name_review(product_name: str) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM Product AS p \
                        INNER JOIN Reviews AS r on p.id = r.product_id \
                        WHERE p.name = "{product_name}" \
                        ORDER BY r.up_votes DESC ;')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
