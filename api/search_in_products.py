from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.search_in_products import search_in_products
from access_control import is_logged_in
from utilities.errors import *
import json


class SearchInProducts(Resource):
    """
    {
        name: str
    }
    """
    def post(self):
        """
        :return: [[id, rating, price, `name`, `picture`, `description`, `color` ]]
        """
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str, required=True)
            args = parser.parse_args()

            if not is_logged_in():
                raise NotExistsError

            return json.loads(json.dumps(search_in_products(args['name']), default=float))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])



