Marcas = new Mongo.Collection('marcas');

MarcasSchema = new SimpleSchema({
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

Marcas.attachSchema(MarcasSchema);