from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_new_product import add_new_product
from access_control import is_logged_in, has_role
from utilities.errors import *


class AddNewProduct(Resource):
    """{
            name: str,
            count: int,
            store_id: int,
            price: float,
            category_id: int,
            picture: str = None,
            weight: float = 0.0,
            color: str = None,
            dimensions: str = None, -> in format like this '2*2*3'
            description: str = None,
            discount_percentage: float = 0.0
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('name', type=str, required=True)
            parser.add_argument('count', type=int, required=True)
            parser.add_argument('store_id', type=int, required=True)
            parser.add_argument('price', type=float, required=True)
            parser.add_argument('category_id', type=int, required=True)
            parser.add_argument('picture', type=str)
            parser.add_argument('weight', type=float)
            parser.add_argument('dimensions', type=str)
            parser.add_argument('description', type=str)
            parser.add_argument('discount_percentage', type=float)

            args = parser.parse_args()

            add_new_product(name=args['name'],
                            count=args['count'],
                            store_id=args['store_id'],
                            price=args['price'],
                            category_id=args['category_id'],
                            picture=args['picture'],
                            weight=args['weight'],
                            dimensions=args['dimensions'],
                            description=args['description'],
                            discount_percentage=args['discount_percentage'])

            return jsonify(
                {
                    "message": "successfully added the new product.",
                    "status": 200
                }
            )
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
