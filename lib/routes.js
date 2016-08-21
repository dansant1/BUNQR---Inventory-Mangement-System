FlowRouter.route('/', {
	name: 'inicio',
	action() {
		BlazeLayout.render("index");
	}
});

// ================
// Autenticaciones
// ================

FlowRouter.route('/login', {
	name: 'login',
	action() {	
		BlazeLayout.render("login");
	}
});

/*
FlowRouter.route('/login/:distribuidorId', {
	name: 'login',
	action() {	
		BlazeLayout.render("login");
	}
});
*/

FlowRouter.route('/signup', {
	name: 'signup',
	action() {
		
		BlazeLayout.render( "signup");
	}
});

/*FlowRouter.route('/admin/signup', {
	name: 'adminSignup',
	action() {
		BlazeLayout.render( "AdminSignup");
	}
});*/

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/dashboard' );
        Bert.alert( 'Email verificado ¡gracias!', 'success' );
      }
    });
  }
});


/*FlowRouter.route('/distribuidores/signup', {
	name: 'adminSignup',
	action() {
		BlazeLayout.render( "DistribuidorSignup");
	}
});*/


// ================
// Dashboard Admin
// ================

let dashboard = FlowRouter.group({
    prefix: "/dashboard"
});


dashboard.route('/admin/clientes', {
	name: 'clientesAdmin',
	action() {
		BlazeLayout.render('clientes');
	}
});

dashboard.route('/admin/clientes/cancelados', {
	name: 'clientesAdmin',
	action() {
		BlazeLayout.render('clientesCancelados');
	}
});

dashboard.route('/admin/distribuidores', {
	name: 'distribuidoresAdmin',
	action() {
		BlazeLayout.render('adminDistribuidores');
	}
});

dashboard.route('/admin/distribuidores/:distribuidorid', {
	name: 'distribuidoresAdmin',
	action() {
		BlazeLayout.render('detalleDistribuidor');
	}
});

dashboard.route('/admin/distribuidores/:distribuidorid/cancelados', {
	name: 'distribuidoresAdmin',
	action() {
		BlazeLayout.render('detalleDistribuidorCancelado');
	}
});

dashboard.route('/distribuidores/clientes', {
	name: 'distribuidoresAdmin',
	action() {
		BlazeLayout.render('clientesDeDistribuidores');
	}
});

dashboard.route('/distribuidores/clientes/cancelados', {
	name: 'distribuidoresAdmin',
	action() {
		BlazeLayout.render('clientesCanceladosDeDistribuidores');
	}
});

dashboard.route('/distribuidores/ganancias', {
	name: 'distribuidoresAdmin',
	action() {
		//BlazeLayout.render('dashboard', {content: "negocios"});
	}
});


dashboard.route('/', {
	name: 'dashboard',
	action() {
		BlazeLayout.render('dashboard', {content: "negocios"});
	}
});

dashboard.route('/registros', {
	name: 'registros',
	action() {
		BlazeLayout.render('dashboard', {content: "registros"});
	}
});

dashboard.route('/usuarios', {
	name: 'usuarios',
	action() {
		BlazeLayout.render('dashboard', {content: "usuarios"});
	}
});

dashboard.route('/configuracion', {
	name: 'configuracion',
	action() {
		BlazeLayout.render('dashboard', {content: "configuracion"});
	}
});

dashboard.route('/nuevo-negocio', {
	name: 'nuevo-negocio',
	action() {
		BlazeLayout.render('dashboard', {content: "nuevoNegocio"});
	}
});


dashboard.route('/:reporteid/r/:negocioid', {
	name: 'negocioMain',
	action() {
		BlazeLayout.render('dashboard', {content: "reportes"});
	}
});

dashboard.route('/:negocioid/registros', {
	name: 'registrosxnegocio',
	action() {
		BlazeLayout.render('dashboard', {content: "registros"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/almacenes', {
	name: 'almacenes',
	action() {
		BlazeLayout.render('dashboard', {content: "Almacen"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/almacenes/ingresos', {
	name: 'ingresosAlmacen',
	action() {
		BlazeLayout.render('dashboard', {content: "ingresosAlmacen"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/ventas', {
	name: 'ventas',
	action() {
		BlazeLayout.render('dashboard', {content: "Ventas"});
	}
});


dashboard.route('/:negocioid/ventas/pedidos', {
	name: 'Pedidos',
	action() {
		BlazeLayout.render('dashboard', {content: "Pedidos"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/ventas/pos/', {
	name: 'POS',
	action() {
		BlazeLayout.render('dashboard', {content: "POS"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/ventas/pos/:ventaid/detalle', {
	name: 'detalleVentaItem',
	action() {
		BlazeLayout.render('dashboard', {content: "detalleVenta"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/ventas/:ventaid/nuevo', {
	action() {
		BlazeLayout.render('dashboard', {content: "registrarVenta"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/finanzas', {
	name: 'finanzas',
	action() {
		BlazeLayout.render('dashboard', {content: "Finanzas"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/consultas', {
	name: 'consultas',
	action() {
		BlazeLayout.render('dashboard', {content: "Consultas"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/configuracion', {
	name: 'configuracion',
	action() {
		BlazeLayout.render('dashboard', {content: "Configuracion"});
	}
});

dashboard.route('/:reporteid/r/:negocioid/configuracion/negocio', {
	name: 'configuracion',
	action() {
		BlazeLayout.render('dashboard', {content: "ConfiguracionNegocio"});
	}
});

// Registros

let registros = dashboard.group({
	prefix: '/:reporteid/r/:negocioid/registros'
});

registros.route('/almacenes/final/:finalid/nuevo', {
	action() {
		BlazeLayout.render('dashboard', {content: "nuevoInventarioFinal"});
	}
});

registros.route('/', {
	name: 'registrosxnegocio',
	action() {
		BlazeLayout.render('dashboard', {content: "registros"});
	}
});

registros.route('/marcas', {
	name: 'listaMarca',
	action() {
		BlazeLayout.render('dashboard', {content: "listaMarca"});
	}
});

registros.route('/linea', {
	name: 'listaLinea',
	action() {
		BlazeLayout.render('dashboard', {content: "listaLinea"});
	}
});

registros.route('/categoria', {
	name: 'listaCategoria',
	action() {
		BlazeLayout.render('dashboard', {content: "listaCategoria"});
	}
});

registros.route('/presentacion', {
	name: 'listaPresentacion',
	action() {
		BlazeLayout.render('dashboard', {content: "listaPresentacion"});
	}
});

registros.route('/producto', {
	name: 'listaProducto',
	action() {
		BlazeLayout.render('dashboard', {content: "listaProducto"});
	}
});

registros.route('/producto/lista', {
	name: 'listaProductos',
	action() {
		BlazeLayout.render('dashboard', {content: "registrosProductos"});
	}
});

registros.route('/servicio', {
	name: 'listaServicio',
	action() {
		BlazeLayout.render('dashboard', {content: "listaServicio"});
	}
});

registros.route('/proveedor', {
	name: 'listaProveedor',
	action() {
		BlazeLayout.render('dashboard', {content: "listaProveedor"});
	}
});

registros.route('/cliente', {
	name: 'listaCliente',
	action() {
		BlazeLayout.render('dashboard', {content: "listaCliente"});
	}
});

registros.route('/pagos', {
	name: 'listaPagos',
	action() {
		BlazeLayout.render('dashboard', {content: "listaFormasDePago"});
	}
});

registros.route('/cuentas-bancarias', {
	name: 'listaCuentasBancarias',
	action() {
		BlazeLayout.render('dashboard', {content: "listaCuentasBancarias"});
	}
});

registros.route('/almacenes', {
	name: 'listaAlmacenes',
	action() {
		BlazeLayout.render('dashboard', {content: "listaAlmacenes"});
	}
});

registros.route('/almacenes/ingresos', {
	name: 'listaIngresos',
	action() {
		BlazeLayout.render('dashboard', {content: "listaIngresos"});
	}
});

registros.route('/almacenes/ingresos/masivo', {
	name: 'listaIngresosMasivo',
	action() {
		BlazeLayout.render('dashboard', {content: "listaCargasMasivo"});
	}
});

registros.route('/almacenes/ingresos/masivo/:cargaid', {
	name: 'detalleCarga',
	action() {
		BlazeLayout.render('dashboard', {content: "detalleCarga"});
	}
});

registros.route('/almacenes/ingresos/compras', {
	name: 'listaIngresos',
	action() {
		BlazeLayout.render('dashboard', {content: "listaComprasTwo"});
	}
});

registros.route('/almacenes/ingresos/compras/:compraid', {
	name: 'detalleCompra',
	action() {
		BlazeLayout.render('dashboard', {content: "detalleCompra"});
	}
});

registros.route('/almacenes/stock', {
	name: 'listaStock',
	action() {
		BlazeLayout.render('dashboard', {content: "listaStock"});
	}
});


registros.route('/almacenes/:cargaid/ingresos/masivo/nuevo', {
	name: 'nuevaCarga',
	action() {
		BlazeLayout.render('dashboard', {content: "ingresoMasivo"});
	}
});


registros.route('/almacenes/:compraid/ingresos/compras/nuevo', {
	name: 'nuevaCompra',
	action() {
		BlazeLayout.render('dashboard', {content: "registrarCompra"});
	}
});


registros.route('/almacenes/salidas', {
	name: 'listaSalidas',
	action() {
		BlazeLayout.render('dashboard', {content: "listaSalidas"});
	}
});



registros.route('/almacenes/devoluciones/nuevo', {
	name: 'nuevaDevolucion',
	action() {
		BlazeLayout.render('dashboard', {content: "nuevaDevolucion"});
	}
});



registros.route('/almacenes/merma/', {
	action() {
		BlazeLayout.render('dashboard', {content: "listaMermas"});
	}
});

registros.route('/almacenes/merma/:mermaid', {
	action() {
		BlazeLayout.render('dashboard', {content: "detalleMerma"});
	}
});

registros.route('/almacenes/merma/:mermaid/nuevo', {
	name: 'nuevaMerma',
	action() {
		BlazeLayout.render('dashboard', {content: "registroMerma"});
	}
});

registros.route('/almacenes/devoluciones', {
	name: 'listaDevoluciones',
	action() {
		BlazeLayout.render('dashboard', {content: "listaDevoluciones"});
	}
});

registros.route('/almacenes/merma', {
	name: 'listaMerma',
	action() {
		BlazeLayout.render('dashboard', {content: "listaMerma"});
	}
});

// Crear
// Rutas para ingresos y salidad de almacenes

registros.route('/almacenes/ingresos/nuevo', {
	name: 'registroIngresos',
	action() {
		BlazeLayout.render('dashboard', {content: "registroIngresos"});
	}
});

registros.route('/almacenes/salidas/nuevo', {
	name: 'registroSalidas',
	action() {
		BlazeLayout.render('dashboard', {content: "registroSalidas"});
	}
});



registros.route('/marcas/nuevo', {
	name: 'registroMarca',
	action() {
		BlazeLayout.render('dashboard', {content: "registroMarca"});
	}
});

registros.route('/linea/nuevo', {
	name: 'registroLinea',
	action() {
		BlazeLayout.render('dashboard', {content: "registroLinea"});
	}
});

registros.route('/categoria/nuevo', {
	name: 'registroCategoria',
	action() {
		BlazeLayout.render('dashboard', {content: "registroCategoria"});
	}
});

registros.route('/presentacion/nuevo', {
	name: 'registroPresentacion',
	action() {
		BlazeLayout.render('dashboard', {content: "registroPresentacion"});
	}
});

registros.route('/producto/nuevo', {
	name: 'registroProducto',
	action() {
		BlazeLayout.render('dashboard', {content: "registroProducto"});
	}
});

registros.route('/servicio/nuevo', {
	name: 'registroServicio',
	action() {
		BlazeLayout.render('dashboard', {content: "registroServicio"});
	}
});

registros.route('/proveedor/nuevo', {
	name: 'registroProveedor',
	action() {
		BlazeLayout.render('dashboard', {content: "registroProveedor"});
	}
});

registros.route('/cliente/nuevo', {
	name: 'registroCliente',
	action() {
		BlazeLayout.render('dashboard', {content: "registroCliente"});
	}
});

registros.route('/pagos/nuevo', {
	name: 'registroPago',
	action() {
		BlazeLayout.render('dashboard', {content: "registroFormasDePago"});
	}
});

registros.route('/cuentas-bancarias/nuevo', {
	name: 'registroCuentasBancarias',
	action() {
		BlazeLayout.render('dashboard', {content: "registroCuentaBancaria"});
	}
});

registros.route('/almacenes/nuevo', {
	name: 'registroAlmacen',
	action() {
		BlazeLayout.render('dashboard', {content: "registroAlmacen"});
	}
});

