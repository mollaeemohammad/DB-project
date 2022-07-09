from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_addresses_of_customer import all_addresses_of_customer
from access_control import is_logged_in
from utilities.errors import *


class AllAddressesOfCustomer(Resource):
    """
    {
        'customer_id': Integer
    }
    """

    def get(self):
        """
        :return: [[id, name]]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=str)

            args = parser.parse_args()

            return all_addresses_of_customer(args['customer_id'])

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
