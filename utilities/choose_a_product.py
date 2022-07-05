from connection import conn


def choose_a_product_id(product_id: int) -> list:
    cursor = conn.cursor()
    cursor.execute(f'SELECT * \
                    FROM Product AS p \
                    INNER JOIN SUPPLIES AS s ON p.id = s.product_id \
                    INNER JOIN Store AS st ON s.store_id = st.id \
                    LEFT JOIN Reviews AS r on p.id = r.product_id \
                    WHERE p.id = {product_id}; -- also name is ok', multi=True)
    return cursor.fetchall()


def choose_a_product_name(product_name: str) -> list:
    cursor = conn.cursor()
    cursor.execute(f'SELECT * \
                    FROM Product AS p \
                    INNER JOIN SUPPLIES AS s ON p.id = s.product_id \
                    INNER JOIN Store AS st ON s.store_id = st.id \
                    LEFT JOIN Reviews AS r on p.id = r.product_id \
                    WHERE p.name = "{product_name}" \
                    ORDER BY r.up_votes DESC ;')
    return cursor.fetchall()
