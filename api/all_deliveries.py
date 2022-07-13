from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_orders_of_store import all_orders_of_store
from access_control import is_logged_in
from utilities.errors import *
from utilities.handle_date_type import handle_date_type


class AllDeliveries(Resource):
    """
    {
        store_id: int
    }
    """
    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('store_id', type=int, required=True)

            args = parser.parse_args()
            all_orders_info = all_orders_of_store(args['store_id'])
            all_orders_info = handle_date_type(all_orders_info)
            
            return jsonify(all_orders_info)

        except NotExistsError:
            return jsonify(errors['NotExistsError'])



