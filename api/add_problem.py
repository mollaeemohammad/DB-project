from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.add_problem import add_problem
from access_control import is_logged_in, has_role
from utilities.errors import *


# from datetime import datetime, timedelta
# from utilities.discount_percentage_code import discount_percentage


class AddProblem(Resource):
    """{
        order_id: int,
        store_id: int,
        problem_type: str = 'NOTHING'
        discussion: str
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('order_id', type=int, required=True)
            parser.add_argument('store_id', type=int, required=True)
            parser.add_argument('problem_type', type=str, required=True)
            parser.add_argument('discussion', type=str, required=True)

            args = parser.parse_args()

            add_problem(
                order_id=args['order_id'],
                store_id=args['store_id'],
                problem_type=args['problem_type'],
                discussion=args['discussion']
            )

            return jsonify(
                {
                    'message': "Successfully added the problem.",
                    'code': 200
                }
            )

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
