Meteor.publish('listaDeUsuarios', function () {
	if ( Roles.userIsInRole(this.userId, ['fundador']) ) {
		return ClientesDistribuidores.find({cancelado: false});
	} else {
		this.stop();
   		return;
	}
});

Meteor.publish('listaDeUsuariosPorDistribuidor', function () {
	if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {
		return ClientesDistribuidores.find({distribuidorId: this.userId});
	} else {
		this.stop();
   		return;
	}
});

Meteor.publish('listaDeUsuariosPorDistribuidorAdmin', function (distribuidorId) {
	check(distribuidorId, String);
	if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {
		return ClientesDistribuidores.find({distribuidorId: distribuidorId});
	} else {
		this.stop();
   		return;
	}
});

Meteor.publish('listaDeUsuariosCancelados', function () {
	if ( Roles.userIsInRole(this.userId, ['fundador']) ) {
		return ClientesDistribuidores.find({cancelado: true});
	} else {
		this.stop();
   		return;
	}
});


Meteor.publish('listaDeUsuariosReferidos', function () {


	if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {
		return ClientesDistribuidores.find({distribuidorId: this.userId, cancelado: false});
	} else {
		this.stop();
   		return;
	}
});



Meteor.publish('listaDeUsuariosReferidosCancelados', function () {


	if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {
		return ClientesDistribuidores.find({distribuidorId: this.userId, cancelado: true});
	} else {
		this.stop();
   		return;
	}
});


Meteor.publish('listaDistribuidores', function () {


	if ( Roles.userIsInRole(this.userId, ['fundador']) ) {
		return Distribuidores.find({cancelado: false, fundadorId: this.userId});
	} else {
		this.stop();
   		return;
	}
});

Meteor.publish('listaDeClientesPorDistribuidor', function (distribuidorId) {

	check(distribuidorId, String);

	if ( Roles.userIsInRole(this.userId, ['fundador']) ) {
		return ClientesDistribuidores.find({distribuidorId: distribuidorId, cancelado: false});
	} else {
		this.stop();
   		return;
	}
});

Meteor.publish('listaDeClientesPorDistribuidorCancelados', function (distribuidorId) {

	check(distribuidorId, String);

	if ( Roles.userIsInRole(this.userId, ['fundador']) ) {
		return ClientesDistribuidores.find({distribuidorId: distribuidorId, cancelado: true});
	} else {
		this.stop();
   		return;
	}
});