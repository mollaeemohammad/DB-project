from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.categories_of_product import categories_of_product
from utilities.all_products_of_category_id import all_products_of_category_id
from access_control import is_logged_in
from utilities.errors import *
import json


class Suggestion(Resource):
    """
    {
        product_id : int
    {
    """

    def get(self):
        """
            :return: [[id, rating, price, name, picture], ...]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('product_id', type=int, required=True)

            args = parser.parse_args()

            categories = categories_of_product(product_id=args['product_id'])

            all_similar_products = []
            for category in categories:
                all_similar_products.extend(all_products_of_category_id(category[0]))

            return json.loads(json.dumps(all_similar_products, default=float))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
