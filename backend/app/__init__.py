from flask import Flask
from .config import Config
from .database import db, migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

   
    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    
    from .routes.services import services_bp
    app.register_blueprint(services_bp)

    from .routes.reservations import reservations_bp
    app.register_blueprint(reservations_bp)

    from .routes.reviews import review_bp
    app.register_blueprint(review_bp)
    return app
