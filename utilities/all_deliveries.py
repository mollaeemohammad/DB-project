from connection import conn
from mysql.connector import Error


def all_deliveries(store_id: int) -> list:
    try:
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT d.id, d.name, d.cost\
                        FROM store \
                        INNER JOIN deliver_by AS db ON store.id = db.store_id \
                        INNER JOIN delivery AS d ON db.delivery_id = d.id \
                        WHERE store_id = {store_id};')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']






