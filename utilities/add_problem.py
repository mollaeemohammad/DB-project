from connection import conn
from mysql.connector import Error


def add_problem(order_id: int, store_id: int, problem_type='NOTHING', discussion="") -> int:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO Problem (order_id, store_id, problem_type, discussion) \
                        VALUES ({order_id}, {store_id}, "{problem_type}", "{discussion}");')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
