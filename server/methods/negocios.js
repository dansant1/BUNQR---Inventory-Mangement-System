Meteor.methods({
	registrarEmpresa: function (datos) {
		check(datos, {
			empresa: String,
			descripcion: String
		});

		var userId = this.userId;

		if (userId) {
			var negocioId = Negocios.insert({
				userId: userId,
				nombre: datos.empresa,
				descripcion: datos.descripcion,
				createdAt: new Date()
			});
		}

		return {
			negocioId: negocioId
		};
		
	},
	registrarProforma: function (datos) {
		check(datos, {
			negocioId: String
		});
		var userId = this.userId;

		if (userId) {
			var negocioId = datos.negocioId;
			var createdAt = new Date();
			var proformaId = Proformas.insert({createdAt: createdAt, negocioId: negocioId});

			return {
				proformaid: proformaId
			};
		}
	}
});