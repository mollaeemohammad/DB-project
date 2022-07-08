from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.choose_a_product import choose_a_product_id, choose_a_product_name
from utilities.add_product_to_order import add_product_to_order
from utilities.all_addresses_of_customer import all_addresses_of_customer
from utilities.add_product_to_order import add_product_to_order
from access_control import is_logged_in
from utilities.errors import *


class Buy(Resource):
    """{
        customer_id: int,
        cart: [[product_id, store_id, count] ,...]
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=int)
            parser.add_argument('cart', type=list, action='append')

            args = parser.parse_args()
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
