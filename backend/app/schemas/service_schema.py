from marshmallow import Schema, fields, validate

class ServiceSchema(Schema):
    id = fields.Int(dump_only=True)
    titre = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True)
    prix = fields.Float(required=True)
    categorie = fields.Str(required=True)
    localisation = fields.Str(required=True)
    prestataire_id = fields.Int(dump_only=True)
