Template.POS.helpers({
  esNoMobil() {
    let ancho = $(window).width();
    let alto = $(window).height();

    if (ancho <= 1030 || alto <= 435) {
      return false
    }
    return true
  }
})

Template.POS.onCreated(function () {

	let template = Template.instance();
	let negocioId = Meteor.user().profile.negocioId;
  let ventaId = FlowRouter.getParam('ventaid');

	template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( () => {

    template.subscribe('listaVentaItem', ventaId)
    template.subscribe('ventaTotal', ventaId)

		template.subscribe( 'ListaProductosItemBuscador', negocioId, template.searchQuery.get(), () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 400 );
    });
  });

});

Template.POS.events({
  'click .cancelar'() {
    let ventaId 	= FlowRouter.getParam('ventaid');
		let reporteId 	= FlowRouter.getParam('reporteid');

		Meteor.call('eliminarVenta', ventaId, reporteId, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Bert.alert( 'Cancelaste la venta', 'warning' );
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas/');
			}
		});
  },
  'click .agregar'(e, template) {

		let datos = {
			codigo: this.codigo,
			nombre: this.nombre,
			pventa: this.pventa,
			productoId: this._id,
			utilidad: this.utilidad,
			pcosto: this.pcosto,
      cantidad: '1',
      descuento: "0"
		};

		datos.reporteId = FlowRouter.getParam('reporteid');

		datos.ventaId = FlowRouter.getParam('ventaid');

    Meteor.call('agregarProductoAVentaItem', datos, function (err, result) {
      if (err) {
        console.log(err.reason);
      }
    });

	},
  'click [name="pagar"]'(e, t) {
    Modal.show('PagarPOS')
  },
  'keyup [name="search"]' ( event, template ) {

    let value = event.target.value.trim();

    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }
    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  },
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

Template.POS.helpers({
	productos() {
		let negocioId = Meteor.user().profile.negocioId;
		return Productos.find({ negocioId: negocioId });
	},
  hayStock() {
    if (this.stock > 0) {
      return "__green"
    }

    return "__red"
  },
  productosSeleccionados() {
		return VentasItem.find();
	},
	venta() {
		return Ventas.find();
	},
	importeReal() {
		return this.importe.toFixed(1);
	},
	totalReal() {
		return this.total.toFixed(1);
	}
});

Template.PagarPOS.helpers({
  venta() {
		return Ventas.find();
	},
	importeReal() {
		return this.importe.toFixed(1);
	},
	totalReal() {
		return this.total.toFixed(1);
	},
  clientes: function () {
		return Clientes.find();
	},
  formas() {
		return FormasdePago.find();
	}
})

Template.PagarPOS.onCreated(function () {

	let template = Template.instance();
	let negocioId = Meteor.user().profile.negocioId;

  template.autorun( () => {
    template.subscribe('listaClientes', negocioId)
    template.subscribe('listaFormasPago', negocioId)
  });

});

Template.PagarPOS.events({
  'click [name="guardar"]'() {
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
				Bert.alert(error.reason, 'warning');
			} else {
				Bert.alert( 'Guardaste la venta', 'success' );
        Modal.hide('PagarPOS')
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas');

      }
		});
	},
	'click [name="cancelar"]'() {
		let ventaId 	= FlowRouter.getParam('ventaid');
		let reporteId 	= FlowRouter.getParam('reporteid');

		Meteor.call('eliminarVenta', ventaId, reporteId, function (error) {
			if (error) {
				console.log(error.reason);
			} else {
				Bert.alert( 'Cancelaste la venta', 'warning' );
        Modal.hide('PagarPOS')
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas/');
			}
		});
	}
})
