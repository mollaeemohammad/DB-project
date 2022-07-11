from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_orders_of_customer import all_orders_of_customer
from utilities.handle_date_type import handle_date_type
from access_control import is_logged_in, has_role
from utilities.errors import *
import json


# from datetime import datetime, timedelta
# from utilities.discount_percentage_code import discount_percentage


class AllOrdersOfCustomer(Resource):
    """{
        customer_id: int
    }"""

    def post(self):
        """
        :return:[
        {
            id               INT PRIMARY KEY AUTO_INCREMENT,
            status           ENUM ('RECEIVED', 'CANCELED', 'DELIVERED', 'PREPARING'),
            customer_id      INT  NOT NULL,
            receipt_date     DATE          DEFAULT NULL,
            estimate_date    DATE NOT NULL,
            total_cost       DECIMAL(9, 2) CHECK ( total_cost >= 0.00 AND total_cost <= 10000000.00),
            order_date       DATE,
            discount_percent DECIMAL(3, 2) CHECK ( discount_percent >= 0.00 AND discount_percent <= 1.00 ),
            delivery_cost    DECIMAL(6, 2) DEFAULT 0.00 CHECK ( delivery_cost >= 0 ),
        },
        ...
        ]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('customer_id', type=int, required=True)

            args = parser.parse_args()

            all_orders_info = all_orders_of_customer(args['customer_id'])
            all_orders_info = handle_date_type(all_orders_info)

            return jsonify(all_orders_info)
        except NotExistsError:
            return jsonify(errors['NotExistsError'])