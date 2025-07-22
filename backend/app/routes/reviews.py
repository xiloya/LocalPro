from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database import db
from app.models.review import Review
from app.models.user import User
from app.models.reservation import Reservation
from app.schemas.review_schema import ReviewSchema

review_bp = Blueprint('reviews', __name__)
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)

@review_bp.route('/reviews', methods=['POST'])
@jwt_required()
def leave_review():
    data = request.get_json()
    user_data = get_jwt_identity()
    client_id = user_data['id']
    prestataire_id = data.get('prestataire_id')
    note = data.get('note')
    commentaire = data.get('commentaire')

    # Check if service was done with this provider
    reservation = Reservation.query.filter_by(client_id=client_id, prestataire_id=prestataire_id, status='completed').first()
    if not reservation:
        return jsonify({"msg": "You must complete a reservation with this provider before reviewing."}), 403

    review = Review(
        note=note,
        commentaire=commentaire,
        client_id=client_id,
        prestataire_id=prestataire_id
    )

    db.session.add(review)
    db.session.commit()

    return review_schema.dump(review), 201

@review_bp.route('/providers/<int:prestataire_id>/reviews', methods=['GET'])
def get_reviews_for_provider(prestataire_id):
    reviews = Review.query.filter_by(prestataire_id=prestataire_id).all()
    return reviews_schema.dump(reviews), 200
