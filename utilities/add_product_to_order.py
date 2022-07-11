from connection import conn
from mysql.connector import Error


def make_product_appropriate(order_id: int, product: dict) -> str:
    return str((order_id, product['id'], product['count'], product['store_id']))


def add_product_to_order(order_id: int, products: list) -> int:
    """
    Shows the types of products that a customer ordered
    :param order_id: Integer (last inserted row) returned by new_order function
    :param products: Dictionary of products which contains product_id and number of that product
        [{
            id: Integer,
            count: Integer
            store_id: Integer
        }, ...
        ]
    :return: None
    """
    try:
        # if len(products) == 0:
        #     throw Exception("")

        # Products are now converted to "(order_id, product_id, count)"
        converted_products = [make_product_appropriate(order_id, product) for product in products]
        # New concatenate and add ' ,' to them
        converted_products = ' ,'.join(converted_products)

        cursor = conn.cursor(buffered=True)
        cursor.execute(f'INSERT INTO ordered_products (order_id, product_id, count_product, store_id) \
                        VALUES {converted_products}')
        conn.commit()
        return cursor.lastrowid
    except Error as error:
        print(error)
        return -1

# INSERT INTO ordered_products (order_id, product_id, count_product)
# VALUES (the above order_id, product_id 1, n),
#        (the above order_id, product_id 2),
#        (the above order_id, product_id 3),
#        (the above order_id, product_id 4);
