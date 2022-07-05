from connection import conn


def all_categories() -> list:
    cursor = conn.cursor()
    cursor.execute(
        f'SELECT * \
        FROM Category;'
    )
    return cursor.fetchall()
