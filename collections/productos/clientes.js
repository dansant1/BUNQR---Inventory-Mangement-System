Clientes = new Mongo.Collection('clientes');

ClientesSchema = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	numero: {
		type: Number
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