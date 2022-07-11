from flask import Flask, g, current_app
from flask_restful import Api
# from flask_rbac import RBAC, RoleMixin, UserMixin
from utilities.errors import errors
from api.login import LoginAdmin, LoginCustomer, LoginStore, Logout
from api.all_categories import AllCategories
from api.choose_category import AllProductsOfCategory
from api.search_in_products import SearchInProducts
from api.all_stores import AllStores
from api.choose_product import ChooseProduct
from api.buy import Buy
from api.all_addresses_of_customer import AllAddressesOfCustomer
from api.update_product_count import UpdateProductCount
from api.add_review import AddReview
from api.add_new_product import AddNewProduct
from api.add_problem import AddProblem
from api.all_orders_of_customer import AllOrdersOfCustomer
from api.all_problems_of_store import AllProblemsOfStore
from api.choose_order import ChooseOrder
from api.up_down_vote import UpVote, DownVote
from api.update_discount_product_store import UpdateDiscountProductStore
from api.all_deliveries import AllDeliveries
from api.add_new_category import AddNewCategory
from api.add_new_customer import AddNewCustomer
from api.add_new_store import AddNewStore
from api.add_new_address_to_customer import AddNewAddressToCustomer
from api.suggestion import Suggestion
from api.update_status_order_customer import UpdateStatusOrderCustomer
import logging
from flask_cors import CORS



def init_routes(api: Api) -> None:
    """
    Add API URL routes
    :param api: The Flask API object to which URLs are added
    """
    api.add_resource(LoginAdmin, '/api/login_admin')
    api.add_resource(LoginCustomer, '/api/login_customer')
    api.add_resource(LoginStore, '/api/login_store')
    api.add_resource(Logout, '/api/logout')
    api.add_resource(AllCategories, '/api/all_categories')
    api.add_resource(AllProductsOfCategory, '/api/all_products_of_category')
    api.add_resource(SearchInProducts, '/api/search_in_products')
    api.add_resource(AllStores, '/api/all_stores')
    api.add_resource(ChooseProduct, '/api/choose_product')
    api.add_resource(Buy, '/api/buy')
    api.add_resource(AllAddressesOfCustomer, '/api/all_addresses_of_customer')
    api.add_resource(UpdateProductCount, '/api/update_product_count')
    api.add_resource(AddReview, '/api/add_review')
    api.add_resource(AddNewProduct, '/api/add_new_product')
    api.add_resource(AddProblem, '/api/add_problem')
    api.add_resource(AllOrdersOfCustomer, '/api/all_orders_of_customer')
    api.add_resource(AllProblemsOfStore, '/api/all_problems_of_store')
    api.add_resource(ChooseOrder, '/api/choose_order')
    api.add_resource(UpVote, '/api/up_vote')
    api.add_resource(DownVote, '/api/down_vote')
    api.add_resource(UpdateDiscountProductStore, '/api/update_discount_product_store')
    api.add_resource(AllDeliveries, '/api/all_deliveries')
    api.add_resource(AddNewCategory, '/api/add_new_category')
    api.add_resource(AddNewCustomer, '/api/add_new_customer')
    api.add_resource(AddNewStore, '/api/add_new_store')
    api.add_resource(AddNewAddressToCustomer, '/api/add_new_address_to_customer')
    api.add_resource(Suggestion, '/api/suggestion')
    api.add_resource(UpdateStatusOrderCustomer, '/api/update_status_order_customer')


def create_app() -> Flask:
    """
    :return: The Flask object which will run and listen to incoming requests
    """
    app = Flask(__name__)
    CORS(app)
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
