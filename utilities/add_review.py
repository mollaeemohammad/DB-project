from connection import conn
from mysql.connector import Error


# You must be sure that the this customer has bought the product previously.

def add_review(product_id: int, discussion: str, rate: float) -> None:
    try:
        cursor = conn.cursor()
        cursor.execute(f'INSERT INTO reviews (product_id, discussion, rate) \
                        VALUES ({product_id}, "{discussion}", {rate});')
        conn.commit()
    except Error as error:
        print(error)
