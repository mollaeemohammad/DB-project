from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.all_problems_of_order import all_problems_of_order
from utilities.handle_date_type import handle_date_type
from access_control import is_logged_in, has_role
from utilities.errors import *
import json


# from datetime import datetime, timedelta
# from utilities.discount_percentage_code import discount_percentage


class AllProblemsOfOrder(Resource):
    """{
        order_id: int
    }"""

    def post(self):
        """
        :return:[
        {
            order_id     INT                                 NOT NULL,
            store_id     INT                                 NOT NULL,
            problem_type ENUM ('DELAY', 'DAMAGE','OTHERS', 'NOTHING') NOT NULL,
            ticket_date  DATE DEFAULT (CURRENT_DATE),
        },
        ...
        ]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('order_id', type=int, required=True)

            args = parser.parse_args()

            return jsonify(handle_date_type(all_problems_of_order(args['order_id'], False)))

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
