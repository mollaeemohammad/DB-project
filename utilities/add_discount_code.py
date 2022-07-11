from connection import conn
from mysql.connector import Error
from datetime import date


def add_discount_code(code: str, percentage: float, begin_date: date, end_date: date) -> int:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO discount (`code`, percentage, begin_date, end_date) \
                        VALUES ("{code}", {percentage}, "{begin_date.strftime("%Y-%m-%d")}", "{end_date.strftime("%Y-%m-%d")}")')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1
