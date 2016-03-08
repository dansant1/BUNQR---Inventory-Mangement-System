Presentacion = new Mongo.Collection('presentacion');

PresentacionSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	createdAt: {
		type: Date
	},
	negocioId: {
		type: String
	}
});

Presentacion.attachSchema(PresentacionSchema);