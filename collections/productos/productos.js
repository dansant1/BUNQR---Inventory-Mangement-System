Productos = new Mongo.Collection('productos');

ProductosSchema = new SimpleSchema({
	nombre: {
		type: String
	},
	descripcion: {
		type: String,
		label: 'Sin descripcion',
		optional: true
	},
	codigo: {
		type: String
	},
	pcosto: {
		type: Number,
		decimal: true
	},
	pventa: {
		type: Number,
		decimal: true,
		optional: true
	},
	pxmayor: {
		type: Number,
		decimal: true,
		optional: true
	},
	categoria: {
		type: String,
		optional: true
	},
	categoriaid: {
		type: String,
		optional: true
	},
	marca: {
		type: String,
		optional: true
	},
	marcaid: {
		type: String,
		optional: true
	},
	linea: {
		type: String,
		optional: true,
		optional: true
	},
	lineaid: {
		type: String,
		optional: true
	},
	createdAt: {
		type: Date
	},
	stockmin: {
		type: Number,
		decimal: true,
		optional: true
	},
	stockmax: {
		type: Number,
		decimal: true,
		optional: true
	},
	negocioId: {
		type: String
	},
	stock: {
		type: Number,
		optional: true,
		decimal: true
	},
	utilidad: {
		type: Number,
		decimal: true,
		optional: true
	},
	almacen: {
		type: Boolean,
		optional: true
	},
	valorCosto: {
		type: Number,
		decimal: true
	},
	valor: {
		type: Number,
		decimal: true
	},
	valorUtilidad: {
		type: Number,
		decimal: true
	},
	userId: {
		type: String
	},
	medida: {
		type: String
	}
});

Productos.attachSchema(ProductosSchema);

ProductosIndex = new EasySearch.Index({
  			collection: Productos,
  			fields: ['nombre', 'valor', 'utilidad', 'costo', 'codigo'],
  			engine: new EasySearch.MongoDB({
  				selector(searchObject, options, aggregation) {
      			// retrieve the default selector
      			let selector = this
        						.defaultConfiguration()
        						.selector(searchObject, options, aggregation);

      			// options.search.userId contains the userId of the logged in user
      			selector.userId = options.search.userId;

      			return selector;
    			}
  			}),
  			permission(options) {
        		return options.userId; // only allow searching when the user is logged in
   			}
		});