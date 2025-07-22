from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.reservation import Reservation
from app.models.service import Service
from app.database import db
from app.schemas.reservation_schema import ReservationSchema

reservations_bp = Blueprint('reservations', __name__, url_prefix='/reservations')
reservation_schema = ReservationSchema()
reservations_schema = ReservationSchema(many=True)

# Client: Create reservation
@reservations_bp.route('', methods=['POST'])
@jwt_required()
def create_reservation():
    identity = get_jwt_identity()
    if identity['role'] != 'client':
        return jsonify(msg='Only clients can book services'), 403

    data = request.get_json()
    service_id = data.get('service_id')
    if not service_id:
        return jsonify(msg='Service ID is required'), 400

    service = Service.query.get(service_id)
    if not service:
        return jsonify(msg='Service not found'), 404

    reservation = Reservation(
        client_id=identity['id'],
        service_id=service_id,
        prestataire_id=service.prestataire_id,
        status='pending'
    )
    db.session.add(reservation)
    db.session.commit()

    return jsonify(reservation_schema.dump(reservation)), 201

# Client: List my reservations
@reservations_bp.route('/mine', methods=['GET'])
@jwt_required()
def list_my_reservations():
    identity = get_jwt_identity()
    if identity['role'] != 'client':
        return jsonify(msg='Unauthorized'), 403

    reservations = Reservation.query.filter_by(client_id=identity['id']).all()
    return jsonify(reservations_schema.dump(reservations)), 200

# Prestataire: See reservations for their services
@reservations_bp.route('/received', methods=['GET'])
@jwt_required()
def list_received_reservations():
    identity = get_jwt_identity()
    if identity['role'] != 'prestataire':
        return jsonify(msg='Unauthorized'), 403

    reservations = Reservation.query.join(Service).filter(Service.prestataire_id == identity['id']).all()
    return jsonify(reservations_schema.dump(reservations)), 200

# Common: Update status (confirm, cancel)
@reservations_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_reservation(id):
    identity = get_jwt_identity()
    reservation = Reservation.query.get_or_404(id)

    # Only client who made it or provider of the service can update
    if reservation.client_id != identity['id'] and reservation.service.prestataire_id != identity['id']:
        return jsonify(msg='Unauthorized'), 403

    data = request.get_json()
    if 'status' in data:
        reservation.status = data['status']
        db.session.commit()

    return jsonify(reservation_schema.dump(reservation)), 200

# Client: Cancel reservation
@reservations_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def cancel_reservation(id):
    identity = get_jwt_identity()
    reservation = Reservation.query.get_or_404(id)

    if reservation.client_id != identity['id']:
        return jsonify(msg='Unauthorized'), 403

    db.session.delete(reservation)
    db.session.commit()
    return jsonify(msg='Reservation canceled'), 200
