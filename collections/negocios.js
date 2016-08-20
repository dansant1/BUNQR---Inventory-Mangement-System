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
	ruc: {
		type: String,
		optional: true
	},
	direccion: {
		type: String,
		optional: true
	},
	provincia: {
		type: String,
		optional: true
	},
	departamento: {
		type: String,
		optional: true
	},
	codigo: {
		type: String,
		optional: true
	}
});

Negocios.attachSchema(NegociosSchema);