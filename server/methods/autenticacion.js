Meteor.methods({
	crearUsuario: function (opciones) {

		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String,
				empresa: String
			}
		});

		let negocioId = Negocios.insert({
				nombre: opciones.profile.empresa,
				createdAt: new Date()
		});	

		opciones.profile.negocioId = negocioId;

		let userId = Accounts.createUser(opciones);


		if (userId) {

			ClientesDistribuidores.insert({
				nombre: opciones.profile.nombre,
				apellido: opciones.profile.apellido,
				distribuidorId: this.userId,
				email: opciones.email,
				createdAt: new Date(),
				usuarioId: userId,
				cancelado: false
			});
			
			// Acutalizacion
			Accounts.sendVerificationEmail( userId );
		
			Roles.addUsersToRoles(userId, ['administrador']);
		}

		
	},
	crearAdmin: function (opciones) {
		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String
			}
		});

		let userId = Accounts.createUser(opciones);
		
		Roles.addUsersToRoles(userId, ['fundador']);
	},
	crearDistribuidor: function (opciones) {
		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String
			}
		});

		let userId = Accounts.createUser(opciones);
		
		Distribuidores.insert({
			nombre: opciones.profile.nombre,
			apellido: opciones.profile.apellido,
			email: opciones.email,
			cancelado: false,
			createdAt: new Date(),
			fundadorId: this.userId,
			usuarioId: userId
		});

		
		
		Roles.addUsersToRoles(userId, ['distribuidor']);
	},
	crearUsuarioReferido: function (opciones) {

		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String,
				distribuidorId: String
			}
		});

		opciones.profile.empresa = "Mi empresa";

		let userId = Accounts.createUser(opciones);

		// Acutalizacion
		Accounts.sendVerificationEmail( userId );

		ClientesDistribuidores.insert({
			nombre: opciones.profile.nombre,
			apellido: opciones.profile.apellido,
			distribuidorId: opciones.profile.distribuidorId,
			email: opciones.email,
			createdAt: new Date(),
			usuarioId: userId,
			cancelado: false
		});

		let negocioId = Negocios.insert({
				userId: userId,
				nombre: opciones.profile.empresa,
				createdAt: new Date()
			});		
		
		Roles.addUsersToRoles(userId, ['administrador']);
	}
});