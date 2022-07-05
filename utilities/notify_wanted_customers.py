from connection import conn
from mysql.connector import Error


def notify_wanted_customers(product_id, all_wanted_customers: list) -> None:
    """

    :param product_id: Integer
    :param all_wanted_customers: Result of calling all_wanted_customers is -> [(id1,), (id2,), ...]
    :return: None
    """
    try:
        cursor = conn.cursor()
        for customer in all_wanted_customers:
            cursor.execute(f'INSERT INTO notifications (customer_id, product_id, notified_date) \
                            VALUES ({customer[0]}, {product_id}, (CURRENT_DATE));')
            conn.commit()
    except Error as error:
        print(error)
