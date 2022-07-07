from flask import jsonify
from flask_restful import Resource
from utilities.all_categories import all_categories
from access_control import is_logged_in
from utilities.errors import *


class AllCategories(Resource):
    def get(self):
        """
        :return: [[id, name]]
        """
        try:
            if not is_logged_in():
                raise NotExistsError

            return all_categories()

        except NotExistsError:
            return jsonify(errors['NotExistsError'])



