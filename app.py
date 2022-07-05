from flask import Flask
from connection import conn
from datetime import datetime
# from utilities.login import login_customer
# from utilities.all_categories import all_categories
# from utilities.all_products_of_category import all_products_of_category
# from utilities.search_in_products import search_in_products
# from utilities.choose_a_product import choose_a_product_id, choose_a_product_name
# from utilities.new_order import insert_new_order
from utilities.add_product_to_order import add_product_to_order



app = Flask(__name__)


@app.route('/')
def hello_world():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product")
    return str(cursor.fetchall())


if __name__ == '__main__':
    add_product_to_order(1, [{'id': 2, 'count': 10}])
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
