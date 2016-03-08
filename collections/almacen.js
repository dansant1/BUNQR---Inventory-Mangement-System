Almacen = new Mongo.Collection('almacen');

AlmacenSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	direccion: {
		type: String
	},
	negocioId: {
		type: String
	}
});

Almacen.attachSchema(AlmacenSchema);