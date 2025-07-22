from app.database import db
from app import bcrypt

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    
    __mapper_args__ = {
        'polymorphic_on': role,
        'polymorphic_identity': 'user'
    }

    
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
   


class Prestataire(User):
    __mapper_args__ = {
        'polymorphic_identity': 'prestataire',
    }
    bio = db.Column(db.Text)
    competences = db.Column(db.Text)   
    disponibilite = db.Column(db.Boolean, default=True)

    @property
    def average_rating(self):
        from app.models.review import Review
        avg = db.session.query(db.func.avg(Review.note))\
            .filter(Review.prestataire_id == self.id).scalar()
        return round(avg or 0, 2)
    


class Admin(User):
    __mapper_args__ = {
        'polymorphic_identity': 'admin',
    }
   
