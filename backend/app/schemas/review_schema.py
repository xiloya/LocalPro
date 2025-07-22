from marshmallow import Schema, fields

class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    note = fields.Int(required=True)
    commentaire = fields.Str()
    date = fields.DateTime(dump_only=True)
    client_id = fields.Int()
    prestataire_id = fields.Int()
