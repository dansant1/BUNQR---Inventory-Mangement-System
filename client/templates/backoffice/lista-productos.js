Template.listaProductos.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaProductos', negocioId);  
	});
	console.log('Si se suscribe');
});

Template.listaProductos.helpers({
	productos: function () {
		return Productos.find();
	}
});

Template.listaAlmacen.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaAlmacenes', negocioId);  
	});
	console.log('Si se suscribe');
});

Template.listaAlmacen.helpers({
	almacenes: function () {
		return Almacen.find();
	}
});

Template.listaUnidad.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaPresentaciones', negocioId);  
	});
	console.log('Si se suscribe');
});

Template.listaUnidad.helpers({
	unidades: function () {
		return Presentacion.find();
	}
});


Template.listaUnidadTwo.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaPresentaciones', negocioId);  
	});
	console.log('Si se suscribe');
});

Template.listaUnidadTwo.helpers({
	unidades: function () {
		return Presentacion.find();
	}
});


Template.listaClientes.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaClientes', negocioId);  
	});
	console.log('Si se suscribe clientes');
});

Template.listaClientes.helpers({
	clientes: function () {
		return Clientes.find();
	}
});


Template.listaFormasPago.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaFormasPago', negocioId);  
	});
	console.log('Si se suscribe formas de pago');
});

Template.listaFormasPago.helpers({
	formas: function () {
		return FormasdePago.find();
	}
});


Template.listaProveedores.onCreated(function() {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaProveedores', negocioId);  
	});
	
});

Template.listaProveedores.helpers({
	proveedor: function () {
		return Proveedores.find();
	}
});

Template.ListaDeProductos.onCreated(function () {
	var self = this;
	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaProductos', negocioId);  
    	Suscripcion.subscribe('users');
	});
});

Template.ListaDeProductos.helpers({
	productos: function () {
		return Productos.find();
	},
	productosIndex: function () {

		return ProductosIndex;
	},
	nombres: function () {
		return Meteor.users.find();
	}
});

Template.ListaDeProductos.events({
	'click .agregar': function (e, template) {
		e.preventDefault();

		var datos = {
			productoId: this.__originalId,
			utilidad: this.utilidad,
			pventa: this.pventa,
			pcosto: this.pcosto,
			nombre: this.nombre,
			codigo: this.codigo
		};

		console.log(datos.productoId);

		$('input[name="cantidad"]').each(function(key,val){
      		if (val.value !== "") {
      			datos.cantidad = val.value;
      			val.value = "";
      		} 
		});
		// Medidas
		$('tr>td>p>#unidad').each(function(key,val){
      		 
      		if (val.value !== "opcion") {
      			datos.medida = val.value;
      			val.value = "opcion"	
      		} 
		});

		// Fin de medidas
		
		datos.cargaId = FlowRouter.getParam('cargaid');
		datos.reporteId = FlowRouter.getParam('reporteid');

		Meteor.call('agregarProductoACargaItem', datos, function (err, result) {
			if (err) {
				console.log(err.reason);
			}
		}); 
		
	}
});


Template.ListaCargaItem.onCreated(function () {
	var self = this;
	self.autorun(function() {
    	var cargaId = FlowRouter.getParam('cargaid');
    	self.subscribe('listaCargaItem', cargaId); 
    	self.subscribe('CargaItemTwo', cargaId); 
	});
});

Template.ListaCargaItem.helpers({
	items: function () {
		return CargaItem.find();
	},
	carga: function () {
		return Cargas.find();
	}
});

Template.ListaCargaItem.events({
	'click .eliminar': function () {
		let datos = {
			importe: this.importe,
			cargaId: this.cargaId,
			cargaItemId: this._id,
			valor: this.valor,
			utilidad: this.valorUtilidad,
			productoId: this.productoId,
			cantidad: this.cantidad
		};

		datos.reporteId = FlowRouter.getParam('reporteid');
		
		// let cargaItemId = this._id;
		Meteor.call('eliminarCargaItem', datos, function (err) {
			if (err) {
				console.log(err.reason);
			}
		});
	}
});


Template.listaCuentas.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    var negocioId = FlowRouter.getParam('negocioid');
    self.subscribe('ListaCuentasBancarias', negocioId);  
  });
});

Template.listaCuentas.helpers({
	cuentas: function () {
		return CuentasBancarias.find();
	}
});