Meteor.methods({
	crearReporte: function (negocioId) {
		check(negocioId, String);

		if (this.userId) {

			// 1. Verificamos que no hay base de datos para Reportes con el negocioId
		if ( Reportes.find({negocioId: negocioId}).count() === 0 ) {
			let nuevoReporteId, fechaAux;

			let  fecha 	= new Date();
			let dia 	= fecha.getDate();
			let mes 	= fecha.getMonth();
			let anio 	= fecha.getFullYear();

			fechaAux	= dia + '-' + mes + '-' + anio;

			nuevoReporteId = Reportes.insert({
				negocioId: negocioId,
				fecha: new Date(),
				fechaAux: fechaAux,
				userId: this.userId
			});

			return {
				_id: nuevoReporteId
			}

		} else { // 2. Si ya tenemos Reportes entonces quiero obtener el reporte de hoy o crear uno nuevo
			
			let crear, _id, reportes, reporteId;
			let fechaAux;

			let fecha 	= new Date();
			let dia 	= fecha.getDate();
			let mes 	= fecha.getMonth();
			let anio 	= fecha.getFullYear();

			fechaAux	= dia + '-' + mes + '-' + anio;

			reportes = Reportes.find({negocioId: negocioId});

			reportes.forEach(function (item) {

				if ( item.fechaAux === fechaAux ) {
					crear = false;
					_id = item._id;
				} // Fin del if

			}); // Fin del forEach

			// 3. Determinamos si se va a crear un nuevo Reporte p seguir con el mismo segun el dia
			if (crear === false) {
				return {
					_id: _id
				};
			} else {
				reporteId = Reportes.insert({
					negocioId: negocioId,
					fecha: new Date(),
					fechaAux: fechaAux,
					userId: this.userId
				});

				return {
					_id: reporteId
				};
			}

		} // Fin del else

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}

	},
	registrarMarca: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String
		});

		const userId = this.userId;
		datos.userId = this.userId;
		if (userId) {
			datos.createdAt = new Date();
			var marcaId = Marcas.insert(datos);

			return marcaId
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarCategoria: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String
		});

		const userId = this.userId;
		datos.userId = this.userId;		
		if (userId) {
			datos.createdAt = new Date();
			var categoriaId = Categorias.insert(datos);
			return categoriaId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarLinea: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String
		});

		const userId = this.userId;
		
		if (userId) {
			datos.createdAt = new Date();
			var lineaId = Lineas.insert(datos);

			return lineaId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarPresentacion: function (datos) {
		check(datos, {
			nombre: String,
			negocioId: String,
		});

		

		const userId = this.userId;
		datos.userId = this.userId;
		if (userId) {
			datos.createdAt = new Date();
			var presentacionId = Presentacion.insert(datos);
			return presentacionId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarProducto: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String,
			codigo: String,
			pcosto: String,
			pventa: String,
			pxmayor: String,
			stockmin: String,
			stockmax: String,
			marca: String,
			marcaid: String,
			linea: String,
			lineaid: String,
			categoria: String,
			categoriaid: String,
		});

		if (datos.stockmin == "") {
			datos.stockmin = 0;
		} 

		if (datos.stockmax == "") {
			datos.stockmax = 0;
		}

		const userId = this.userId;
		
		if (userId) {
			datos.createdAt = new Date;
			datos.pcosto = parseFloat(datos.pcosto);
			datos.pcosto.toFixed(2);
			datos.pventa = parseFloat(datos.pventa);
			datos.pventa.toFixed(2);
			datos.pxmayor = parseFloat(datos.pxmayor);
			datos.pxmayor.toFixed(2);

			if (datos.stockmax !== 0) {
				datos.stockmax = parseFloat(datos.stockmax);
				datos.stockmax.toFixed(2);	
			}
			if (datos.stockmin !== 0) {
				datos.stockmin = parseFloat(datos.stockmin);
				datos.stockmin.toFixed(2);	
			}
			datos.userId = this.userId;

			var productoId = Productos.insert(datos);
			return productoId;

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarProductoCargaMasiva: function (datos, cantidad, cargaId) {
		check(datos, {
			nombre: String,
			medida: String,
			negocioId: String,
			codigo: String,
			pcosto: String,
			pventa: String,
			almacen: String,
			reporteId: String
		});
		check(cantidad, String);
		check(cargaId, String)

		const userId = this.userId;

		if (userId) {

			if (datos.almacen == "1") {

				datos.almacen = true;
			} else {
				datos.almacen = false;
			}

			datos.pcosto = parseFloat(datos.pcosto);
			datos.pcosto.toFixed(2);
			datos.pventa = parseFloat(datos.pventa);
			datos.pventa.toFixed(2);
			cantidad = parseInt(cantidad);
			var importe = datos.pcosto * cantidad;
			datos.createdAt = new Date;
			importe.toFixed(2);

			datos.utilidad = datos.pventa - datos.pcosto;
			datos.utilidad.toFixed(2);

			datos.valorCosto = datos.pcosto * cantidad;
			datos.valorCosto.toFixed(2);

			datos.valorUtilidad = datos.utilidad * cantidad;
			datos.valorUtilidad.toFixed(2);

			datos.valor = datos.pventa * cantidad;
			datos.valor.toFixed(2);

			let utilidad =  (datos.utilidad * cantidad);

			var cargaItemId = CargaItem.insert({
				nombre: datos.nombre,
				medida: datos.medida,
				codigo: datos.codigo,
				pcosto: datos.pcosto,
				valor: datos.valor,
				valorUtilidad: datos.valorUtilidad,
				cargaId: cargaId,
				cantidad: cantidad,
				importe: importe,
				almacen: datos.almacen
			});

			
			var productoId = Productos.insert({
				nombre:  datos.nombre,
				codigo: datos.codigo,
				pcosto: datos.pcosto,
				pventa: datos.pventa,
				negocioId: datos.negocioId,
				createdAt: datos.createdAt,
				stock: cantidad,
				almacen: datos.almacen,
				utilidad: datos.utilidad,
				valor: datos.valor,
				valorCosto: datos.valorCosto,
				valorUtilidad: datos.valorUtilidad,
				userId: userId
			});

			CargaItem.update({_id: cargaItemId}, {$set: {
				productoId: productoId
			}});

			Cargas.update({_id: cargaId}, {
				$inc: {
					total: importe,
					valor: datos.valor,
					utilidad:  utilidad
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorCosto: importe
				}
			});

			return {
				productoId: productoId,
				cargaItemId: cargaItemId
			};

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	nuevoIngresoMasivo: function () {
		if (this.userId) {
			var cargaId = Cargas.insert({createdAt: new Date(), guardado: false});
			return {
				cargaId: cargaId
			};
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	AgregarCargaMasiva: function (datos) {

		check(datos, {
			almacen: String,
			almacenId: String,
			proveedor: String,
			proveedorId: String,
			formaPago: String,
			formaPagoId: String,
			moneda: String,
			fecha: String,
			negocioId: String,
			cargaId: String
		});


		if (this.userId) {
			
			datos.fecha = new Date(datos.fecha);
			
			var cargaId = Cargas.update({_id: datos.cargaId}, {
				$set: {
					almacen: datos.almacen,
					almacenId: datos.almacenId,
					proveedor: datos.proveedor,
					proveedorId: datos.proveedorId,
					formaPago: datos.formaPago,
					formaPagoId: datos.formaPagoId,
					moneda: datos.moneda,
					fecha: datos.fecha,
					negocioId: datos.negocioId,
					guardado: true
				}
			});
			return {
				cargaId: cargaId
			}
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	eliminarCargaItem: function (datos) {
		check(datos, {
			importe: Number,
			cargaId: String,
			cargaItemId: String,
			valor: Number,
			utilidad: Number,
			productoId: String,
			cantidad: Number,
			reporteId: String
		});

		if (this.userId) {

			let importe 	= datos.importe  * 	-1;
			let valor 		= datos.valor 	 * 	-1;
			let utilidad 	= datos.utilidad * 	-1

			Cargas.update({_id: datos.cargaId}, {
				$inc: {
					total: importe,
					valor: valor,
					utilidad: utilidad
				}
			});

			let menosCantidad = datos.cantidad * -1;
			let menosValor = datos.valor * -1
			let menosUtilidad = datos.utilidad * -1

			Productos.update({_id: datos.productoId}, {
				$inc: {
					stock: menosCantidad,
					valor: menosValor,
					valorUtilidad: menosUtilidad,
					valorCosto: importe
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorCosto: importe
				}
			});

			CargaItem.remove({_id: datos.cargaItemId});
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	modificarCantidadCargaItem: function (datos) {
		check(datos, {
			cantidad: String,
			cargaItemId: String
		});

		datos.cantidad = parseFloat(datos.cantidad);

		var costo = CargaItem.findOne({_id: datos.cargaItemId}).pcosto;
		var importe = costo * datos.cantidad;

		const userId = this.userId;

		if (userId) {
			
			CargaItem.update({_id: datos.cargaItemId}, 
					{$set: {
						importe: importe, 
						cantidad: datos.cantidad} 
					});

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');		
		}
	},
	agregarProductoACargaItem: function (datos) {
		check(datos, {
			medida: String,
			cantidad: String,
			cargaId: String,
			productoId: String,
			utilidad: Number,
			pventa: Number,
			reporteId: String,
			pcosto: Number,
			nombre: String,
			codigo: String
		});

		const userId = this.userId;

		if (userId) {

			datos.cantidad = parseInt(datos.cantidad);
			//datos.cantidad.toFixed(2);

			//var producto = Productos.findOne({_id: datos.productoId});
			
			// En este punto hacer el update para establecer el producto.stock con $lt mas 
			// la cantidad de datos.cantidad y establer el stock

			//producto.pcosto.toFixed(2);

			// El importe es el valorCosto		
			datos.importe = datos.pcosto * datos.cantidad;
			datos.importe.toFixed(2);

			// Incrementamos el stock del producto
			

			datos.valorUtilidad = datos.utilidad * datos.cantidad;
			datos.valorUtilidad.toFixed(2);

			datos.valor = datos.pventa * datos.cantidad;
			datos.valor.toFixed(2);

			let utilidad = datos.utilidad * datos.cantidad;

			let cargaItemId = CargaItem.insert({
				nombre: datos.nombre,
				codigo: datos.codigo,
				pcosto: datos.pcosto,
				cargaId: datos.cargaId,
				productoId: datos.productoId,
				cantidad: datos.cantidad,
				valor: datos.valor,
				valorUtilidad: datos.valorUtilidad,
				importe: datos.importe,
				medida: datos.medida,
				userId: this.userId
			});

			console.log(datos.cantidad);

			let cantidad = datos.cantidad;

			console.log(datos.productoId);

			

			let CargaId = Cargas.update({_id: datos.cargaId}, {
				$inc: {
					total: datos.importe,
					valor: datos.valor,
					utilidad: utilidad
				}
			});

			Productos.update({_id: datos.productoId}, {
				$inc: {
					stock: cantidad,
					valor: datos.valor,
					valorCosto: datos.importe,
					valorUtilidad: datos.valorUtilidad
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorCosto: datos.importe
				}
			});

			return {
				cargaItemId: cargaItemId
			};

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');		
		}
	},
	CancelarCarga: function (cargaId, reporteId) {
		check(cargaId, String);
		check(reporteId, String);

		if (this.userId) {


			// Modificamos el stock porque si cancela la carga entonces
			// el stock tiene que quedarse intacto
			let cargaItem = CargaItem.find({cargaId: cargaId});
			cargaItem.forEach(function (item) {
				//console.log('El ID es: ' + item.productoId);

				item.cantidad 	= item.cantidad   * -1;
				item.valor 		= item.valor      * -1;
				item.importe = item.importe * -1;
				item.valorUtilidad = item.valorUtilidad * -1;
 
				Productos.update({_id: item.productoId}, {
					$inc: {
						stock: item.cantidad,
						valor: item.valor ,
						valorCosto: item.importe ,
						valorUtilidad: item.valorUtilidad
					}
				});

				Reportes.update({_id: reporteId}, {
					$inc: {
						valorCosto: item.importe
					}
				});

			});


			Cargas.remove({_id: cargaId});
			CargaItem.remove({cargaId: cargaId});
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}

	},
	registrarServicio: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String,
			costo: String
		});

		const userId = this.userId;
		
		if (userId) {
			datos.costo = parseInt(datos.costo);
			var servicioId = Servicios.insert(datos);
			return servicioId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarProveedor: function (datos) {
		check(datos, {
			nombre: String,
			descripcion: String,
			negocioId: String
		});

		const userId = this.userId;
		
		if (userId) {
			var proveedorId = Proveedores.insert(datos);
			return proveedorId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarCliente: function (datos) {
		check(datos, {
			nombre: String,
			contacto: String,
			numero: String,
			direccion: String,
			telefono: String,
			email: String,
			negocioId: String
		});

		const userId = this.userId;

		
		if (userId) {
			datos.numero = parseInt(datos.numero);
			datos.telefono = parseInt(datos.telefono);

			var clienteId = Clientes.insert(datos);
			return clienteId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarFormaDePago: function (datos) {
		check(datos, {
			periodo: String,
			descripcion: String,
			tipo: String,
			negocioId: String
		});

		const userId = this.userId;
		
		if (userId) {
			datos.periodo = parseInt(datos.periodo);
			var formasDePagoId = FormasdePago.insert(datos);
			return formasDePagoId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarCuentaBancaria: function (datos) {
		check(datos, {
			numero: String,
			banco: String,
			moneda: String,
			negocioId: String,
			saldo: String
		});

		const userId = this.userId;
		
		if (userId) {
			datos.saldo = parseInt(datos.saldo);
			var cuentaBancariaId = CuentasBancarias.insert(datos);
			return cuentaBancariaId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarAlmacen: function (datos) {
		check(datos, {
			nombre: String,
			direccion: String,
			negocioId: String
		});

		const userId = this.userId;
		
		if (userId) {
			datos.userId = this.userId;
			var almacenId = Almacen.insert(datos);

			return almacenId;
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	registrarIngreso: function (datos) {
		check(datos, {
			proveedor: String,
			proveedorId: String,
			tipo: String,
			almacen: String,
			almacenId: String,
			fecha: String,
			concepto: String,
			numero: String,
			negocioId: String,
			hora: String,
			minuto: String,
			producto: String,
			productoId: String,
			unidad: String,
			cantidad: String
		});

		const userId = this.userId;
		datos.userId = userId
		if (userId) {
			let costoProducto = Productos.findOne({_id: datos.productoId}).pcosto;
			console.log(costoProducto);
			let cantidad = datos.cantidad = parseInt(datos.cantidad);
			console.log(cantidad)
			datos.importe = costoProducto * cantidad; 
			console.log(datos.importe);
			datos.fecha = new Date(datos.fecha + 'T' + datos.hora + ':' + datos.minuto + '00');
			
			let ingresoId = Ingresos.insert(datos);
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}


	},
	registrarCompra: function (datos) {
		check(datos, {
			fecha: String,
			cuentaBancaria: String,
			cuentaBancariaId: String,
			negocioId: String,
			compraId: String
		});

		const userId = this.userId;

		if (userId) {

			datos.fecha = new Date(datos.fecha);

			let compraId = Compras.update({_id: datos.compraId}, {
				$set: {
					cuentaBancaria: datos.cuentaBancaria,
					cuentaBancariaId: datos.cuentaBancariaId,
					negocioId: datos.negocioId,
					fecha: datos.fecha,
					guardado: true
				}
			});

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	nuevaCompraItem: function () {
		if (this.userId) {
			var compraId = Compras.insert({createdAt: new Date(), guardado: false, userId: this.userId});
			return {
				compraId: compraId
			};
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	agregarCompraItem: function (datos) {
		check(datos, {
			descripcion: String,
			importe: String,
			compraId: String,
			reporteId: String
		});


		if (this.userId) {

			datos.createdAt = new Date();

			datos.importe = parseFloat(datos.importe);
			datos.importe.toFixed(2);
			var compraItemId = ComprasItem.insert(datos);

			Compras.update({_id: datos.compraId}, {
				$inc: {
					total: datos.importe
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorCompras: datos.importe
				}
			});

			return {
				compraItemId: compraItemId
			}
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}

	},
	eliminarCompraItem: function (compraItemId, compraId, importe, reporteId) {
		check(compraItemId, String);
		check(compraId, String);
		check(importe, Number);
		check(reporteId, String);

		if (this.userId) {

			let importeResta = importe * -1

			Compras.update({_id: compraId}, {
				$inc: {
					total: importeResta
				}
			});

			Reportes.update({_id: reporteId}, {
				$inc: {
					valorCompras: importeResta
				}
			});

			ComprasItem.remove({_id: compraItemId});
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}
	},
	cancelarCompra: function (compraId, reporteId) {
		check(compraId, String);
		check(reporteId, String);
		if (this.userId) {

			let compras = ComprasItem.find({compraId: compraId});

			compras.forEach(function (item) {
				item.importe = item.importe * -1;

				Reportes.update({_id: reporteId}, {
					$inc: {
						valorCompras: item.importe
					}
				});

			});

			ComprasItem.remove({compraId: compraId});
			Compras.remove({_id: compraId});


		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	crearMerma: function (negocioId) {
		check(negocioId, String)
		if (this.userId) {
			var mermaId = Mermas.insert({createdAt: new Date(), 
										guardado: false,
										negocioId: negocioId,
										userId: this.userId});
			return {
				mermaId: mermaId
			};
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	registrarMerma: function (datos) {
		check(datos, {
			fecha: String,
			descripcion: String,
			proveedorId: String,
			proveedor: String,
			mermaId: String
		});

		const userId = this.userId;

		if (userId) {

			datos.fecha = new Date(datos.fecha);


			let mermaId = Mermas.update({_id: datos.mermaId}, {
				$set: {
					fecha: datos.fecha,
					descripcion: datos.descripcion,
					proveedor: datos.proveedor,
					proveedorId: datos.proveedorId,
					guardado: true
				}
			});

			return {
				mermaId: mermaId
			}

			console.log('funciona')
		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}
	},
	agregarProductoAMermaItem: function (datos) {
		check(datos, {
			productoId: String,
			cantidad: String,
			medida: String,
			mermaId: String,
			producto: String,
			pcosto: Number,
			codigo: String,
			pventa: Number,
			utilidad: Number,
			reporteId: String
		});


		if (this.userId) {
			
			datos.pcosto 	= parseFloat(datos.pcosto);
			datos.cantidad 	= parseInt(datos.cantidad);
			datos.importe 	= datos.pcosto * datos.cantidad;
			datos.importe.toFixed(2);
			
			let menosValor 	= datos.pventa * datos.cantidad * -1;
			let menosUtilidad = datos.utilidad * datos.cantidad * -1;
			let menosCosto = datos.pcosto * datos.cantidad * -1;

			datos.valor = datos.pventa * datos.cantidad;
			datos.valorCosto = datos.pcosto * datos.cantidad;
			datos.valorUtilidad = datos.utilidad * datos.cantidad;

			let MermasItemId = MermasItem.insert(datos);

			var cantidad = datos.cantidad * -1;

			Productos.update({_id: datos.productoId}, {
				$inc: {
					stock: cantidad,
					valor: menosValor,
					valorCosto: menosCosto,
					valorUtilidad: menosUtilidad
				}
			});

			Mermas.update({_id: datos.mermaId}, {
				$inc: {
					total: datos.importe
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorMerma: datos.importe
				}
			});

			return {
				MermasItemId: MermasItemId
			}

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');	
		}

	},
	eliminarMermaItem: function (MermaItemId, productoId, cantidad, mermaId, importe, valor, valorCosto, valorUtilidad, reporteId) {
		check(MermaItemId, String);
		check(productoId, String);
		check(cantidad, Number);
		check(mermaId, String);
		check(importe, Number);
		check(valor, Number);
		check(valorCosto, Number);
		check(valorUtilidad, Number);
		check(reporteId, String);

		Productos.update({_id: productoId}, {
				$inc: {
					stock: cantidad,
					valor: valor,
					valorCosto: valorCosto,
					valorUtilidad: valorUtilidad
				}
		});		

		var menosImporte = importe * -1;

		Mermas.update({_id: mermaId}, {
			$inc: {
				total: menosImporte
			}
		});

		Reportes.update({_id: reporteId}, {
			$inc: {
				valorMerma: menosImporte
			}
		});

		MermasItem.remove({_id: MermaItemId});

	},
	cancelarRegistroMermas: function (MermaId, reporteId) {
		check(MermaId, String);
		check(reporteId, String);

		var mermas = MermasItem.find({mermaId: MermaId});

		mermas.forEach(function (item) {
			
			Productos.update({_id: item.productoId}, {
				$inc: {
					stock: item.cantidad,
					valor: item.valor,
					valorCosto: item.valorCosto,
					valorUtilidad: item.valorUtilidad
				}
			});

			item.importe = item.importe * -1;

			Reportes.update({_id: reporteId}, {
				$inc: {
					valorMerma: item.importe
				}
			});
		});

		MermasItem.remove({mermaId: MermaId});
		Mermas.remove({_id: MermaId});
	},  // POS
	nuevaVenta: function (negocioId) {
		check(negocioId, String);

		let ventaId = Ventas.insert({
			negocioId: negocioId,
			createdAt: new Date(),
			guardado: false,
			userId: this.userId
		});

		return {
			ventaId: ventaId
		};
	},
	agregarProductoAVentaItem: function (datos) {
		check(datos, {
			codigo: String,
			nombre: String,
			pventa: Number,
			cantidad: String,
			descuento: String,
			ventaId: String,
			productoId: String,
			utilidad: Number,
			pcosto: Number,
			reporteId: String
		});

		if (this.userId) {

			datos.descuento = parseFloat(datos.descuento);

			datos.pventa.toFixed(2);
			datos.cantidad = parseInt(datos.cantidad);
			datos.importe = (datos.pventa - datos.descuento) * datos.cantidad;
			datos.importe.toFixed(2);

			var descontarStock = datos.cantidad * -1;

			let menosValor = datos.pventa * datos.cantidad * -1;
			let menosValorCosto = datos.pcosto * datos.cantidad * -1;
			let menosValorUtilidad = datos.utilidad * datos.cantidad * -1;

			datos.valor = datos.pventa * datos.cantidad;
			datos.valorCosto = datos.pcosto * datos.cantidad;
			//datos.valorUtilidad = datos.utilidad * datos.cantidad;
			datos.valorUtilidad = ( (datos.pventa - datos.descuento) * datos.cantidad ) - ( datos.pcosto * datos.cantidad )
			Productos.update({_id: datos.productoId}, {
				$inc: {
					stock: descontarStock,
					valor: menosValor,
					valorCosto: menosValorCosto,
					valorUtilidad: menosValorUtilidad
				}
			});

			datos.userId = this.userId;

			let ventaItemId = VentasItem.insert(datos);
			let ventaId = Ventas.update({_id: datos.ventaId}, {
				$inc: {
					total: datos.importe
				}
			});

			Reportes.update({_id: datos.reporteId}, {
				$inc: {
					valorVenta: datos.importe,
					valorutilidadVenta: datos.valorUtilidad
				}
			});

		} else {
			throw new Meteor.Error('No dijiste la palabra magica ;)');
		}

	},
	eliminarVentaItem: function (datos) {
		check(datos, {
			importe: Number,
			itemId: String,
			ventaId: String,
			cantidad: Number,
			productoId: String,
			pcosto: Number,
			utilidad: Number,
			pventa: Number,
			reporteId: String
		});

		datos.importe *= -1;

		datos.valor = datos.pventa * datos.cantidad;
		datos.valorCosto = datos.pcosto * datos.cantidad;
		datos.valorUtilidad = datos.utilidad * datos.cantidad;

		Ventas.update({_id: datos.ventaId}, {
			$inc: {
				total: datos.importe
			}
		});

		VentasItem.remove({_id: datos.itemId});

		Productos.update({_id: datos.productoId}, {
				$inc: {
					stock: datos.cantidad,
					valor: datos.valor,
					valorCosto: datos.valorCosto,
					valorUtilidad: datos.valorUtilidad
				}
			});
		
		let menosVenta 			= datos.valor * -1;
		let menosVentaUtilidad 	= datos.valorUtilidad * -1;

		Reportes.update({_id: datos.reporteId}, {
			$inc: {
				valorVenta: menosVenta,
				valorutilidadVenta: menosVentaUtilidad
			}
		});

	},
	guardarVenta: function (datos) {
		check(datos, {
			cliente: String,
			clienteId: String,
			formaPago: String,
			formaPagoId: String,
			ventaId: String
		});

		Ventas.update({_id: datos.ventaId}, {
			$set: {
				cliente: datos.cliente,
				clienteId: datos.clienteId,
				formaPago: datos.formaPago,
				formaPagoId: datos.formaPagoId,
				pagado: new Date(),
				guardado: true
			}
		});

	},
	eliminarVenta: function (ventaId, reporteId) {
		check(ventaId, String);
		check(reporteId, String);

		var ventas = VentasItem.find({ventaId: ventaId});

		ventas.forEach(function (item) {
			
			Productos.update({_id: item.productoId}, {
				$inc: {
					stock: item.cantidad,
					valor: item.valor,
					valorCosto: item.valorCosto,
					valorUtilidad: item.valorUtilidad
				}
			});

			item.valor = item.valor * -1;
			item.valorUtilidad = item.valorUtilidad * -1;

			Reportes.update({_id: reporteId}, {
				$inc: {
					valorVenta: item.valor,
					valorutilidadVenta: item.valorUtilidad
				}
			});
		});

		VentasItem.remove({ventaId: ventaId});
		Ventas.remove({_id: ventaId});
	}
});