from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_review import add_review
from utilities.check_customer_bought_product import check_customer_bought_product
from access_control import is_logged_in, has_role
from utilities.errors import *


# from datetime import datetime, timedelta
# from utilities.discount_percentage_code import discount_percentage


class AddReview(Resource):
    """{
        customer_id: int,
        discussion: str,
        product_id: int,
        rate: float, (Between 0.0 to 5.0)
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=int, required=True)
            parser.add_argument('discussion', type=str, required=True)
            parser.add_argument('product_id', type=str, required=True)
            parser.add_argument('rate', type=float, required=True)

            args = parser.parse_args()

            if not check_customer_bought_product(args['customer_id'], args['product_id']):
                raise InvalidArgumentsError

            add_review(args['product_id'], args['discussion'], args['rate'])

            return jsonify(
                {
                    'message': 'successfully added review to the product.'
                }
            )

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
        except InvalidArgumentsError:
            return jsonify(
                {
                    'message': "You did not bought this product, so you can't add review."
                }
            )
