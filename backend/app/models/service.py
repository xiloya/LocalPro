from app.database import db

class Service(db.Model):
    __tablename__ = 'service'

    id = db.Column(db.Integer, primary_key=True)
    titre = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    prix = db.Column(db.Float, nullable=False)
    categorie = db.Column(db.String(50), nullable=False)
    localisation = db.Column(db.String(100), nullable=False)
    prestataire_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    prestataire = db.relationship(
        'User',
        back_populates='services'
    )
