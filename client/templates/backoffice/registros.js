Template.registros.onCreated(function () {
	var self = this;
  	self.autorun(function() {
    	var negocioId = FlowRouter.getParam('negocioid');
    	self.subscribe('listaPresentaciones', negocioId);  
  	});
});

Template.registros.helpers({
	presentaciones: function () {
		return Presentacion.find({}, {sort: {createdAt: -1}});
	}
});

Template.registros.events({
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