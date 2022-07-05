from connection import conn
from mysql.connector import Error


def all_addresses_of_customer(customer_id: int) -> list:
    try:
        cursor = conn.cursor()
        cursor.execute(f'SELECT * \
                        FROM Customer AS c \
                        INNER JOIN Addresses AS a ON c.id = a.customer_id \
                        WHERE c.id = {customer_id};'
                       )
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']

