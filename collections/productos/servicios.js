Servicios = new Mongo.Collection('servicios');

ServiciosSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	descripcion: {
		type: String,
		label: 'Sin descripcion'
	},
	negocioId: {
		type: String
	},
	costo: {
		type: String,
		optional: true
	}
});

Servicios.attachSchema(ServiciosSchema);