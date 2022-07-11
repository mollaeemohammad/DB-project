from connection import conn
from mysql.connector import Error


def add_new_product(name, count, store_id, price, category_id, picture=None, weight=0.0, color=None, dimensions=None,
                    description=None,
                    discount_percentage=0.0) -> None:
    try:
        cursor = conn.cursor(buffered=True)

        if weight is None:
            weight = 0.0
        if discount_percentage is None:
            discount_percentage = 0.0

        cursor.execute(f'INSERT INTO product (rating, price, `name`, picture, weight, color, dimensions, description) \
                        VALUES (0, {price}, "{name}", "{picture}", {weight}, "{color}", "{dimensions}", "{description}");')

        product_id = cursor.lastrowid
        conn.commit()

        cursor.execute(f'INSERT INTO Categorization (product_id, category_id) VALUES ({product_id}, {category_id})')
        conn.commit()

        cursor.execute(f'INSERT INTO supplies (store_id, product_id, `count`, discount_percentage) \
                        VALUES ({store_id}, {product_id}, {count}, {discount_percentage});')
        conn.commit()
    except Error as error:
        print(error)

# INSERT INTO product (rating, price, name, picture, weight, color, dimensions, description)
# VALUES (0, price, name, picture, weight, color, dimensions, description)

# INSERT INTO supplies (store_id, product_id, `count`, added_date, discount_percentage)
# VALUES (store_id, product_id, `count`, added_date, discount_percentage)
