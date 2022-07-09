from flask import jsonify, g, current_app, session
from flask_restful import Resource, reqparse
from utilities.update_product_count import update_product_count
from utilities.errors import *
from access_control import is_logged_in
from utilities.errors import *


class UpdateProductCount(Resource):
    """
    {
        store_id: int,
        product_id: int,
        count: int,
        discount_percentage: float, not required
    }
    """

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('store_id', type=int, required=True)
            parser.add_argument('product_id', type=int, required=True)
            parser.add_argument('count', type=int, required=True)
            parser.add_argument('discount_percentage', type=float)

            args = parser.parse_args()

            update_product_count(store_id=args['store_id'],
                                 product_id=args['product_id'],
                                 count=args['count'],
                                 discount_percentage=args['discount_percentage']
                                 )
            return jsonify({
                "message": "Successfully updated."
            })

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
