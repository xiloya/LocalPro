from app.database import db
from app import bcrypt

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    # Polymorphic identity
    __mapper_args__ = {
        'polymorphic_on': role,
        'polymorphic_identity': 'user'
    }

    # Only providers will actually have services—SQLAlchemy still needs this here
    services = db.relationship(
        'Service',
        back_populates='prestataire',
        cascade='all, delete-orphan'
    )

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Client(User):
    __mapper_args__ = {
        'polymorphic_identity': 'client',
    }
    # you can add client‑specific methods here if you like


class Prestataire(User):
    __mapper_args__ = {
        'polymorphic_identity': 'prestataire',
    }
    bio = db.Column(db.Text)
    competences = db.Column(db.Text)   # e.g. comma‑separated strings
    disponibilite = db.Column(db.Boolean, default=True)

    # inherits `services` relationship from User


class Admin(User):
    __mapper_args__ = {
        'polymorphic_identity': 'admin',
    }
    # admin‑specific methods / fields if needed
