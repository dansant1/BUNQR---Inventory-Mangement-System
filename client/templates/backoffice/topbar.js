Template.topbar.events({
	'click #open'(e, t) {
		$( ".menu").toggleClass( "open" );

	},
	'click .nuevo-1': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos');
	},
	'click .nuevo-2': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .nuevo-3': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/proformas');
	},
	'click .i-1': function () {

		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') );
	},
	'click .i-2': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .i-3': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/ventas');
	},
	'click .i-4': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/finanzas');
	},
	'click .i-5': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/consultas');
	},
	'click .i-6': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros' );
	},
	'click .i-7': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/configuracion' );
	},
	'click .i-8': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/configuracion/negocio' );
	},
	'click .logout': function () {
		Meteor.logout();
		Bert.alert( 'Nos vemos luego :=)', 'success' );
	}
});

Template.topbar.onCreated(function () {
	var self = this;

	self.autorun(function() {
    	var postId = FlowRouter.getParam('postId');
    	self.subscribe('users');
  	});
});

Template.topbar.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam("negocioid");
		return negocioId;
	},
	nombre: function () {
		return Meteor.users.findOne({});
	},
	EstaEnSeccionNegocio() {
		let botom = FlowRouter.getParam('reporteId')

		if (boton !== undefined) {
			return true
		}

		return;
	}
});
