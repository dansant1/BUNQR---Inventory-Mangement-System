Lineas = new Mongo.Collection('lineas');

LineasSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	descripcion: {
		type: String
	},
	createdAt: {
		type: Date
	},
	negocioId: {
		type: String
	}
});

Lineas.attachSchema(LineasSchema);