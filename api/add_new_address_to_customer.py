from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_new_address_to_customer import add_new_address_to_customer
from access_control import is_logged_in, has_role
from utilities.errors import *


class AddNewAddressToCustomer(Resource):
    """
    {
        customer_id: int,
        complete_address: str
    }
    """

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=int, required=True)
            parser.add_argument('complete_address', type=str, required=True)

            args = parser.parse_args()

            add_new_address_to_customer(
                customer_id=args['customer_id'],
                complete_address=args['complete_address']
            )

            return jsonify(
                {
                    "message": "successfully added the new address to customer.",
                    "status": 200
                }
            )
        except NotExistsError:
            return jsonify(errors['NotExistsError'])
