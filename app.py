from flask import Flask
from connection import conn
from datetime import datetime
# from utilities.login import login_customer
# from utilities.all_categories import all_categories
# from utilities.all_products_of_category import all_products_of_category
# from utilities.search_in_products import search_in_products
# from utilities.choose_a_product import choose_a_product_id, choose_a_product_name
# from utilities.new_order import insert_new_order
# from utilities.add_product_to_order import add_product_to_order
# from utilities.all_addresses_of_customer import all_addresses_of_customer
# from utilities.check_customer_bought_product import check_customer_bought_product
# from utilities.add_review import add_review
# from utilities.store_has_a_product import store_has_a_product
# from utilities.add_product import add_product
# from utilities.add_new_product import add_new_product
# from utilities.add_new_category import add_new_category
# from utilities.all_wanted_customers import all_wanted_customers
# from utilities.notify_wanted_customers import notify_wanted_customers
# from utilities.all_orders_of_customer import all_orders_of_customer
# from utilities.find_store_of_a_product_in_order import find_store_of_a_product_in_order
# from utilities.add_problem import add_problem
# from utilities.all_problems_of_store import all_problems_of_store
# from utilities.up_down_vote import up_vote_review, down_vote_review
# from utilities.add_discount_code import add_discount_code
# from utilities.update_discount_product_store import update_discount
# from utilities.all_products_of_store import all_products_of_store
# from utilities.all_deliveries import all_deliveries
# from utilities.update_status_of_order import customer_status_update
# from utilities.update_status_of_order import customer_status_update, admin_status_update
# from utilities.add_new_customer import add_new_customer
from utilities.add_new_store import add_new_store


app = Flask(__name__)


@app.route('/')
def hello_world():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product")
    return str(cursor.fetchall())


if __name__ == '__main__':
    print(add_new_store('zxcv', 'asdf', 'shiraz'))
    # print(add_new_customer('asdfadfs',' asdf', 'qwerty', 'asdfghjkl'))
    # admin_status_update(3, 'DELIVERED')
    # customer_status_update(1, 'CANCELED')
    # print(all_deliveries(2))
    # print(all_products_of_store(2))
    # update_discount(2, 1, 0.9)
    # add_discount_code('asdf', 0.5, datetime.now(), datetime.now())
    # up_vote_review(1)
    # down_vote_review(1)
    # print(all_problems_of_store(2))
    # print(add_problem(2, 2))
    # print(find_store_of_a_product_in_order(2, 1))
    # print(all_orders_of_customer(1))
    # notify_wanted_customers(1, all_wanted_customers(1))
    # print(add_new_category('such_a_wow2'))
    # add_new_product('iphone', 20, 2, 1000, 2)
    # add_product(2, 1, 10, 0.6)
    # print(store_has_a_product(2, 1))
    # add_review(1, 'customer_id 1 said: hello world', 5)
    # print(check_customer_bought_product(1, 1))
    # print(all_addresses_of_customer(1))
    # add_product_to_order(1, [{'id': 2, 'count': 10, 'store_id': 2}])
    # print(insert_new_order('PREPARING', 1, datetime.now(), 1, datetime.now(), 0))
    # cursor.execute("INSERT INTO Admin (name, password) VALUES ('hello3', '111');")
    # if cursor.lastrowid:
    #     print('last insert id', cursor.lastrowid)
    # else:
    #     print('last insert id not found')
    #
    # conn.commit()
    # print(choose_a_product_id(1))
    # print(choose_a_product_name('l340'))
    # print(search_in_products('l340'))
    # print(all_products_of_category('laptop'))
    # print(login_customer('ASD', 123))
    # print(all_categories())
    # print('hello')
    # dbconfig_dec = read_db_config()
    # MySQLConnection(**dbconfig_dec)
    # cursor = conn.cursor()
    # cursor.execute("SELECT * FROM product")
    # print(cursor.fetchall()[0])
    # cursor = conn.cursor()
    # app.run(debug=True, host='0.0.0.0')
