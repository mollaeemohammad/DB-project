from flask import jsonify
from flask_restful import Resource, reqparse
from utilities.up_down_vote import up_vote_review, down_vote_review
from access_control import is_logged_in, has_role
from utilities.errors import *


class UpVote(Resource):
    """{
        review_id: int
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('review_id', type=int, required=True)

            args = parser.parse_args()

            up_vote_review(args['review_id'])

        except NotExistsError:
            return jsonify(errors['NotExistsError'])


class DownVote(Resource):
    """{
        review_id: int
    }"""

    def post(self):
        try:
            if not is_logged_in():
                raise NotExistsError

            parser = reqparse.RequestParser()

            parser.add_argument('review_id', type=int, required=True)

            args = parser.parse_args()

            down_vote_review(args['review_id'])

        except NotExistsError:
            return jsonify(errors['NotExistsError'])