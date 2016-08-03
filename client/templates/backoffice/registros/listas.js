Template.listaMarca.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});


Template.listaLinea.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});


Template.listaCategoria.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});


Template.listaProducto.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});

Template.listaProducto.events({
	'click .ingreso-producto': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto/nuevo');
	},
	'click .ingreso-lista': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto/lista');
	},
	'click .almacen-ingreso': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .almacen-salida': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .almacen-producto': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
	},
	'click .almacen-stock': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .almacen-compra': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
	},
	'click .ingresar-carga': function () {
		Meteor.call('nuevoIngresoMasivo', function (err, result) {
			if (err) {
				console.log('Hubo un error');
			} else {
				var cargaId = result.cargaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + cargaId + '/ingresos/masivo/nuevo');
				Bert.alert( 'Agregaste una carga nueva', 'success' );	
			}
		});
	}
});


Template.registrosProductos.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('ListaProductosItem', negocioId);  
  	});
});

Template.registrosProductos.helpers({
	item: function () {
		return Productos.find({}, {sort: {createdAt: -1}});
	},
	utilidadReal() {
		return this.utilidad.toFixed(1);
	}
});

Template.listaStock.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('ListaProductosItem', negocioId);  
  	});
});

Template.listaStock.helpers({
	item: function () {
		return Productos.find({}, {sort: {createdAt: -1}});	
	}
});

Template.listaPresentacion.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});

Template.listaPresentacion.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	}
});


Template.listaServicio.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});


Template.listaProveedor.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});

Template.listaProveedor.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaProveedores', negocioId);  
  	});
});

Template.listaProveedor.helpers({
	proveedores: function () {
		return Proveedores.find({}, {sort: {
			createdAt: -1
		}});
	}
});

Template.listaProveedor.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	},
	'click .nuevo-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor/nuevo');
	}
});


Template.listaCliente.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaClientes', negocioId);  
  	});
});

Template.listaCliente.helpers({
	clientes: function () {
		return Clientes.find({});
	}
});

Template.listaCliente.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	}
});

Template.listaFormasDePago.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaFormasPago', negocioId);  
  	});
});

Template.listaFormasDePago.helpers({
	forma: function () {
		return FormasdePago.find({});
	}
});

Template.listaFormasDePago.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	}
});

Template.listaCuentasBancarias.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});

Template.listaCuentasBancarias.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	}
});


Template.listaAlmacenes.onCreated( function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaAlmacenes', negocioId);  
  	});
});

Template.listaAlmacenes.helpers({
	almacen: function () {
		return Almacen.find({});
	}
});

Template.listaAlmacenes.events({
	'click .ingreso-presentacion': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros');
	},
	'click .ingreso-producto': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/producto');
	},
	'click .ingreso-servicio': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/servicio');
	},
	'click .ingreso-pago': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/pagos');
	},
	'click .ingreso-cuenta': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cuentas-bancarias');
	},
	'click .ingreso-proveedor': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/proveedor');
	},
	'click .ingreso-cliente': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/cliente');
	},
	'click .ingreso-almacen': function () {
		var negocioId = FlowRouter.getParam('negocioid');
		var reporteId = FlowRouter.getParam('reporteid');
		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes');
	}
});

Template.listaIngresos.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam('negocioid');

		return negocioId;
	}
});


Template.listaSalidas.events({
	
	'click .ingreso-merma': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('crearMerma',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var mermaId = result.mermaId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' +  mermaId + '/nuevo');
			}
		});
		
	},
	'click .lista-merma': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma');
	},
	'click .almacen-ingreso': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .almacen-salida': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .almacen-producto': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
	},
	'click .almacen-stock': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .almacen-compra': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
	}
});

Template.Ventas.events({
	'click .lista-devolucion': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/devoluciones');
	},
	'click .ingreso-devolucion': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/devoluciones/nuevo');
	}
});


Template.Almacen.onCreated(function () {
	
	var self = this;
	
	let template = Template.instance();
	template.gananciaTotal = new ReactiveVar();
	template.utilidadTotal = new ReactiveVar();
	template.costoTotal = new ReactiveVar();

	self.autorun(function () {
		let negocioId = FlowRouter.getParam('negocioid')
		
		self.subscribe('users');
	});

});

Template.Almacen.onRendered(function () {
	
	let negocioId = FlowRouter.getParam('negocioid');	

	Meteor.call( 'obtenerTotal', negocioId, ( error, response ) => {
        if ( error ) {
        	console.log(error.reason);
        } else {
        	 this.gananciaTotal.set( response );
        }
    });

    Meteor.call( 'obtenerUtilidad', negocioId, ( error, response ) => {
        if ( error ) {
        	console.log(error.reason);
        } else {
        	 this.utilidadTotal.set( response );
        }
    });

    Meteor.call( 'obtenerCosto', negocioId, ( error, response ) => {
        if ( error ) {
        	console.log(error.reason);
        } else {
        	 this.costoTotal.set( response );
        }
    });

});

Template.Almacen.helpers({
	productos: function () {
		return Productos.find();
	},
	gananciaTotal: function () {
		let revenues = Template.instance().gananciaTotal.get(),
            total    = 0;

            if ( revenues ) {
                revenues.map( ( revenue ) => total += revenue.total );
            }



            //return  total.toLocaleString();
            return total.toFixed(1);
	},
	utilidadTotal: function () {
		let revenues = Template.instance().utilidadTotal.get(),
            total    = 0;

            if ( revenues ) {
                revenues.map( ( revenue ) => total += revenue.total );
            }

            //return  total.toLocaleString();
			return total.toFixed(1);
	},
	cantidad: function () {
		let revenues = Template.instance().utilidadTotal.get(),
            total    = 0;

            if ( revenues ) {
                revenues.map( ( revenue ) => total += 1 );
            }

            return  total;
	},
	costoTotal: function () {
		let revenues = Template.instance().costoTotal.get(),
            total    = 0;

            if ( revenues ) {
                revenues.map( ( revenue ) => total += revenue.total );
            }

            //return  total.toLocaleString();
            return total.toFixed(1);
	},
	productosIndex: function () {
		
		return ProductosIndex;
	},
	hayProducto: function () {
		if ( Productos.find().count() === 0 ) {
			return false;
		} else {
			return true;
		}
	},
	Valor: function () {
		//let valor = this.valor.toLocaleString();
		let valor = this.valor.toFixed(1);
		return valor;
	},
	Utilidad: function () {
		//let utilidad = this.valorUtilidad.toLocaleString();
		let utilidad = this.valorUtilidad.toFixed(1);
		return utilidad;
	},
	Costo: function () {
		//let costo = this.valorCosto.toLocaleString();
		let costo = this.valorCosto.toFixed(1);
		return costo;
	},
	nombres: function () {
		return Meteor.users.find();
	}
});

Template.Almacen.events({
	'click .almacen-ingreso': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .almacen-salida': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .almacen-producto': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
	},
	'click .almacen-stock': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .almacen-compra': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
	},
	'click .ingresar-carga': function () {

		Meteor.call('nuevoIngresoMasivo', function (err, result) {
			if (err) {
				console.log('Hubo un error');
			} else {
				var cargaId = result.cargaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + cargaId + '/ingresos/masivo/nuevo');
				Bert.alert( 'Agregaste una carga nueva', 'success' );	
			}
		});
	},
	'click .ingresar-merma': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('crearMerma',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var mermaId = result.mermaId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' +  mermaId + '/nuevo');
			}
		});
	}
});

Template.ingresosAlmacen.events({
	'click .ingreso-masivo': function () {

		Meteor.call('nuevoIngresoMasivo', function (err, result) {
			if (err) {
				console.log('Hubo un error');
			} else {
				var cargaId = result.cargaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + cargaId + '/ingresos/masivo/nuevo');
				Bert.alert( 'Agregaste una carga nueva', 'success' );	
			}
		});

		
	},
	'click .ingreso-compra': function () {

		Meteor.call('nuevaCompraItem', function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var compraId = result.compraId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + compraId + '/ingresos/compras/nuevo');
			}
		});
	},
	'click .lista-masivo': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .lista-compra': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
	},
	'click .almacen-ingreso': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes/ingresos');
	},
	'click .almacen-salida': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .almacen-producto': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
	},
	'click .almacen-stock': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/stock');
	}
});

Template.Ventas.events({
	'click .venta-proforma': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/proformas');
	},
	'click .venta-pedido': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/ventas/pedidos');
	},
	'click .venta-pos': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas/pos');
	}
});


Template.listaCargasMasivo.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('ListaCargasMasivo', negocioId);  
  	});
});

Template.listaCargasMasivo.helpers({
	item: function () {
		return Cargas.find({}, {sort: {createdAt: -1} });
	},
	fechaAlmacenado: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.fecha;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;
	},
	totalreal() {
		return this.total.toFixed(1);
	}
});

Template.listaCargasMasivo.events({
	'click .ver': function () {
		var cargaId = this._id;
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo/' + cargaId);
	},
	'click .almacen-ingreso': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .almacen-salida': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .almacen-producto': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
	},
	'click .almacen-stock': function (e, t) {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .almacen-compra': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
	},
	'click .ingresar-stock': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .ingresar-carga': function () {
		Meteor.call('nuevoIngresoMasivo', function (err, result) {
			if (err) {
				console.log('Hubo un error');
			} else {
				var cargaId = result.cargaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + cargaId + '/ingresos/masivo/nuevo');
				Bert.alert( 'Agregaste una carga nueva', 'success' );	
			}
		});
	},
	'click .ingresar-merma': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('crearMerma',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var mermaId = result.mermaId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' +  mermaId + '/nuevo');
			}
		});
	}
});

Template.detalleCarga.onCreated(function () {

	var self = this;
	let negocioId = FlowRouter.getParam('negocioid');
	let cargaId = FlowRouter.getParam('cargaid'); 
  	self.autorun(function () {
    	self.subscribe('ListaCargasMasivo', negocioId);
    	self.subscribe('ListaCargaitem', cargaId);  
  	});
});

Template.detalleCarga.events({
	'click .lista': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
	},
	'click .ingreso-stock': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');	
	}
});

Template.detalleCarga.helpers({
	carga: function () {
		let cargaId = FlowRouter.getParam('cargaid');

		return Cargas.find({_id: cargaId}); 
	},
	fechaIngreso: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.fecha;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;

	},
	cargaitem: function () {
		let cargaId = FlowRouter.getParam('cargaid');
		return CargaItem.find({cargaId: cargaId});
	},
	totalreal() {
		return this.total.toFixed(1);
	},
	importereal() {
		return this.importe.toFixed(1);
	},
	valorUtilidadreal() {
		return this.valorUtilidad.toFixed(1);
	},
	utilidadtotal() {
		var utilidad = 0;
		CargaItem.find().forEach(function (index) {
			utilidad = utilidad + index.valorUtilidad;
		});
		
		return utilidad.toFixed(1);
	},
	valorreal() {
		return this.valor.toFixed(1);
	},
	hayProveedor() {
		if (this.proveedor === "Sin proveedores registrados") {
			return false;
		} else {
			return true;
		}
	}
});


// Listas y detalle de Mermas

Template.listaMermas.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaMermas', negocioId);  
    	self.subscribe('users');  
  	});
});

Template.listaMermas.helpers({
	item: function () {
		return Mermas.find({}, {sort: {createdAt: -1}});
	},
	fechaSalida: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.fecha;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;
	},
	nombre: function () {
		return Meteor.users.findOne({});
	}
});

Template.listaMermas.events({
	'click .ver': function () {
		var mermaId = this._id;
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' + mermaId);
	}
});

Template.detalleMerma.onCreated(function () {
	
	var self = this;
	
	let mermaId = FlowRouter.getParam('mermaid'); 
  	self.autorun(function () {
  		self.subscribe('DetalleDeMerma', mermaId); 
    	self.subscribe('listaMermaItem', mermaId);
    	 
  	});
});

Template.detalleMerma.events({
	'click .lista': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		let reporteId = FlowRouter.getParam('reporteid');

		FlowRouter.go('/dashboard/' + reporteId + '/r/' + negocioId + '/registros/almacenes/salidas');
	},
	'click .ingreso-merma': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('crearMerma',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var mermaId = result.mermaId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' +  mermaId + '/nuevo');
			}
		});
	}
});

Template.detalleMerma.helpers({
	merma: function () {
		return Mermas.find(); 
	},
	fechaSalida: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.fecha;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;

	},
	mermaitem: function () {
		let mermaId = FlowRouter.getParam('mermaid');
		return MermasItem.find({mermaId: mermaId});
	}
});

// POS

Template.POS.events({
	'click .nueva-venta': function () {
		var negocioId = FlowRouter.getParam('negocioid');

		Meteor.call('nuevaVenta', negocioId, function (error, result) {
			if (error) {
				console.log(error.reason);
			} else {
				let ventaId = result.ventaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas/' + ventaId + '/nuevo');
			}
		});
	}
});

Template.Ventas.events({
	'click .nueva-venta': function () {
		var negocioId = FlowRouter.getParam('negocioid');

		Meteor.call('nuevaVenta', negocioId, function (error, result) {
			if (error) {
				console.log(error.reason);
			} else {
				let ventaId = result.ventaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas/' + ventaId + '/nuevo');
			}
		});
	}
});

Template.listaDeProductoVenta.onCreated(function () {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaProductos', negocioId);  
	});
});

Template.listaDeProductoVenta.helpers({
	productos: function () {
		return Productos.find();
	},
	productosIndex: function () {
      return ProductosIndex;
   }
});

Template.listaDeProductoVenta.events({
	'click .agregar': function (e, template) {
		e.preventDefault();

		let datos = {
			codigo: this.codigo,
			nombre: this.nombre,
			pventa: this.pventa,
			productoId: this.__originalId,
			utilidad: this.utilidad,
			pcosto: this.pcosto,
		};

		datos.reporteId = FlowRouter.getParam('reporteid');

		$('input[name="cantidad"]').each(function(key,val){
      		if (val.value !== "") {
      			datos.cantidad = val.value;
      			val.value = "";
      		} 
		});

		$('input[name="descuento"]').each(function(key,val){
      		if (val.value !== "") {
      			datos.descuento = val.value;
      			val.value = "";
      		} 
		});

		if (datos.descuento === undefined) {
			datos.descuento = "0";
		}

		datos.ventaId = FlowRouter.getParam('ventaid');

		console.log(datos.ventaId);

		if (datos.cantidad === undefined) {
			Bert.alert( 'Ingresa la cantidad, porfavor vuelve a intentarlo', 'warning' );
		} else {
			Meteor.call('agregarProductoAVentaItem', datos, function (err, result) {
				if (err) {
					console.log(err.reason);
				}
			});
		}
	}
});

Template.listaVentaItem.onCreated(function () {
	var self = this;
	self.autorun(function() {
    	var ventaId = FlowRouter.getParam('ventaid');
    	self.subscribe('listaVentaItem', ventaId); 
    	self.subscribe('ventaTotal', ventaId); 
	});
});

Template.listaVentaItem.helpers({
	productos: function () {
		return VentasItem.find();
	},
	venta: function () {
		return Ventas.find();
	},
	importeReal() {
		return this.importe.toFixed(1);
	},
	totalReal() {
		return this.total.toFixed(1);
	}
});

Template.listaVentaItem.events({
	'click .eliminar': function () {
		var ventaId = FlowRouter.getParam('ventaid');
		var datos = {
			importe: this.importe,
			itemId: this._id,
			ventaId: ventaId,
			cantidad: this.cantidad,
			productoId: this.productoId,
			pcosto: this.pcosto,
			utilidad: this.utilidad,
			pventa: this.pventa
		};

		datos.reporteId = FlowRouter.getParam('reporteid');
		
		Meteor.call('eliminarVentaItem', datos, function (error) {
			if (error) {
				console.log('Hubo un error');
			}
		});
	}
});

Template.registrarVenta.events({
	'click .guardar': function () {
		let ventaId = FlowRouter.getParam('ventaid');
		let datos = {
			cliente: $('#clientes>option:selected').text(),
			clienteId: $('#clientes>option:selected').val(),
			formaPago: $('#formas-pago>option:selected').text(),
			formaPagoId: $('#formas-pago>option:selected').val(),
			ventaId: ventaId
		};
		Meteor.call('guardarVenta', datos, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Bert.alert( 'Guardaste la venta :=)', 'success' );
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas/');
			}
		});
	},
	'click .cancelar': function () {
		let ventaId 	= FlowRouter.getParam('ventaid');
		let reporteId 	= FlowRouter.getParam('reporteid');

		Meteor.call('eliminarVenta', ventaId, reporteId, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Bert.alert( 'Cancelaste la venta :=)', 'warning' );
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas/');
			}
		});
	}
});

Template.ListaVentas.onCreated(function () {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid'); 
    	self.subscribe('ventasDelDia', negocioId); 
	});
});

Template.ListaVentas.helpers({
	ventas: function () {	
		return Ventas.find({}, {sort: {pagado: -1}});
	},
	fechaVenta: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.pagado;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;
	}
});

Template.ListaVentas.events({
	'click .ver': function () {
		let negocioId 	= FlowRouter.getParam('negocioid');
		let ventaId 	= this._id;

		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + negocioId + '/ventas/pos/' + ventaId + '/detalle');
	}
});

Template.detalleVenta.onCreated(function () {
	
	var self = this;
	
	let ventaId = FlowRouter.getParam('ventaid'); 
  	self.autorun(function () {
    	self.subscribe('DetalleVenta', ventaId);
    	self.subscribe('listaVentaItem', ventaId);  
  	});
});

Template.detalleVenta.events({
	'click .lista': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas');
	},
	'click .nueva-venta': function () {

		var negocioId = FlowRouter.getParam('negocioid');

		Meteor.call('nuevaVenta', negocioId, function (error, result) {
			if (error) {
				console.log(error.reason);
			} else {
				let ventaId = result.ventaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas/' + ventaId + '/nuevo');
			}
		});
	}
});

Template.detalleVenta.helpers({
	venta: function () {
		let ventaId = FlowRouter.getParam('ventaid');

		return Ventas.find({_id: ventaId}); 
	},
	fechaVenta: function () {
		let meses = [
			"Enero", "Febrero",
			"Marzo", "Abril",
			"Mayo", "Junio",
			"Julio", "Agosto",
			"Setiembre", "Octubre",
			"Noviembre", "Diciembre"
		];

		let fecha = this.pagado;
		let dia = fecha.getDate();
		let mes = fecha.getMonth();
		let anio = fecha.getFullYear();

		return dia + ' de ' + meses[mes] + ' de ' + anio;

	},
	ventaitem: function () {
		let ventaId = FlowRouter.getParam('ventaid');
		return VentasItem.find({ventaId: ventaId});
	}
});