Meteor.methods({
	cambiarTipoUsuario: function (datos) {
		check(datos, {
			userId: String,
			id: String
		});


		ClientesDistribuidores.update({_id: datos.id}, {
			$set: {
				cancelado: true,
			}
		});

		if ( Roles.userIsInRole(this.userId, ['fundador']) ) {	
				Roles.removeUsersFromRoles( datos.userId, 'administrador');
				Roles.addUsersToRoles( datos.userId, 'cancelado' );
		}
		
	},
	cambiarTipoUsuarioCancelado: function (datos) {
		check(datos, {
			userId: String,
			id: String
		});

		ClientesDistribuidores.update({_id: datos.id}, {
			$set: {
				cancelado: false,
			}
		});

		if ( Roles.userIsInRole(this.userId, ['fundador']) ) {	
				Roles.removeUsersFromRoles( datos.userId, 'cancelado');
				Roles.addUsersToRoles( datos.userId, 'administrador' );
		}
		
	},
	cambiarTipoUsuarioDistribuidor: function (datos) {
		check(datos, {
			usuarioId: String,
			id: String
		});

		ClientesDistribuidores.update({_id: datos.id}, {
			$set: {
				cancelado: true,
			}
		});

		if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {	
				Roles.removeUsersFromRoles( datos.usuarioId, 'administrador');
				Roles.addUsersToRoles( datos.usuarioId, 'cancelado' );
		}
		
	},
	cambiarTipoUsuarioDistribuidorCancelado: function (datos) {
		check(datos, {
			usuarioId: String,
			id: String
		});

		ClientesDistribuidores.update({_id: datos.id}, {
			$set: {
				cancelado: false,
			}
		});

		if ( Roles.userIsInRole(this.userId, ['distribuidor']) ) {	
				Roles.removeUsersFromRoles( datos.usuarioId, 'cancelado');
				Roles.addUsersToRoles( datos.usuarioId, 'administrador' );
		}
		
	}
});