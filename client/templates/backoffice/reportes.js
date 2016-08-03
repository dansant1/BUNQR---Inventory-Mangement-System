Template.reportes.onCreated(function () {
	let negocioId = FlowRouter.getParam('negocioid');
	var self = this;
	self.autorun(function () {
		Suscripcion.subscribe('todosLosReportes', negocioId);
	});
});

Template.reporteDiario.onCreated(function () {
	let reporteId = FlowRouter.getParam('reporteid');
	var self = this;
	self.autorun(function () {
		self.subscribe('reportes', reporteId);
	});
});

Template.reporteDiario.helpers({
	reportes: function () {
		return Reportes.findOne({}, {sort: {fecha: -1}});
	},
	merma: function () {
		if (this.valorMerma === undefined) {
			return 0;
		} else {
			//return this.valorMerma.toLocaleString();
			return this.valorMerma.toFixed(1);
		}
	},
	venta: function () {
		if (this.valorVenta === undefined) {
			return 0;
		} else {
			//return this.valorVenta.toLocaleString();
			return this.valorVenta.toFixed(1);
		}
	},
	costo: function () {
		if (this.valorCosto === undefined) {
			return 0;
		} else {
			//return this.valorCosto.toLocaleString();
			return this.valorCosto.toFixed(1);
		}
	},
	utilidad: function () {
		if (this.valorutilidadVenta === undefined) {
			return 0;
		} else {
			//return this.valorutilidadVenta.toLocaleString();
			return this.valorutilidadVenta.toFixed(1);
		}
	},
	compra: function () {
		if (this.valorCompras === undefined) {
			return 0;
		} else {
			//return this.valorCompras.toLocaleString();
			return this.valorCompras.toFixed(1);
		}	
	}
});

Template.reportes.onCreated(function () {
	let negocioId = FlowRouter.getParam('negocioid');
	var self = this;
	self.autorun( function () {
		self.subscribe('todosLosReportes', negocioId);
	});
});

Template.reportes.helpers({
	
	todosreportes: function () {
		return Reportes.find({}, {sort: {fecha: -1}});
	},
	merma: function () {
		if (this.valorMerma === undefined) {
			return 0;
		} else {
			//return this.valorMerma.toLocaleString();
			return this.valorMerma.toFixed(1);
		}
	},
	venta: function () {
		if (this.valorVenta === undefined) {
			return 0;
		} else {
			//return this.valorVenta.toLocaleString();
			return this.valorVenta.toFixed(1);
		}
	},
	costo: function () {
		if (this.valorCosto === undefined) {
			return 0;
		} else {
			//return this.valorCosto.toLocaleString();
			return this.valorCosto.toFixed(1);
		}
	},
	utilidad: function () {
		if (this.valorutilidadTotal === undefined) {
			return 0;
		} else {
			//return this.valorutilidadTotal.toLocaleString();
			return this.valorutilidadTotal.toFixed(1);
		}
	},
	compra: function () {
		if (this.valorCompras === undefined) {
			return 0;
		} else {
			//return this.valorCompras.toLocaleString();
			return this.valorCompras.toFixed(1);
		}	
	}
});

Template.reportes.events({
	'click .ingreso-ventas': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas');
	},
	'click .ingreso-carga': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/almacenes');
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