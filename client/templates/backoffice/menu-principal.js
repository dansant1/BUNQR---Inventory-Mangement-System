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
	'click .i-8': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/configuracion/negocio' );
	},
	'click .logout': function () {
		Meteor.logout();
		Bert.alert( 'Nos vemos luego :=)', 'success' );
	},

});

Template.ConfiguracionNegocio.onCreated(function () {
	var self = this;
  	self.autorun(function() {

    	self.subscribe('MiEmpresa');
  	});
});

Template.ConfiguracionNegocio.helpers({
	nombre() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).nombre;
	},
	ruc() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).ruc;
	},
	direccion() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).direccion;
	},
	provincia() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).provincia;
	},
	departamento() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).departamento;
	},
	codigo() {
		return Negocios.findOne({_id: FlowRouter.getParam('negocioid')}).codigo;
	}
});

Template.ConfiguracionNegocio.events({
	'submit form': function (event, template) {

		event.preventDefault();

		let datos = {
			nombre: template.find("[name='empresa']").value,
			ruc: template.find("[name='ruc']").value,
			direccion: template.find("[name='direccion']").value,
			provincia: template.find("[name='provincia']").value,
			departamento: template.find("[name='departamento']").value,
			codigo: template.find("[name='codigo']").value
		}

		if (datos.nombre !== "") {
			Meteor.call('actualizarNegocio', datos, FlowRouter.getParam('negocioid'), function (err) {
				if (err) {
					Bert.alert('Hubo un error vuelva a intentarlo', 'warning');
				} else {
					Bert.alert('Actualizaste la información', 'success');
				}
			});
		} else {
			Berta.lert('Ingrese los datos correctamente', 'warning');
		}


	},
	'click .agregar-usuario'(event, template) {
		let user = {
    		email: template.find( '[name="email-user"]' ).value,
    		password: template.find( '[name="password-user"]' ).value,
   			profile: {
   				nombre: template.find( '[name="nombre"]' ).value,
   				apellido: template.find( '[name="apellido"]' ).value,
          negocioId: FlowRouter.getParam('negocioid')
   			},
				tipo: parseInt($( "#tipo" ).val())
  		};

        if (user.email !== "" && user.password !== "" && user.profile.nombre !== "" && user.profile.apellido !== "" && user.profile.negocioId !== "") {
            Meteor.call('agregarUsuario', user, function (err, result) {
                if ( err ) {
                    Bert.alert( err.reason, 'warning' );
                } else {
									Bert.alert('Usuario Agregadoo', 'success')
									template.find( '[name="email-user"]' ).value = "";
									template.find( '[name="password-user"]' ).value = "";
									template.find( '[name="nombre"]' ).value = "";
									template.find( '[name="apellido"]' ).value = "";
								}
            });
        }
	}
});
