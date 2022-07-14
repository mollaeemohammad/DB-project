from connection import conn
from mysql.connector import Error


def search_in_products(title: str) -> list:
    try:
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        cursor.execute(f'SELECT * \
                        FROM Product \
                        WHERE name LIKE "%{title}%"')
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']

def filter_products(title: str, min_price:int, max_price:int, min_weight:int, max_weight:int, color:str) -> list:
    try:
        print(title, min_price, max_price, min_weight, max_weight, color)
        conn.reconnect()
        cursor = conn.cursor(buffered=True)
        query = f'SELECT * \
                        FROM Product \
                        WHERE name LIKE "%{title}%" AND \
                        price BETWEEN {min_price} AND {max_price} AND \
                        weight BETWEEN {min_weight} AND {max_weight}'
        if(color):
            query += f' AND color = "{color}"'
        print(query)
        cursor.execute(query)
        return cursor.fetchall()
    except Error as error:
        print(error)
        return ['Something went wrong']
