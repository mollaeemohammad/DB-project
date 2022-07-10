from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_new_category import add_new_category
from access_control import is_logged_in, has_role
from utilities.errors import *


class AddNewCategory(Resource):
    """
    {
        name: str
    }
    """

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('name', type=str, required=True)

            args = parser.parse_args()

            add_new_category(args['name'])

            return jsonify(
                {
                    "message": "successfully added the new category.",
                    "status": 200
                }
            )
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
