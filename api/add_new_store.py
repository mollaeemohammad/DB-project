from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_new_store import add_new_store
from access_control import is_logged_in, has_role
from utilities.errors import *


class AddNewStore(Resource):
    """
    {
        name: str,
        password: str,
        location: str
    }
    """

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('name', type=str, required=True)
            parser.add_argument('password', type=str, required=True)
            parser.add_argument('location', type=str, required=True)

            args = parser.parse_args()

            add_new_store(
                name=args['name'],
                password=args['password'],
                location=args['location']
            )

            return jsonify(
                {
                    "message": "successfully added the new store.",
                    "status": 200
                }
            )
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
