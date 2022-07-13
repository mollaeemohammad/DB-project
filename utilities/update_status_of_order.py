from connection import conn
from mysql.connector import Error


def customer_status_update(order_id: int, status: str) -> None:
    try:
        if status == 'RECEIVED' or status == 'CANCELED':
            conn.reconnect()
            cursor = conn.cursor(buffered=True)
            cursor.execute(f'UPDATE `order` \
                            SET status = "{status}" \
                            WHERE id = {order_id};')
            conn.commit()

    except Error as error:
        print(error)


def admin_status_update(order_id: int, status: str) -> None:
    try:
        if status == 'DELIVERED' or status == 'PREPARING':
            conn.reconnect()
            cursor = conn.cursor(buffered=True)
            cursor.execute(f'UPDATE `order` \
                            SET status = "{status}" \
                            WHERE id = {order_id};')
            conn.commit()

    except Error as error:
        print(error)
