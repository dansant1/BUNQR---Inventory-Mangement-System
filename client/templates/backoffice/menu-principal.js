Template.menuPrincipal.helpers({
	id: function () {
		var negocioId = FlowRouter.getParam("negocioid");
		return negocioId;
	}
});

Template.menuPrincipal.events({
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
	'click .logout': function () {
		Meteor.logout();
		Bert.alert( 'Nos vemos luego :=)', 'success' );
	}
});