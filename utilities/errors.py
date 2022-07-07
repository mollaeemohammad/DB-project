from werkzeug.exceptions import HTTPException, BadRequest


class InternalServerError(HTTPException):
    pass


class SchemaValidationError(HTTPException):
    pass


class AlreadyExistsError(HTTPException):
    pass


class UpdatingError(HTTPException):
    pass


class DeletingError(HTTPException):
    pass


class NotExistsError(HTTPException):
    pass


class EmailAlreadyExistsError(HTTPException):
    pass


class UnauthorizedError(HTTPException):
    pass


class InvalidArgumentsError(HTTPException):
    pass


class DatabaseConnectionError(HTTPException):
    pass


errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 503
    },
    "DatabaseConnectionError": {
        "message": "Connection with database could not be established",
        "status": 502
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "AlreadyExistsError": {
        "message": "Object with given name already exists",
        "status": 400
    },
    "UpdatingError": {
        "message": "Invalid field(s) or parameters provided",
        "status": 400
    },
    "DeletingError": {
        "message": "Deleting movie added by other is forbidden",
        "status": 403
    },
    "NotExistsError": {
        "message": "Object with given id doesn't exists",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    },
    "InvalidArgumentsError": {
        "message": "Invalid type or format of arguments",
        "status": 400
    }
}
