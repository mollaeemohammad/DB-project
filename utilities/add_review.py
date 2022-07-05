from connection import conn
from mysql.connector import Error


# You must be sure that the this customer has bought the product previously.

def add_review(product_id: int, discussion: str, rate: float) -> int:
    try:
        cursor = conn.cursor()
        cursor.execute(f'INSERT INTO reviews (product_id, discussion, rate) \
                        VALUES ({product_id}, "{discussion}", {rate});')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
