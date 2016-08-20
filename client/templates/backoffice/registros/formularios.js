Template.registroMarca.events({
  'submit form': function (event, template) {
		event.preventDefault();

 		let datos = {
    		nombre: template.find( '[name="nombre"]' ).value,
   		descripcion: template.find( '[name="descripcion"]' ).value
  		};

      datos.negocioId = FlowRouter.getParam('negocioid');

  		Meteor.call('registrarMarca', datos, function (err, result) {
         if (err) {
  				Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
  			} else {

  				Bert.alert( 'Creaste una nueva marca :=)', 'success' );
  				FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/marcas');
  			}
  		});
	}
});


Template.registroLinea.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="linea"]' ).value,
         descripcion: template.find( '[name="descripcion"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarLinea', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Creaste una nueva linea :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/linea');
         }
      });
   }
});


Template.registroCategoria.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="categoria"]' ).value,
         descripcion: template.find( '[name="descripcion"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarCategoria', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Creaste una nueva categoria :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/categoria');
         }
      });
   }
});


Template.registroPresentacion.events({
  'click .agregar': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="nombre"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');
      

     Meteor.call('registrarPresentacion', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Creaste una nueva presentacion :=)', 'success' );
             template.find( '[name="nombre"]' ).value = "";    
         }
      });
   }
});


Template.registroProducto.onCreated(function () {
   
   var self = this;
   self.autorun(function() {
      var negocioId = FlowRouter.getParam('negocioid');
      self.subscribe('listaMarcas', negocioId);
      self.subscribe('listaCategorias', negocioId);
      self.subscribe('listaLineas', negocioId);  
   });

});

Template.registroProducto.helpers({
   marcas: function () {
      return Marcas.find();;
   },
   categorias: function () {
      return Categorias.find();
   },
   lineas: function () {
      return Lineas.find();
   }
});


Template.FormularioCargaMasiva.onCreated(function () {
   
   var self = this;
   self.autorun(function() {
      var negocioId = FlowRouter.getParam('negocioid');
      self.subscribe('listaMarcas', negocioId);
      self.subscribe('listaCategorias', negocioId);
      self.subscribe('listaLineas', negocioId);  
   });

});

Template.FormularioCargaMasiva.helpers({
   marcas: function () {
      return Marcas.find();;
   },
   categorias: function () {
      return Categorias.find();
   },
   lineas: function () {
      return Lineas.find();
   }
});

Template.registroProducto.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="nombre"]' ).value,
         descripcion: template.find( '[name="descripcion"]' ).value,
         codigo: template.find( '[name="codigo"]' ).value,
         pcosto: template.find( '[name="costo"]' ).value,
         pventa: template.find( '[name="precio"]' ).value,
         pxmayor: template.find( '[name="pmayor"]' ).value,
         stockmin: template.find( '[name="minimo"]' ).value,
         stockmax: template.find( '[name="maximo"]' ).value,
         marca: $('#marca>option:selected').text(),
         marcaid: $('#marca>option:selected').val(),
         linea: $('#linea>option:selected').text(),
         lineaid: $('#linea>option:selected').val(),
         categoria: $('#categoria>option:selected').text(),
         categoriaid: $('#categoria>option:selected').val()
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarProducto', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Agregaste un nuevo producto :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/producto');
         }
      });
   }
});


Template.registroServicio.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="nombre"]' ).value,
         descripcion: template.find( '[name="descripcion"]' ).value,
         costo: $('#costo').val()
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarServicio', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Creaste un nuevo servicio :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/servicio');
         }
      });
   }
});


Template.registroProveedor.events({
  'click .agregar': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="empresa"]' ).value,
         descripcion: template.find( '[name="descripcion"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarProveedor', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Agregaste a un nuevo proveedor :=)', 'success' );
            template.find( '[name="empresa"]' ).value       = "";
            template.find( '[name="descripcion"]' ).value   = "";
         }
      });
   }
});


Template.registroCliente.events({
  'click .agregar': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="nombre"]' ).value,
         ruc: template.find( '[name="numero"]' ).value,
         direccion: template.find( '[name="direccion"]' ).value,
         contacto: template.find( '[name="contacto"]' ).value,
         email: template.find( '[name="email"]' ).value,
         telefono: template.find( '[name="telefono"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarCliente', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Agregaste a un nuevo cliente :=)', 'success' );
            template.find( '[name="nombre"]' ).value  = "";
            template.find( '[name="numero"]' ).value  = "";
            template.find( '[name="direccion"]' ).value  = "";
            template.find( '[name="contacto"]' ).value   = "";
            template.find( '[name="email"]' ).value   = "";
            template.find( '[name="telefono"]' ).value   = "";
         }
      });
   }
});

Template.registroFormasDePago.events({
  'click .agregar': function (event, template) {
      event.preventDefault();

      let datos = {
         descripcion: template.find( '[name="descripcion"]' ).value,
         periodo: template.find( '[name="periodo"]' ).value,
         tipo: $('#periodo>option:selected').val()
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarFormaDePago', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {

            Bert.alert( 'Creaste una nueva forma de pago :=)', 'success' );
            template.find( '[name="descripcion"]' ).value = "";
            template.find( '[name="periodo"]' ).value = "";
         };
      });
   }
});


Template.registroCuentaBancaria.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         numero: template.find( '[name="numero"]' ).value,
         banco: template.find( '[name="banco"]' ).value,
         moneda: $('#moneda>option:selected').val(),
         saldo: template.find( '[name="saldo"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarCuentaBancaria', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {
            Bert.alert( 'Agregaste un cuenta bancaria :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/cuentas-bancarias');
         }
      });
   }
});

Template.registroAlmacen.events({
  'click .agregar': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="almacen"]' ).value,
         direccion: template.find( '[name="direccion"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarAlmacen', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {
            Bert.alert( 'Agregaste un almacen :=)', 'success' );
            
         }
      });
   }
});

Template.registroIngresos.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         proveedor: $('#proveedores>option:selected').text(),
         proveedorId: $('#proveedores>option:selected').val(), 
         tipo: $('#tipo>option:selected').text(),
         almacen: $('#almacenes>option:selected').text(),
         almacenId: $('#almacenes>option:selected').val(),
         fecha: template.find( '[name="fecha"]' ).value,
         concepto: $('#conceptos>option:selected').text(),
         numero: template.find( '[name="numero"]' ).value,
         hora: template.find( '[name="hora"]' ).value,
         minuto: template.find( '[name="minuto"]' ).value,
         producto: $('#productos>option:selected').text(),
         productoId: $('#productos>option:selected').val(),
         unidad: $('#unidades>option:selected').text(),
         cantidad: template.find( '[name="cantidad"]' ).value
      };

      if (datos.hora === "") {
         datos.hora = '00'
      } 

      if (datos.minuto === "") {
         datos.minuto = '00'
      }

      if (datos.fecha === "") {
         Bert.alert( 'Ingresa una fecha, porfavor vuelve a intentarlo', 'warning' );
      }

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarIngreso', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {
            Bert.alert( 'Agregaste un ingreso :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos');
         }
      });
   }
});


Template.registroSalidas.events({
  'submit form': function (event, template) {
      event.preventDefault();

      let datos = {
         nombre: template.find( '[name="almacen"]' ).value,
         direccion: template.find( '[name="direccion"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');

      Meteor.call('registrarSalida', datos, function (err, result) {
         if (err) {
            Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
         } else {
            Bert.alert( 'Agregaste una salida :=)', 'success' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
         }
      });
   }
});

Template.FormularioCargaMasiva.events({
   'click .agregar': function (e, template) {
      e.preventDefault();

      var datos = {
         codigo: template.find( '[name="codigo"]' ).value,
         nombre: template.find( '[name="nombre"]' ).value,
         medida: $('#unidad>option:selected').text(),
         almacen: $('#almacen>option:selected').val(),
         pcosto: template.find( '[name="pcosto"]' ).value,
         pventa: template.find( '[name="pventa"]' ).value
      };


      datos.reporteId = FlowRouter.getParam('reporteid');

      datos.negocioId = FlowRouter.getParam('negocioid');
      var cantidad = template.find( '[name="cantidad"]' ).value;
      var cargaId = FlowRouter.getParam('cargaid');

      Meteor.call('registrarProductoCargaMasiva', datos, cantidad, cargaId, function (err, result) {
         if (err) {
            console.log('Hubo un error');
         } else {
            template.find( '[name="codigo"]' ).value     = "";
            template.find( '[name="nombre"]' ).value     = "";
            template.find( '[name="cantidad"]' ).value   = "";
            template.find( '[name="pcosto"]' ).value      = "";
            template.find( '[name="pventa"]' ).value     = "";
         }
      });
   }
});



Template.ingresoMasivo.events({
   'click .agregar-masivo': function (e, template) {
      e.preventDefault();

      var cargaId = FlowRouter.getParam('cargaid');
      console.log(cargaId);

      var datos = {
         almacen: $('#almacenes>option:selected').text(),
         almacenId: $('#almacenes>option:selected').val(),
         proveedor: $('#proveedores>option:selected').text(),
         proveedorId: $('#proveedores>option:selected').val(),
         formaPago: $('#formas-pago>option:selected').text(),
         formaPagoId: $('#formas-pago>option:selected').val(),
         moneda: $('#moneda>option:selected').val(),
         fecha: template.find( '[name="fecha"]' ).value
      };

      datos.negocioId = FlowRouter.getParam('negocioid');
      datos.cargaId = FlowRouter.getParam('cargaid');

      if (datos.fecha === "") {
         Bert.alert( 'Ingresa la fecha de ingreso de carga', 'warning' );
      } else {
         Meteor.call('AgregarCargaMasiva', datos, function (err, result) {
            if (err) {
               console.log('Hubo un error');
            } else {
               Bert.alert( 'Agregaste una carga al almacen :=)', 'success' );
               FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
            }
         });
      }
   },
   'click .cancelar-masivo': function (e, template) {
      e.preventDefault();

      let cargaId    = FlowRouter.getParam('cargaid');
      let reporteId  = FlowRouter.getParam('reporteid');

      Meteor.call('CancelarCarga', cargaId, reporteId, function (error) {
         if (error) {
            console.log(error.reason);
         } else {
            Bert.alert( 'Cancelaste la carga', 'warning' );
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
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
   'click .ir-stock': function () {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
   },

});

Template.FormularioCompraItem.events({
   'click .agregar': function (e, template) {
      var compraId = FlowRouter.getParam('compraid');

      let datos = {
         descripcion: template.find('[name="descripcion"]').value,
         importe: template.find('[name="importe"]').value
      };

      datos.reporteId = FlowRouter.getParam('reporteid');

      datos.compraId = compraId;

         if (datos.importe === "") {
            Bert.alert('Ingresa el importe', 'warning');
         } 

         if (datos.descripcion === "") {
            Bert.alert('Ingresa el importe', warning);
         } else {
            Meteor.call('agregarCompraItem', datos, function (error, result) {
               if (error) {
                  console.log('Hubo un error');
               } else {
                  Bert.alert( 'Agregaste un item', 'success' );
                  template.find('[name="descripcion"]').value = "";
                  template.find('[name="importe"]').value = "";
               }
            });
         }
      
   }
});

Template.listaCompraItem.onCreated(function () {
   var self = this;
   self.autorun(function() {
      var compraId = FlowRouter.getParam('compraid');
      self.subscribe('ListaComprasItem', compraId); 
      self.subscribe('CompraUnica', compraId);  
   });
});

Template.listaCompraItem.helpers({
   items: function () {
      return ComprasItem.find({}, {sort: {createdAt: -1}});
   },
   compra: function () {
      return Compras.find();
   }
});

Template.listaCompraItem.events({
   'click .eliminar': function () {
      let compraId   = FlowRouter.getParam('compraid');
      let reporteId  = FlowRouter.getParam('reporteid');
      let importe    = this.importe;

      if (Meteor.userId()) {
         Meteor.call('eliminarCompraItem', this._id, compraId, importe, reporteId, function (error) {
            if (error) {
               console.log('Hubo un error');
            }
         });
      } 
   }
});

Template.registrarCompra.events({
   'click .guardar': function (event, template) {
      var datos = {
         fecha: template.find('[name="fecha"]').value,
         cuentaBancaria: $('#cuentas>option:selected').text(),
         cuentaBancariaId: $('#cuentas>option:selected').val() 
      };

      datos.negocioId = FlowRouter.getParam('negocioid');
      datos.compraId = FlowRouter.getParam('compraid');

      if (datos.fecha !== "") {
         Meteor.call('registrarCompra', datos, function (error, result) {
            if (error) {
               console.log(error.reason);
            } else {
               Bert.alert( 'Guardaste la compra', 'success' );
               FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
            }
         });
      } else {
         Bert.alert('Ingresa la fecha', 'warning');  
         
      }
   },
   'click .cancelar': function () {
      let compraId   = FlowRouter.getParam('compraid');
      let reporteId  = FlowRouter.getParam('reporteid');
      Meteor.call('cancelarCompra', compraId, reporteId, function (error) {
         if (error) {
            console.log(error.reason);
         } else {
            Bert.alert('Cancelaste la compra', 'warning');  
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
         }
      });
   },
   'click .lista-compras': function () {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
   }
});

Template.listaComprasTwo.onCreated(function () {
   var self = this;
   self.autorun(function() {
      var negocioId = FlowRouter.getParam('negocioid');
      self.subscribe('ListaCompras', negocioId);  
   });
});

Template.listaComprasTwo.helpers({
   compras: function () {
      return Compras.find({}, {sort: {createdAt: -1}});
   },
   fechaComprado: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.fecha;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});


Template.listaComprasTwo.events({
   'click .ver': function () {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras/' + this._id);
   },
   'click .almacen-ingreso': function (e, t) {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/masivo');
   },
   'click .almacen-salida': function (e, t) {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
   },
   'click .almacen-producto': function (e, t) {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/producto');
   },
   'click .almacen-stock': function (e, t) {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
   },
   'click .almacen-compra': function () {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos/compras');
   },
   'click .ingresar-compra': function () {
      Meteor.call('nuevaCompraItem', function (err, result) {
         if (err) {
            console.log(err.reason);
         } else {
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/' + result.compraId + '/ingresos/compras/nuevo');
         }
      });
   }
});

Template.detalleCompra.onCreated(function () {
   var self = this;
   self.autorun(function() {
      compraId = FlowRouter.getParam('compraid');
      self.subscribe('ListaComprasItem', compraId);  
      self.subscribe('detallaDeUnaCompra', compraId);  
   });
});

Template.detalleCompra.helpers({
   compras: function () {
      return Compras.find();
   },
   compraitem: function () {
      return ComprasItem.find({}, {sort: {createdAt: -1}});
   },
   fechaComprado: function () {
      let meses = [
         "Enero", "Febrero",
         "Marzo", "Abril",
         "Mayo", "Junio",
         "Julio", "Agosto",
         "Setiembre", "Octubre",
         "Noviembre", "Diciembre"
      ];

      let fecha = this.fecha;
      let dia = fecha.getDate();
      let mes = fecha.getMonth();
      let anio = fecha.getFullYear();

      return dia + ' de ' + meses[mes] + ' de ' + anio;
   }
});


Template.registroMerma.events({
   'click .guardar': function (event, template) {
      var datos = {
         fecha: template.find('[name="fecha"]').value,
         descripcion: template.find('[name="descripcion"]').value,
         proveedor: $('#proveedores>option:selected').text(),
         proveedorId: $('#proveedores>option:selected').val() 
      };

      datos.mermaId = FlowRouter.getParam('mermaid');

      if (datos.fecha == undefined) {
         Bert.alert('Ingresa la fecha', 'warning');
      } else {   
         Meteor.call('registrarMerma', datos, function (error, result) {
            if (error) {
               console.log(error.reason);
            } else {
               Bert.alert( 'Guardaste la Merma', 'success' );
               FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
            }
         });
      }
   },
   'click .cancelar': function () {
      let mermaId    = FlowRouter.getParam('mermaid');
      let reporteId  = FlowRouter.getParam('reporteid');
      Meteor.call('cancelarRegistroMermas', mermaId, reporteId, function (error) {
         if (error) {
            console.log(error.reason);
         } else {
            Bert.alert('Cancelaste el registro de merma', 'warning');  
            FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
         }
      });
   },
   'click .ir-stock': function () {
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('reporteid') + '/r/' + FlowRouter.getParam('negocioid') + '/almacenes');
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
   }
});


Template.ListaProductosMerma.onCreated(function () {
   var self = this;
   self.autorun(function() {
      self.subscribe('users');    
   });
});

Template.ListaProductosMerma.helpers({
   productosIndex: function () {
      
      return ProductosIndex;
   },
   nombres: function () {
      return Meteor.users.findOne({});
   }
});

Template.ListaProductosMerma.events({
   'click .agregar': function (e, template) {
      e.preventDefault();

      var datos = {
         productoId: this.__originalId,
         pcosto: this.pcosto,
         codigo: this.codigo,
         producto: this.nombre,
         pventa: this.pventa,
         utilidad: this.utilidad,
         medida: this.medida
      };

      $('input[name="cantidad"]').each(function(key,val){
            if (val.value !== "") {
               datos.cantidad = val.value;
               val.value = "";
            } 
      });

      // Medidas
      /*$('tr>td>p>#unidad').each(function(key,val){
             
            if (val.value !== "opcion") {
               datos.medida = val.value;
               val.value = "opcion" 
            } 
      });*/

    //console.log(datos.medida);
      // Fin de medidas
      
      datos.mermaId     = FlowRouter.getParam('mermaid');
      datos.reporteId   = FlowRouter.getParam('reporteid');
      
      Meteor.call('agregarProductoAMermaItem', datos, function (err, result) {
         if (err) {
            console.log(err.reason);
         } else {
            console.log('Exitooo!');
         }
      }); 
      
      
   }
});

Template.listaMermaItem.onCreated(function () {
   var self = this;
   self.autorun(function() {
      var mermaId = FlowRouter.getParam('mermaid');
      self.subscribe('listaMermaItem', mermaId);
      self.subscribe('MermaUnica', mermaId);  
   });
});

Template.listaMermaItem.helpers({
   items: function () {
      return MermasItem.find({});
   },
   merma: function () {
      return Mermas.find();
   },
   totalreal() {
      return this.total.toFixed(1);
   },
   importeReal() {
      return this.importe.toFixed(1);
   }
});

Template.listaMermaItem.events({
   'click .eliminar': function () {
      mermaItemId    = this._id;
      productoId     = this.productoId;
      cantidad       = this.cantidad;
      importe        = this.importe;
      valor          = this.valor;
      valorCosto     = this.valorCosto;
      valorUtilidad  = this.valorUtilidad;
      mermaId        = FlowRouter.getParam('mermaid');
      reporteId      = FlowRouter.getParam('reporteid');
      Meteor.call('eliminarMermaItem', mermaItemId, productoId, cantidad, mermaId, importe, valor, valorCosto, valorUtilidad, reporteId, function (error) {
         if (error) {
            console.log('Hubo un error');
         }
      });
   }
});