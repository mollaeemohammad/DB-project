from flask import jsonify, g, current_app, session
from flask_restful import Resource, reqparse
from utilities.login import login_admin, login_store, login_customer
from utilities.errors import *


def successfully_found_user(mysql_response: list) -> bool:
    if len(mysql_response) != 0 and mysql_response != ['Something went wrong']:
        return True
    return False


class LoginAdmin(Resource):
    def post(self):
        try:
            # Create a parser to parse arguments provided in the json
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str, required=True)
            parser.add_argument('password', type=str, required=True)

            args = parser.parse_args()

            login_admin_info = login_admin(args['name'], args['password'])

            if successfully_found_user(login_admin_info):
                session['logged_in'] = True
                session['role'] = 'admin'
                session['username'] = login_admin_info[0][1]
                session['id'] = login_admin_info[0][0]
                # g.current_user = user
                return jsonify({
                    "message": "Successful"
                })

        except UnauthorizedError:
            return jsonify(errors['UnauthorizedError'])

        return jsonify({
            "message": "Unsuccessful"
        })


class LoginCustomer(Resource):
    def post(self):
        try:
            # Create a parser to parse arguments provided in the json
            parser = reqparse.RequestParser()
            parser.add_argument('username', type=str, required=True)
            parser.add_argument('password', type=str, required=True)

            args = parser.parse_args()

            login_admin_info = login_customer(args['username'], args['password'])

            if successfully_found_user(login_admin_info):
                session['logged_in'] = True
                session['role'] = 'customer'
                session['username'] = login_admin_info[0][3]
                session['id'] = login_admin_info[0][0]
                return jsonify({
                    "message": "Successful",
                    "id":login_admin_info[0][0],
                    "username":login_admin_info[0][3]
                })
            else:
                raise UnauthorizedError
        except UnauthorizedError:
            return jsonify(errors['UnauthorizedError'])


class LoginStore(Resource):
    def post(self):
        try:
            # Create a parser to parse arguments provided in the json
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str, required=True)
            parser.add_argument('password', type=str, required=True)

            args = parser.parse_args()

            login_admin_info = login_store(args['name'], args['password'])

            if successfully_found_user(login_admin_info):
                session['logged_in'] = True
                session['role'] = 'store'
                session['username'] = login_admin_info[0][1]
                session['id'] = login_admin_info[0][0]
                return jsonify({
                    "message": "Successful",
                    "id":login_admin_info[0][0],
                    "username":login_admin_info[0][1]
                })
            else:
                raise UnauthorizedError

        except UnauthorizedError:
            return jsonify(errors['UnauthorizedError'])


class Logout(Resource):
    def post(self):
        try:
            if not ('logged_in' in list(session.keys())) or not session['logged_in']:
                raise NotExistsError
            role = session['role']
            username = session['username']
            id = session['id']
            session.clear()

            return jsonify({
                "message": "Successfully Logged Out",
                "role": role,
                "username": username,
                "id": id
            })

        except NotExistsError:
            return jsonify(errors['NotExistsError'])
