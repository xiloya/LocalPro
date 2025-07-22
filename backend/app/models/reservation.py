from app.database import db
from datetime import datetime

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending')  # or 'confirmed', 'cancelled', 'completed'

    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    prestataire_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)

    client = db.relationship('User', foreign_keys=[client_id], backref='reservations_made')
    prestataire = db.relationship('User', foreign_keys=[prestataire_id], backref='reservations_received')
    service = db.relationship('Service', backref='reservations')
