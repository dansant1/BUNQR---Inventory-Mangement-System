Meteor.publish('negocios', function () {

	return Negocios.find({_id: Meteor.users.findOne({_id: this.userId}).profile.negocioId});

});

Meteor.publish('MiEmpresa', function () {
	return Negocios.find({_id: Meteor.users.findOne({_id: this.userId}).profile.negocioId});
});

Meteor.publish('listaMarcas', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Marcas.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaCategorias', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Categorias.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaLineas', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Lineas.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaProductos', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Productos.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaAlmacenes', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Almacen.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaPresentaciones', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Presentacion.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaClientes', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Clientes.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('listaFormasPago', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return FormasdePago.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('users', function() {
    return Meteor.users.find({_id: this.userId}, {fields:{profile: true}});
});


Meteor.publish('listaCargaItem', function (cargaId) {
	check(cargaId, String);
	if (this.userId) {
		return CargaItem.find({cargaId: cargaId});
	} else {
		return this.ready();
	}

});


Meteor.publish('listaProveedores', function (negocioId) {
	check(negocioId, String);
	if (this.userId) {
		return Proveedores.find({negocioId: negocioId});
	} else {
		return this.ready();
	}

});

Meteor.publish('ListaCargasMasivo', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Cargas.find({negocioId: negocioId, guardado: true});
	} else {
		return this.ready();
	}
});

Meteor.publish('ListaCargaitem', function (cargaId) {
	check(cargaId, String);

	if (this.userId) {
		return CargaItem.find({cargaId: cargaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('listaInventarioFinalItem', function (inventarioFinalId) {
	check(inventarioFinalId, String);

	if (this.userId) {
		return InventarioFinalItem.find({inventarioId: inventarioFinalId});
	} else {
		return this.ready();
	}
});

Meteor.publish('inventarioTotal', function (inventarioFinalId) {

	check(inventarioFinalId, String);
	
	if (this.userId) {
		return InventarioFinal.find({_id: inventarioFinalId});
	} else {
		return this.ready();
	}
});

Meteor.publish('ListaProductosItem', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Productos.find({negocioId: negocioId});
	} else {
		return this.ready();
	}
});

Meteor.publish('ListaProductosItemBuscador', function (negocioId, search) {

	check( search, Match.OneOf( String, null, undefined ) );
	check(negocioId, String);

	let query      = {},
      projection = { limit: 10, sort: { nombre: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {

      $or: [
        { nombre: regex },
        { codigo: regex },

      ]
    };

    projection.limit = 100;
  }

  return Productos.find( query, projection );

});



Meteor.publish('ListaCompras', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Compras.find({negocioId: negocioId, guardado: true});
	} else {
		return this.ready();
	}
});

Meteor.publish('detallaDeUnaCompra', function (compraId) {
	check(compraId, String);

	if (this.userId) {
		return Compras.find({_id: compraId});
	} else {
		return this.ready();
	}
});


Meteor.publish('ListaComprasItem', function (compraId) {
	check(compraId, String);

	if (this.userId) {
		return ComprasItem.find({compraId: compraId});
	} else {
		return this.ready();
	}
});


Meteor.publish('ListaCuentasBancarias', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return CuentasBancarias.find({negocioId: negocioId});
	} else {
		return this.ready();
	}
});

Meteor.publish('listaMermaItem', function (mermaId) {
	check(mermaId, String);

	if (this.userId) {
		return MermasItem.find({mermaId: mermaId});
	} else {
		return this.ready();
	}
});


Meteor.publish('listaMermas', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Mermas.find({negocioId: negocioId, guardado: true});
	} else {
		return this.ready();
	}
});


Meteor.publish('listaMermasTwo', function (mermaId) {
	check(mermaId, String);

	if (this.userId) {
		return Mermas.find({_id: mermaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('DetalleDeMerma', function (mermaId) {
	check(mermaId, String);

	if (this.userId) {
		return Mermas.find({_id: mermaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('listaVentaItem', function (ventaId) {
	check(ventaId, String);
	if (this.userId) {
		return VentasItem.find({ventaId: ventaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('ventaTotal', function (ventaId) {
	check(ventaId, String);
	if (this.userId) {
		return Ventas.find({_id: ventaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('ventasDelDia', function (negocioId) {
	check(negocioId, String);


	// Filtramos las ventas de hoy dia
	return Ventas.find({negocioId: negocioId, guardado: true});
});

Meteor.publish('DetalleVenta', function (ventaId) {
	check(ventaId, String);

	if (this.userId) {
		return Ventas.find({_id: ventaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('CargaItemTwo', function (cargaId) {
	check(cargaId, String);
	if (this.userId) {
		return Cargas.find({_id: cargaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('MermaUnica', function (mermaId) {
	check(mermaId, String);
	if (this.userId) {
		return Mermas.find({_id: mermaId});
	} else {
		return this.ready();
	}
});

Meteor.publish('CompraUnica', function (compraId) {
	check(compraId, String);
	if (this.userId) {
		return Compras.find({_id: compraId});
	} else {
		return this.ready();
	}
});

Meteor.publish('reportes', function (reporteId) {
	check(reporteId, String);

	if (this.userId) {
		return Reportes.find({_id: reporteId});
	} else {
		return this.ready();
	}
});

Meteor.publish('todosLosReportes', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Reportes.find({negocioId: negocioId});
	} else {
		return this.ready();
	}
});

Meteor.publish('ProductosReporte', function (negocioId) {
	check(negocioId, String);

	if (this.userId) {
		return Productos.find({negocioId: negocioId});
	} else {
		return this.ready();
	}
});
