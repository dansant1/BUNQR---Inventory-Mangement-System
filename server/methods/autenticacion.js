Meteor.methods({
	agregarUsuario: function (opciones) {
		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String,
				negocioId: String
			},
			tipo: Number
		});

		opciones.profile.empresa = Negocios.findOne({_id: opciones.profile.negocioId}).nombre;

		let userId = Accounts.createUser(opciones);

		if (userId) {
			console.log(opciones.tipo)

			if (opciones.tipo == 1 ) {
				Roles.addUsersToRoles(userId, ['administrador']);

			} else if (opciones.tipo == 2) {
				Roles.addUsersToRoles(userId, ['ventas']);

			} else if (opciones.tipo == 3) {
				Roles.addUsersToRoles(userId, ['almacen']);

			} else if (opciones.tipo == 4) {
				Roles.addUsersToRoles(userId, ['contabilidad']);

			}
		}

	},
	crearUsuario: function (opciones) {

		check(opciones, {
			email: String,
			password: String,
			profile: {
				nombre: String,
				apellido: String,
				empresa: String
			},
			tipo: Number
		});

		let negocioId = Negocios.insert({
				nombre: opciones.profile.empresa,
				createdAt: new Date()
		});

		opciones.profile.negocioId = negocioId;

		let userId = Accounts.createUser(opciones);


		if (userId) {

			console.log(opcion.tipo)

			if (opciones.tipo == 1 ) {
				Roles.addUsersToRoles(userId, ['administrador']);

			} else if (opciones.tipo == 2) {
				Roles.addUsersToRoles(userId, ['ventas']);

			} else if (opciones.tipo == 3) {
				Roles.addUsersToRoles(userId, ['almacen']);

			} else if (opciones.tipo == 4) {
				Roles.addUsersToRoles(userId, ['contabilidad']);

			}

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
				empresa: String,
				distribuidorId: String
			}
		});

		let negocioId = Negocios.insert({
				nombre: opciones.profile.empresa,
				createdAt: new Date()
		});

		opciones.profile.negocioId = negocioId;

		let userId = Accounts.createUser(opciones);

		// Acutalizacion

		if (userId) {
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

			Roles.addUsersToRoles(userId, ['administrador']);

			Meteor.defer(function () {

				SSR.compileTemplate( 'htmlEmail', Assets.getText( 'bienvenido.html' ) );

				var emailData = {
  					nombre: opciones.profile.nombre + " " + opciones.profile.apellido
				};

				Email.send({
  				to: opciones.email,
  				from: "BUNQR <daniel@grupoddv.com>",
  				subject: "Bienvenido a BUNQR",
  				html: SSR.render( 'htmlEmail', emailData )
				});
			});
		}



	}
});
