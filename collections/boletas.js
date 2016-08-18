

Boletas = new Mongo.Collection('boletas');

BoletasSchema = new SimpleSchema({
	fecha: {
		type: Date
	}
});

Boletas.attachSchema(BoletasSchema);