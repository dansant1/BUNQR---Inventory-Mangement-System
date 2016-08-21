Template.reportes.onCreated(function () {
	let negocioId = FlowRouter.getParam('negocioid');
	var self = this;
	self.autorun(function () {
		Suscripcion.subscribe('todosLosReportes', negocioId);
	});
});

Template.reporteDiario.onCreated(function () {
	let reporteId = FlowRouter.getParam('reporteid');
	var self = this;
	self.autorun(function () {
		self.subscribe('reportes', reporteId);
	});
});

Template.reporteDiario.onRendered(function () {
	
	function drawChart(){
  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(52, 152, 219,1.0)",
        			strokeColor : "rgba(52, 152, 219,1.0)",
        			pointColor : "rgba(220,220,220,1)",
        			pointStrokeColor : "#fff",
        			data : [25, 39, 40, 11, 46, 75, 50, 54, 77, 89, 45, 58]
    			},
    			{
       		 		fillColor : "rgba(142, 68, 173,1.0)",
        			strokeColor : "rgba(142, 68, 173,1.0)",
        			pointColor : "rgba(151,187,205,1)",
        			pointStrokeColor : "#fff",
        			data: [45, 49, 70, 81, 56, 55, 40, 48, 55, 38, 42, 70],
    			}  
    		]
		};

  		Chart.defaults.global.responsive = true;

  		var ctx = $("#reporte").get(0).getContext("2d");

  		var myNewChart = new Chart(ctx);

  		new Chart(ctx).Line(data);
	}

	drawChart();
});

Template.reporteDiario.helpers({
	reportes: function () {
		return Reportes.findOne({}, {sort: {fecha: -1}});
	},
	merma: function () {
		if (this.valorMerma === undefined) {
			return 0;
		} else {
			//return this.valorMerma.toLocaleString();
			return this.valorMerma.toFixed(1);
		}
	},
	venta: function () {
		if (this.valorVenta === undefined) {
			return 0;
		} else {
			//return this.valorVenta.toLocaleString();
			return this.valorVenta.toFixed(1);
		}
	},
	costo: function () {
		if (this.valorCosto === undefined) {
			return 0;
		} else {
			//return this.valorCosto.toLocaleString();
			return this.valorCosto.toFixed(1);
		}
	},
	utilidad: function () {
		if (this.valorutilidadVenta === undefined) {
			return 0;
		} else {
			//return this.valorutilidadVenta.toLocaleString();
			return this.valorutilidadVenta.toFixed(1);
		}
	},
	compra: function () {
		if (this.valorCompras === undefined) {
			return 0;
		} else {
			//return this.valorCompras.toLocaleString();
			return this.valorCompras.toFixed(1);
		}	
	}
});

Template.reportes.onCreated(function () {
	let negocioId = FlowRouter.getParam('negocioid');
	var self = this;
	self.autorun( function () {
		self.subscribe('todosLosReportes', negocioId);
	});
});

Template.reportes.helpers({
	
	todosreportes: function () {
		return Reportes.find({}, {sort: {fecha: -1}});
	},
	merma: function () {
		if (this.valorMerma === undefined) {
			return 0;
		} else {
			//return this.valorMerma.toLocaleString();
			return this.valorMerma.toFixed(1);
		}
	},
	venta: function () {
		if (this.valorVenta === undefined) {
			return 0;
		} else {
			//return this.valorVenta.toLocaleString();
			return this.valorVenta.toFixed(1);
		}
	},
	costo: function () {
		if (this.valorCosto === undefined) {
			return 0;
		} else {
			//return this.valorCosto.toLocaleString();
			return this.valorCosto.toFixed(1);
		}
	},
	utilidad: function () {
		if (this.valorutilidadTotal === undefined) {
			return 0;
		} else {
			//return this.valorutilidadTotal.toLocaleString();
			return this.valorutilidadTotal.toFixed(1);
		}
	},
	compra: function () {
		if (this.valorCompras === undefined) {
			return 0;
		} else {
			//return this.valorCompras.toLocaleString();
			return this.valorCompras.toFixed(1);
		}	
	}
});

Template.reportes.events({
	'click .ingreso-ventas': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/ventas');
	},
	'click .ingreso-carga': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' +  FlowRouter.getParam('negocioid') + '/almacenes');
	},
	'click .ingresar-carga': function () {
		Meteor.call('nuevoIngresoMasivo', function (err, result) {
			if (err) {
				console.log('Hubo un error');
			} else {
				var cargaId = result.cargaId;
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + cargaId + '/ingresos/masivo/nuevo');
				Bert.alert( 'Agregaste una carga nueva', 'success' );	
			}
		});
	},
	'click .ingresar-merma': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('crearMerma',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var mermaId = result.mermaId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/merma/' +  mermaId + '/nuevo');
			}
		});
	},
	'click .ingresar-inventario': function () {
		let negocioId = FlowRouter.getParam('negocioid');
		Meteor.call('nuevoInventarioFinal',  negocioId, function (error, result) {
			if (error) {
				console.log('Hubo un error');
			} else {
				var inventarioFinalId = result.inventarioFinalId
				FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/final/' +  inventarioFinalId + '/nuevo');
			}
		});
	}
});