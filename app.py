from flask import Flask, g, current_app
from flask_restful import Api
# from flask_rbac import RBAC, RoleMixin, UserMixin
from utilities.errors import errors
from api.login import LoginAdmin, LoginCustomer, Logout
from api.all_categories import AllCategories
from api.choose_category import AllProductsOfCategory
from api.search_in_products import SearchInProducts
import logging


# class Role(RoleMixin):
#     pass
#
#
# class User(UserMixin):
#     pass
#
# def get_current_user():
#     with current_app.request_context():
#         return g.current_user
#
#
# rbac = RBAC()
# rbac.set_role_model(Role)
# rbac.set_user_model(User)
# rbac.set_user_loader(get_current_user)
#
# user = User()
# customer = Role('customer')
# store = Role('store')
# admin = Role('admin')
# anonymous = Role('anonymous')


def init_routes(api: Api) -> None:
    """
    Add API URL routes
    :param api: The Flask API object to which URLs are added
    """
    api.add_resource(LoginAdmin, '/api/login_admin')
    api.add_resource(LoginCustomer, '/api/login_customer')
    api.add_resource(Logout, '/api/logout')
    api.add_resource(AllCategories, '/api/all_categories')
    api.add_resource(AllProductsOfCategory, '/api/all_products_of_category')
    api.add_resource(SearchInProducts, '/api/search_in_products')


def create_app() -> Flask:
    """
    :return: The Flask object which will run and listen to incoming requests
    """
    app = Flask(__name__)

    app.secret_key = 'asdsdfsdfs13sdf_df%&'

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    log_handler = logging.FileHandler(filename='./logs/requests.log', mode='a+')
    formatter = logging.Formatter('[%(asctime)s] %(levelname)-8s %(filename)s %(funcName)s %(message)s')
    log_handler.setFormatter(formatter)
    app.logger.addHandler(log_handler)

    # rbac.init_app(app)

    app.config['RBAC_USE_WHITE'] = True

    # Create a Flask API object
    api = Api(app, errors=errors)
    # Initialize API routes
    init_routes(api)
    return app
