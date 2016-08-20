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
	},
	actualizarNegocio: function (datos, negocioId) {
		check(datos, Object);
		check(negocioId, String);

		if (this.userId) {
			Negocios.update({_id: negocioId}, {
				$set: {
					nombre: datos.nombre,
					ruc: datos.ruc,
					direccion: datos.direccion,
					provincia: datos.provincia,
					departamento: datos.departamento,
					codigo: datos.codigo
				}
			});
		} else {
			return;
		}
	}

});