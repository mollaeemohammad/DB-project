from app import create_app
from utilities.create_tables import create_tables


if __name__ == "__main__":
    create_tables()
    app = create_app()
    app.run(debug=True)