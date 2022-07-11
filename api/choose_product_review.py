from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.choose_a_product import choose_a_product_id, choose_a_product_name, choose_a_product_name_review
from utilities.handle_date_type import handle_date_type
from access_control import is_logged_in
from utilities.errors import *


class ChooseProductReview(Resource):
    """
    {
        name : str,
        OR
        id : int
    {
    """

    def post(self):
        """
            :return: [[id, rating, price, name, picture]]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('name', type=str)

            args = parser.parse_args()
            if not args.get('name') is None:
                product_info = choose_a_product_name_review(args['name'])
                product_info = handle_date_type(product_info)
                return jsonify(product_info)


            # If no name nor id is in request raise an error
            raise SchemaValidationError

        except SchemaValidationError:
            return jsonify(errors['SchemaValidationError'])
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
