Negocios = new Mongo.Collection('negocios');

NegociosSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	descripcion: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date
	},
	userId: {
		type: String
	}
});

Negocios.attachSchema(NegociosSchema);