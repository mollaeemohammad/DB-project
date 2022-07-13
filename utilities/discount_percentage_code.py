from connection import conn
from mysql.connector import Error


def discount_percentage(code: str) -> float:
    try:
        if code is None:
            return 0.0

        conn.reconnect()
        cursor = conn.cursor(buffered=True)

        cursor.execute(f'SELECT * \
                        FROM discount \
                        WHERE code = "{code}" AND \
                        (CURRENT_DATE) >= begin_date AND \
                        (CURRENT_DATE) <= end_date')

        found_info = cursor.fetchone()

        if found_info is None:
            return 0.0
        return float(found_info[2])
    except Error as error:
        print(error)
        return 0.0
