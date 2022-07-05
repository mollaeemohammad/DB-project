from flask import Flask
from connection import conn
# from utilities.login import login_customer
# from utilities.all_categories import all_categories
# from utilities.all_products_of_category import all_products_of_category
# from utilities.search_in_products import search_in_products
from utilities.choose_a_product import choose_a_product_id, choose_a_product_name



app = Flask(__name__)

@app.route('/')
def hello_world():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product")
    return str(cursor.fetchall())


if __name__ == '__main__':
    print(choose_a_product_name('l340'))
    # print(search_in_products('l340'))
    # print(all_products_of_category('laptop'))
    # print(login_customer('ASD', 123))
    # print(all_categories())
    # print('hello')
    # dbconfig_dec = read_db_config()
    # MySQLConnection(**dbconfig_dec)
    # cursor = conn.cursor()
    # cursor.execute("SELECT * FROM product")
    # print(type(cursor.fetchone())
    # cursor = conn.cursor()
    # app.run(debug=True, host='0.0.0.0')
