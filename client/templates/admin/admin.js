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

Template.detalleDistribuidor.onCreated( function () {
	var self = this;

	self.autorun(function () {
		self.subscribe('listaDeUsuariosPorDistribuidorAdmin', FlowRouter.getParam('distribuidorid'));
	});
});

Template.detalleDistribuidor.helpers({
	activos() {
		return ClientesDistribuidores.find({cancelado: false}).fetch().length;
	},
	cancelados() {
		return ClientesDistribuidores.find({cancelado: true}).fetch().length;
	},
	pendiente() {
		var pagoPendiente = 0;

		ClientesDistribuidores.find({cancelado: false}).forEach(function (index) {
			pagoPendiente = pagoPendiente + 120;
		});

		return pagoPendiente;
	},
	pagado() {
		var pagado = 0;

		return pagado;
	}
});

Template.detalleDistribuidor.events({
	'click .usuarios-cancelado': function () {
		let distribuidorId = FlowRouter.getParam('distribuidorid');
		FlowRouter.go('/dashboard/admin/distribuidores/' + distribuidorId + '/cancelados');
	}
});