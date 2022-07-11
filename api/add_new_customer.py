from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_new_customer import add_new_customer
from access_control import is_logged_in, has_role
from utilities.errors import *


class AddNewCustomer(Resource):
    """{
            first_name: str,
            last_name: str,
            password: str,
            username: str
    }"""

    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('first_name', type=str, required=True)
            parser.add_argument('last_name', type=str, required=True)
            parser.add_argument('password', type=str, required=True)
            parser.add_argument('username', type=str, required=True)

            args = parser.parse_args()

            add_new_customer(
                first_name=args['first_name'],
                last_name=args['last_name'],
                password=args['password'],
                username=args['username']
            )

            return jsonify(
                {
                    "message": "successfully added the new customer.",
                    "status": 200
                }
            )
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
