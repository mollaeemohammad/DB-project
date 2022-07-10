from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_deliveries import all_deliveries
from access_control import is_logged_in
from utilities.errors import *


class AllDeliveries(Resource):
    """
    {
        store_id: int
    }
    """
    def get(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('store_id', type=int, required=True)

            args = parser.parse_args()

            return jsonify(all_deliveries(args['store_id']))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])



