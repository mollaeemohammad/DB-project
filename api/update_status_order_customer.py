from flask import jsonify, g, current_app, session
from flask_restful import Resource, reqparse
from utilities.update_product_count import update_product_count
from utilities.update_status_of_order import customer_status_update
from utilities.notify_wanted_customers import notify_wanted_customers
from access_control import is_logged_in
from utilities.errors import *


class UpdateStatusOrderCustomer(Resource):
    """
    {
        order_id: int,
        status: str
    }
    """

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('order_id', type=int, required=True)
            parser.add_argument('status', type=str, required=True)

            args = parser.parse_args()

            customer_status_update(
                order_id=args['order_id'],
                status=args['status']
            )

            return jsonify({
                "message": "Successfully updated."
            })

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
