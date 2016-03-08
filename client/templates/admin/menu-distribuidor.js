Template.menuDistribuidor.events({
	'click .i-1': function () {
		FlowRouter.go('/dashboard');
	},
	'click .i-2': function () {
		FlowRouter.go('/dashboard/distribuidores/clientes');
	},
	'click .i-3': function () {
		FlowRouter.go('/dashboard/distribuidores/ganancias');
	}
});