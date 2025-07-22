from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database import db
from app.models.service import Service
from app.schemas.service_schema import ServiceSchema
from flask import jsonify

services_bp = Blueprint('services', __name__, url_prefix='/services')
service_schema = ServiceSchema()
services_schema = ServiceSchema(many=True)

@services_bp.route('', methods=['POST'])
@jwt_required()
def create_service():
    identity = get_jwt_identity()
    if identity['role'] != 'prestataire':
        return jsonify(msg='Unauthorized'), 403

    data = service_schema.load(request.get_json())
    service = Service(**data, prestataire_id=identity['id'])
    db.session.add(service)
    db.session.commit()
    return jsonify(service_schema.dump(service)), 201


@services_bp.route('', methods=['GET'])
def list_services():
    services = Service.query.all()
    return jsonify(services_schema.dump(services)), 200


@services_bp.route('/<int:id>', methods=['GET'])
def get_service(id):
    service = Service.query.get_or_404(id)
    return jsonify(service_schema.dump(service)), 200


@services_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    identity = get_jwt_identity()
    service = Service.query.get_or_404(id)
    if service.prestataire_id != identity['id']:
        return jsonify(msg='Unauthorized'), 403

    data = service_schema.load(request.get_json(), partial=True)
    for key, val in data.items():
        setattr(service, key, val)
    db.session.commit()
    return jsonify(service_schema.dump(service)), 200


@services_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    identity = get_jwt_identity()
    service = Service.query.get_or_404(id)
    if service.prestataire_id != identity['id']:
        return jsonify(msg='Unauthorized'), 403

    db.session.delete(service)
    db.session.commit()
    return jsonify(msg='Service deleted'), 200
