from flask import Blueprint, request, jsonify
from app.database import db
from app.models.user import User
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify(msg='Username already exists'), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify(msg='Email already exists'), 400
    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(msg='User created'), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify(msg='Bad email or password'), 401
    access_token = create_access_token(identity={'id': user.id, 'role': user.role})
    return jsonify(access_token=access_token), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    identity = get_jwt_identity()
    user = User.query.get(identity['id'])
    return jsonify(
        id=user.id,
        username=user.username,
        email=user.email,
        role=user.role
    ), 200