Template.ListaDeUsuarios.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('listaDeUsuarios');
	});
});

Template.ListaDeUsuarios.helpers({
	usuarios: function () {
		return ClientesDistribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});

Template.ListaDeUsuarios.events({
	'click .cambiar': function () {

		let datos = {};

		

		datos.userId 	= this.usuarioId;
		datos.id 		= this._id;

		
			Meteor.call('cambiarTipoUsuario', datos, function (err, result) {
				if (err) {
					console.log(err.reason);
				} else {
					Bert.alert( 'Cancelaste a un usuario', 'success' );
				}
			});
		
	}
});


Template.ListaDeUsuariosCancelados.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('listaDeUsuariosCancelados');
	});
});

Template.ListaDeUsuariosCancelados.helpers({
	usuarios: function () {
		return ClientesDistribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});

Template.ListaDeUsuariosCancelados.events({
	'click .cambiar': function () {

		let datos = {};

		

		datos.userId 	= this.usuarioId;
		datos.id 		= this._id;

		
			Meteor.call('cambiarTipoUsuarioCancelado', datos, function (err, result) {
				if (err) {
					console.log(err.reason);
				} else {
					Bert.alert( 'Agregaste a un usuario', 'success' );
				}
			});
		
	}
});


// Referidos

Template.ListaDeReferidos.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('listaDeUsuariosReferidos');
	});
});

Template.ListaDeReferidos.helpers({
	referidos: function () {
		return ClientesDistribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});

Template.ListaDeReferidos.events({
	'click .cambiar': function () {

		let datos = {};

		

		datos.usuarioId = this.usuarioId;
		datos.id = this._id;
		
			Meteor.call('cambiarTipoUsuarioDistribuidor', datos, function (err, result) {
				if (err) {
					console.log(err.reason);
				} else {
					Bert.alert( 'Cancelaste a un usuario', 'success' );
				}
			});
		
	}
});

// Referidos cancelados

Template.ListaDeReferidosCancelados.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('listaDeUsuariosReferidosCancelados');
	});
});

Template.ListaDeReferidosCancelados.helpers({
	cancelados: function () {
		return ClientesDistribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});

Template.ListaDeReferidosCancelados.events({
	'click .cambiar': function () {

		let datos = {};

		

		datos.usuarioId = this.usuarioId;
		datos.id = this._id;
		
		Meteor.call('cambiarTipoUsuarioDistribuidorCancelado', datos, function (err, result) {
			if (err) {
				console.log(err.reason);
			} else {
				Bert.alert( 'Agregaste a un usuario', 'success' );
			}
		});
		
	}
});


// Distribuidores

Template.ListaDeDistribuidores.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('listaDistribuidores');
	});
});

Template.ListaDeDistribuidores.helpers({
	distribuidores: function () {
		return Distribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});

Template.ListaDeDistribuidores.events({
	'click .cambiar': function () {
		var distribuidorId = this.usuarioId;
		FlowRouter.go('/dashboard/admin/distribuidores/' + distribuidorId);
	}
});

// Clientes de cada distribuidor

Template.ListaDeClientesDeUnDistribuidor.onCreated(function () {
	var self = this;
	self.autorun(function () {
		let distribuidorId = FlowRouter.getParam('distribuidorid');

		self.subscribe('listaDeClientesPorDistribuidor', distribuidorId);
	});
});

Template.ListaDeClientesDeUnDistribuidor.helpers({
	clientes: function () {
		return ClientesDistribuidores.find();
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
}); 


Template.ListaDeClientesDeUnDistribuidorCancelado.onCreated(function () {
	var self = this;
	self.autorun(function () {
		let distribuidorId = FlowRouter.getParam('distribuidorid');

		self.subscribe('listaDeClientesPorDistribuidorCancelados', distribuidorId);
	});
});

Template.ListaDeClientesDeUnDistribuidorCancelado.helpers({
	clientes: function () {
		return ClientesDistribuidores.find({}, {sort: {createdAt: -1}});
	},
	fecha: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.createdAt;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
}); 