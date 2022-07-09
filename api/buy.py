from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.new_order import insert_new_order
from utilities.add_product_to_order import add_product_to_order
from utilities.add_problem import add_problem
from access_control import is_logged_in
from utilities.errors import *
from datetime import datetime, timedelta
from utilities.discount_percentage_code import discount_percentage


def calculate_total_cost(cart: list) -> float:
    result = float()
    for product in cart:
        result += product[2] * product[3] * product[4]  # count * discount_percentage * price

    return result


def determine_products_for_adding_to_order(cart: list) -> list:
    result = list()
    for product in cart:
        result.append(
            {
                'id': product[0],
                'count': product[2],
                'store_id': product[1]
            }
        )
    return result


class Buy(Resource):
    """{
        customer_id: int,
        cart: [[product_id, store_id, count, discount_percentage, price] ,...],
        discount_code: str
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=int, required=True)
            parser.add_argument('cart', type=list, action='append', required=True)
            parser.add_argument('discount_code', type=str)

            args = parser.parse_args()

            total_cost = calculate_total_cost(args['cart'])

            dis_percent = discount_percentage(args['discount_code'])

            order_id = insert_new_order(status='PREPARING',
                                        customer_id=args['customer_id'],
                                        estimate_date=datetime.today() + timedelta(days=10),
                                        discount_percent=dis_percent,
                                        order_date=datetime.today(),
                                        total_cost=total_cost * (1 - dis_percent)
                                        )

            # Making cart argument appropriate for add_product_to_order function
            products = determine_products_for_adding_to_order(args['cart'])
            add_product_to_order(order_id, products)
            add_problem(order_id, args["store_id"])


            return jsonify(
                {
                    'message': 'Successfully bought product'
                }
            )

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
