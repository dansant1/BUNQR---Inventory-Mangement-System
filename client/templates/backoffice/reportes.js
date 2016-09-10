Template.reportes.onCreated(function () {
	let negocioId = FlowRouter.getParam('negocioid');
	var self = this;
	self.autorun(function () {
		Suscripcion.subscribe('todosLosReportes', negocioId);
	});
});

Template.reporteDiario.onCreated(function () {
	
	var self = this;
	self.autorun(function () {
		let reporteId = FlowRouter.getParam('reporteid');
		let negocioId = FlowRouter.getParam('negocioid');
		self.subscribe('reportes', reporteId);
		self.subscribe('ProductosReporte', negocioId);
	});
});

Template.reporteDiario.onRendered(function () {

	function reporteP () {

		var obtenerProductos = function  () {
			var productos = [];

			Productos.find().forEach( p => {
				productos.push(p.nombre);
			});

			return productos;
		}

		var obtenerStock = function () {
			var stock = [];

			Productos.find().forEach( p => {
				stock.push(p.stock);
			});

			return stock;
		}

		var obtenerColoresXProducto = function () {
			
			var colores = []

			

			Productos.find().forEach( p => {
				
				var dynamicColors = function() {
            		var r = Math.floor(Math.random() * 255);
            		var g = Math.floor(Math.random() * 255);
            		var b = Math.floor(Math.random() * 255);
            		var a = Math.floor(Math.random() * 255);
            		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        		}

				colores.push( dynamicColors() );
			});

			return colores;
		}

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			display:true,

			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

  		var data = {
    		labels: obtenerProductos(),
    		datasets: 
    		[
    			{
        			fillColor : obtenerColoresXProducto(),
        			
        			data : obtenerStock()
    			}
    		]
		};

  		//Chart.defaults.global.responsive = true;

  		var ctx = $("#reporteP").get(0).getContext("2d");

  		var reporteChart = new Chart(ctx).Bar(data, options);
	}
	
	function reporteVC () {

		var obtenerVentas = function  () {

		var ventas = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var ventaTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorVenta === undefined) {
					ventaTotalMes += 0;
				} else {
					ventaTotalMes += index.valorVenta;
				}
				
			});
			
			ventas.push(ventaTotalMes);
		}

		return ventas;
	}

	var obtenerCostos = function () {

		var costos = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var costoTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorCosto === undefined) {
					costoTotalMes += 0;
				} else {
					costoTotalMes += index.valorCosto;
				}
				
			});
			
			costos.push(costoTotalMes);
		}

		return costos;
	}

  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(52, 152, 219,1.0)",
        			strokeColor : "rgba(52, 152, 219,1.0)",
        			pointColor : "rgba(220,220,220,1)",
        			pointStrokeColor : "#fff",
        			data : obtenerCostos()
    			},
    			{
       		 		fillColor : "rgba(142, 68, 173,1.0)",
        			strokeColor : "rgba(142, 68, 173,1.0)",
        			pointColor : "rgba(151,187,205,1)",
        			pointStrokeColor : "#fff",
        			data: obtenerVentas()
    			} 
    		]
		};

  		Chart.defaults.global.responsive = true;

  		var ctx = $("#reporte").get(0).getContext("2d");

  		var reporteChart = new Chart(ctx).Line(data);
	}

	// Reporte Ventas vs Merma

	function reporteVM () {

		var obtenerVentas = function  () {

		var ventas = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var ventaTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorVenta === undefined) {
					ventaTotalMes += 0;
				} else {
					ventaTotalMes += index.valorVenta;
				}
				
			});
			
			ventas.push(ventaTotalMes);
		}

		return ventas;
	}

	var obtenerMerma = function () {

		var mermas = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var mermaTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorMerma === undefined) {
					mermaTotalMes += 0;
				} else {
					mermaTotalMes += index.valorMerma;
				}
				
			});
			
			mermas.push(mermaTotalMes);
		}

		return mermas;
	}

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			display:true,

			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(39, 174, 96,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data : obtenerMerma()
    			},
    			{
       		 		fillColor : "rgba(142, 68, 173,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data: obtenerVentas()
    			} 
    		]
		};

  		//Chart.defaults.global.responsive = true;

  		var ctx = $("#reporteVM").get(0).getContext("2d");

  		var reporteChart = new Chart(ctx).Bar(data, options);
	}

	// Reporte Merma

	function reporteM () {

		

	var obtenerMerma = function () {

		var mermas = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var mermaTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorMerma === undefined) {
					mermaTotalMes += 0;
				} else {
					mermaTotalMes += index.valorMerma;
				}
				
			});
			
			mermas.push(mermaTotalMes);
		}

		return mermas;
	}

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			display:true,

			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(39, 174, 96,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data : obtenerMerma()
    			}
    		]
		};

  		//Chart.defaults.global.responsive = true;

  		var ctx = $("#reporteM").get(0).getContext("2d");

  		var reporteMerma = new Chart(ctx).Line(data);
	}

	// Reporte Utilidades vs Costos
	function reporteUC () {

		var obtenerUtilidades = function  () {

		var utilidades = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var utilidadTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorutilidadVenta === undefined) {
					utilidadTotalMes += 0;
				} else {
					utilidadTotalMes += index.valorutilidadVenta;
				}
				
			});
			
			utilidades.push(utilidadTotalMes);
		}

		return utilidades;
	}

	var obtenerCostos = function () {

		var costos = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var costoTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorCosto === undefined) {
					costoTotalMes += 0;
				} else {
					costoTotalMes += index.valorCosto;
				}
				
			});
			
			costos.push(costoTotalMes);
		}

		return costos;
	}

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			display:true,

			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(211, 84, 0,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data : obtenerUtilidades()
    			},
    			{
       		 		fillColor : "rgba(41, 128, 185,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data: obtenerCostos()
    			} 
    		]
		};

  		//Chart.defaults.global.responsive = true;

  		var ctx = $("#reporteUC").get(0).getContext("2d");

  		var reporteChart = new Chart(ctx).Bar(data, options);
	}

	// Reporte utilidades vs compras ( gastos )

	function reporteUG () {

		var obtenerUtilidades = function  () {

		var utilidades = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var utilidadTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorutilidadVenta === undefined) {
					utilidadTotalMes += 0;
				} else {
					utilidadTotalMes += index.valorutilidadVenta;
				}
				
			});
			
			utilidades.push(utilidadTotalMes);
		}

		return utilidades;
	}

	var obtenerCompras = function () {

		var compras = [];

		// Obtenemos el total de cada mes
		for (var mes = 0; mes <= 11; mes++) {

			
			var date = new Date();
			var firstDay = new Date(date.getFullYear(), mes, 1);
			var lastDay = new Date(date.getFullYear(), mes + 1, 0);

			var comprasTotalMes = 0;

			Reportes.find({ fecha: { $gte: firstDay, $lt: lastDay } }).forEach( function (index) {

				if (index.valorCompras === undefined) {
					comprasTotalMes += 0;
				} else {
					comprasTotalMes += index.valorCompras;
				}
				
			});
			
			compras.push(comprasTotalMes);
		}

		return compras;
	}

		var options = {

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 4,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 20,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

			display:true,

			//String - A legend template
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

  		var data = {
    		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    		datasets: 
    		[
    			{
        			fillColor : "rgba(211, 84, 0,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data : obtenerUtilidades()
    			},
    			{
       		 		fillColor : "rgba(241, 196, 15,1.0)",
        			pointHighlightStroke: "rgba(39, 174, 96,1.0)",
        			data: obtenerCompras()
    			} 
    		]
		};

  		//Chart.defaults.global.responsive = true;

  		var ctx = $("#reporteUG").get(0).getContext("2d");

  		var reporteChart = new Chart(ctx).Bar(data, options);
	}

	setTimeout(function () {

		Tracker.autorun(reporteVC);
		Tracker.autorun(reporteVM);
		Tracker.autorun(reporteUC);
		Tracker.autorun(reporteP);
		Tracker.autorun(reporteM);
		Tracker.autorun(reporteUG);
	}, 1000)

	
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
		if (this.valorutilidadVenta === undefined) {
			return 0;
		} else {
			//return this.valorutilidadTotal.toLocaleString();
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