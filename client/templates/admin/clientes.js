Template.clientes.events({
	'click .usuarios-cancelado': function () {
		FlowRouter.go('/dashboard/admin/clientes/cancelados');
	}
});

Template.clientesCancelados.events({
	'click .usuarios': function () {
		FlowRouter.go('/dashboard/admin/clientes/');
	}
});