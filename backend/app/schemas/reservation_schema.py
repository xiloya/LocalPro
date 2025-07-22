from marshmallow import Schema, fields

class ReservationSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.DateTime()
    status = fields.Str()
    client_id = fields.Int()
    service_id = fields.Int()
    prestataire_id = fields.Int()
