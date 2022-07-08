from flask import jsonify
from flask_restful import Resource
from utilities.all_stores import all_stores
from access_control import is_logged_in
from utilities.errors import *


class AllStores(Resource):
    def get(self):
        """
        :return: [[id, name, location]]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            return all_stores()

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
