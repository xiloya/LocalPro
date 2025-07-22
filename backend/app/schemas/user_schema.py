from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    role = fields.Str(dump_only=True)
    bio = fields.Str(allow_none=True)
    competences = fields.Str(allow_none=True)
    disponibilite = fields.Bool(allow_none=True)
