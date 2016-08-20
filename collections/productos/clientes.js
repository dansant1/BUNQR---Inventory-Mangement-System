Clientes = new Mongo.Collection('clientes');

ClientesSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	numero: {
		type: Number,
		optional: true
	},
	ruc: {
		type: String,
		optional: true
	},
	direccion: {
		type: String,
		optional: true
	},
	nombre: {
		type: String
	},
	telefono: {
		type: Number,
		optional: true
	},
	contacto: {
		type: String,
		optional: true
	},
	negocioId: {
		type: String
	}
});

Clientes.attachSchema(ClientesSchema);