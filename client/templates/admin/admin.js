Template.clientesDeDistribuidores.events({
	'click .usuarios-cancelado': function () {
		FlowRouter.go('/dashboard/distribuidores/clientes/cancelados');
	}
});


Template.clientesCanceladosDeDistribuidores.events({
	'click .lista': function () {
		FlowRouter.go('/dashboard/distribuidores/clientes');
	}
});

Template.detalleDistribuidor.events({
	'click .usuarios-cancelado': function () {
		let distribuidorId = FlowRouter.getParam('distribuidorid');
		FlowRouter.go('/dashboard/admin/distribuidores/' + distribuidorId + '/cancelados');
	}
});