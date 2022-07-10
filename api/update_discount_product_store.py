from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.update_discount_product_store import update_discount
from access_control import is_logged_in, has_role
from utilities.errors import *


class UpdateDiscountProductStore(Resource):
    """{
        store_id: int,
        product_id: int,
        discount_percentage: float
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('store_id', type=int, required=True)
            parser.add_argument('product_id', type=int, required=True)
            parser.add_argument('discount_percentage', type=float, required=True)

            args = parser.parse_args()

            update_discount(store_id=args['store_id'],
                            product_id=args['product_id'],
                            discount_percentage=args['discount_percentage'])

            return jsonify(
                {
                    'message': 'Successfully updated discount percentage.',
                    'code': 200
                }
            )

        except NotExistsError:
            return jsonify(errors['NotExistsError'])