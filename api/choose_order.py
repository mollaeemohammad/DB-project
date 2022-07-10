from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.update_status_of_order import admin_status_update
from utilities.choose_order import choose_order
from utilities.handle_date_type import handle_date_type
from access_control import is_logged_in
from utilities.errors import *
from datetime import datetime, timedelta, date


class ChooseOrder(Resource):
    """
    {
        order_id : int
    {
    """

    def get(self):
        """
            :return:
            [
            id               INT PRIMARY KEY AUTO_INCREMENT,
            status           ENUM ('RECEIVED', 'CANCELED', 'DELIVERED', 'PREPARING'),
            customer_id      INT  NOT NULL,
            receipt_date     DATE          DEFAULT NULL,
            estimate_date    DATE NOT NULL,
            total_cost       DECIMAL(9, 2) CHECK ( total_cost >= 0.00 AND total_cost <= 10000000.00),
            order_date       DATE,
            discount_percent DECIMAL(3, 2) CHECK ( discount_percent >= 0.00 AND discount_percent <= 1.00 ),
            delivery_cost    DECIMAL(6, 2) DEFAULT 0.00 CHECK ( delivery_cost >= 0 ),
            ]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('order_id', type=int, required=True)

            args = parser.parse_args()

            order_info = choose_order(args['order_id'])

            if (date.today() - order_info[0][6]).days >= 3:
                admin_status_update(args['order_id'], 'DELIVERED')

            return jsonify(handle_date_type(choose_order(args['order_id'])))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
