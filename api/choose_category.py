from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_products_of_category import all_products_of_category
from access_control import is_logged_in
from utilities.errors import *
import json
from flask import request

class AllProductsOfCategory(Resource):
    """
    {
        category_name : str
    {
    """

    def get(self):
        """
            :return: [[id, rating, price, name, picture]]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            # parser = reqparse.RequestParser()

            # parser.add_argument('category_name', type=str, required=True)
            categoryName = request.args.get('category_name', default = '*', type = str)

            # args = parser.parse_args()

            return json.loads(json.dumps(all_products_of_category(categoryName), default=float))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
