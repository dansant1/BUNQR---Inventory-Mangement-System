Categorias = new Mongo.Collection('categorias');

CategoriasSchema = new SimpleSchema({
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

Categorias.attachSchema(CategoriasSchema);