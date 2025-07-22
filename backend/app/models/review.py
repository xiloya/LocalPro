from app.database import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.Integer, nullable=False)  # rating from 1 to 5
    commentaire = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    prestataire_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    client = db.relationship('User', foreign_keys=[client_id], backref='written_reviews')
    prestataire = db.relationship('User', foreign_keys=[prestataire_id], backref='received_reviews')
