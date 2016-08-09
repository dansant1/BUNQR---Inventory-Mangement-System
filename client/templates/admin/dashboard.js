Template.resporteDistribuidor.onCreated( function () {

	var self = this;
   	self.autorun(function() { 
		self.subscribe('listaDeUsuariosPorDistribuidor');  
   	});

});

Template.resporteDistribuidor.helpers({
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