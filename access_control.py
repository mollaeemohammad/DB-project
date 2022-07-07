from flask import session


def has_role(role: str) -> bool:
    """
    Checking session for role.
    :param role: `admin`, `customer`, `store`
    :return:
    """
    if 'role' in list(session.keys()):
        if session.get('role') == role:
            return True
    return False


def is_logged_in() -> bool:
    if 'logged_in' in list(session.keys()):
        if session.get('logged_in'):
            return True
    return False

# from functools import wraps
# from flask import url_for, request, redirect, session
#
# ACCESS = {
#     'customer': 1,
#     'store': 2,
#     'admin': 3
# }
#
#
# class User():
#     def __init__(self, name, email, password, access=ACCESS['user']):
#         self.name = name
#         self.email = email
#         self.password = password
#         self.access = access
#
#     def is_admin(self):
#         return self.access == ACCESS['admin']
#
#     def is_store(self):
#         return self.access == ACCESS['store']
#
#     def is_customer(self):
#         return self.access == ACCESS['customer']
#
#     def allowed(self, access_level):
#         return self.access >= access_level
#
#
# def requires_access_level(access_level):
#     def decorator(f):
#         @wraps(f)
#         def decorated_function(*args, **kwargs):
#             if not session.get('email'):
#                 return redirect(url_for('users.login'))
#
#             user = User.find_by_email(session['email'])
#             elif not user.allowed(access_level):
#             return redirect(url_for('users.profile', message="You do not have access to that page. Sorry!"))
#
#         return f(*args, **kwargs)
#
#     return decorated_function
#
#
# return decorator
