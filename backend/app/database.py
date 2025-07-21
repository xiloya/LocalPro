from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create instances
db = SQLAlchemy()
migrate = Migrate()