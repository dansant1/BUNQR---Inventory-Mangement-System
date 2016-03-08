Meteor.methods({
	obtenerTotal: function (negocioId) {
		
		check(negocioId, String);

		let grupo = {
			_id: '$codigo',
			total: {
				$sum: '$valor'
			}
		}; // Fin de grupo

		return Productos.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);

	},
	obtenerUtilidad: function (negocioId) {
		
		check(negocioId, String);

		let grupo = {
			_id: '$codigo',
			total: {
				$sum: '$valorUtilidad'
			}
		}; // Fin de grupo

		return Productos.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);

	},
	obtenerCosto: function (negocioId) {
		
		check(negocioId, String);

		let grupo = {
			_id: '$codigo',
			total: {
				$sum: '$valorCosto'
			}
		}; // Fin de grupo

		return Productos.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);

	},
	obtenerComprasTotal: function (negocioId) {
		check(negocioId, String);

		let grupo = {
			_id: '$_id',
			total: {
				$sum: '$valorCompras'
			}
		}; // Fin de grupo

		return Reportes.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);
	},
	obtenerVentaUtilidad: function (negocioId) {
		check(negocioId, String);

		let grupo = {
			_id: '$_id',
			total: {
				$sum: '$valorutilidadVenta'
			}
		}; // Fin de grupo

		return Reportes.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);
	},
	obtenerVentaTotal: function (negocioId) {
		check(negocioId, String);

		let grupo = {
			_id: '$_id',
			total: {
				$sum: '$valorVenta'
			}
		}; // Fin de grupo

		return Reportes.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);
	},
	obtenerMermaTotal: function (negocioId) {
		check(negocioId, String);

		let grupo = {
			_id: '$_id',
			total: {
				$sum: '$valorMerma'
			}
		}; // Fin de grupo

		return Reportes.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);

	},
	obtenerCostoTotal: function (negocioId) {
		check(negocioId, String);

		let grupo = {
			_id: '$_id',
			total: {
				$sum: '$valorCosto'
			}
		}; // Fin de grupo

		return Reportes.aggregate(
			{
				$match: {
					negocioId: negocioId
				}
			},
			{
				$group: grupo
			}
		);
	}
});