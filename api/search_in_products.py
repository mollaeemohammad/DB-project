from flask import jsonify, request
from flask_restful import Resource, reqparse
from utilities.search_in_products import filter_products, search_in_products
from access_control import is_logged_in
from utilities.errors import *
import json


class SearchInProducts(Resource):
    """
    {
        name: str
    }
    """
    def get(self):
        """
        :return: [[id, rating, price, `name`, `picture`, `description`, `color` ]]
        """
        try:
            # parser = reqparse.RequestParser()
            # parser.add_argument('name', type=str, required=True)
            # args = parser.parse_args()
            name = request.args.get('name', default = '*', type = str)


            if not is_logged_in():
                raise NotExistsError

            return json.loads(json.dumps(search_in_products(name), default=float))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])

class FilterProducts(Resource):
    """
    {
        name: str
        min_price
        max_price
        min_weight
        max_weight
        color
    }
    """
    def get(self):
        """
        :return: [[id, rating, price, `name`, `picture`, `description`, `color` ]]
        """
        try:
            # parser = reqparse.RequestParser()
            # parser.add_argument('name', type=str, required=True)
            # args = parser.parse_args()
            name = request.args.get('name', default = '*', type = str)
            min_price = request.args.get('min_price', default = '*', type = str)
            max_price = request.args.get('max_price', default = '*', type = str)
            min_weight = request.args.get('min_weight', default = '*', type = str)
            max_weight = request.args.get('max_weight', default = '*', type = str)
            color = request.args.get('color', default = '*', type = str)


            if not is_logged_in():
                raise NotExistsError

            return json.loads(json.dumps(filter_products(name, min_price, max_price, min_weight, max_weight, color), default=float))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])



