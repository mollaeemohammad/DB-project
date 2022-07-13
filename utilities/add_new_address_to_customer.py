from connection import conn
from mysql.connector import Error


def add_new_address_to_customer(customer_id: int, complete_address: str) -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO Addresses (customer_id, complete_address) \
                        VALUES ({customer_id}, "{complete_address}")')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
