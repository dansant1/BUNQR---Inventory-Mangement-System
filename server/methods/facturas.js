Meteor.methods({
	'crearFactura': function(datos) {
        check(datos, {
            ventaId: String,
            ruc: String,
            cliente: String,
            emision: String,
            vence: String,
            numero: String,
            observaciones: String
        });
 
    // SETUP
    // Grab required packages
    var webshot = Meteor.npmRequire('webshot');
    var fs      = Npm.require('fs');
    var Future = Npm.require('fibers/future');
 
    var fut = new Future();
    var fileName = "factura.pdf";

     let negocioId = Meteor.users.findOne({_id: this.userId}).profile.negocioId;

    let clienteId = Clientes.insert({
        nombre: datos.cliente,
        ruc: datos.ruc,
        negocioId: negocioId
    });

    let indefinido = Facturas.findOne({ventaId: datos.ventaId});

    if (indefinido !== undefined) {
            
            if ( Facturas.findOne({ventaId: datos.ventaId}).ventaId !== datos.ventaId ) {
                Facturas.insert({
                    createdAt: new Date(),
                    ventaId: datos.ventaId,
                    negocioId: negocioId
                });
            }
    } else {
        Facturas.insert({
                    createdAt: new Date(),
                    ventaId: datos.ventaId,
                    negocioId: negocioId
                });
    }

    

     var numeroDeFactura = Facturas.find().fetch({negocioId: negocioId}).length;

    if (datos.numero === "") {
        var codificacion = Negocios.findOne({_id: negocioId}).codigo;
        
        Ventas.update({_id: datos.ventaId}, {
            $inc: {
                factura: 1 
            }
        });

        //var numeroFactura = Ventas.findOne({_id: datos.ventaId}).factura;

        datos.numero = codificacion + numeroDeFactura;
    } 

    if (datos.vence === "") {
        datos.vence = "-";
    }

    Ventas.update({_id: datos.ventaId}, {
        $set: {
            emision: datos.emision,
            vence: datos.vence,
            numero: datos.numero,
            observaciones: datos.observaciones,
            clienteId: clienteId 
        }
    });

 
    var bootstrap = Assets.getText('styles.css');
    var css = Assets.getText('custom.css');  

    SSR.compileTemplate('layout', Assets.getText('layout.html'));

    Template.layout.helpers({
        getDocType: function() {
            return "<!DOCTYPE html>";
        }
    });

    SSR.compileTemplate('factura', Assets.getText('factura.html'));
    
    var items = VentasItem.find({ventaId: datos.ventaId});

    let total = 0;
    let subtotal;
    let IGV;

    items.forEach(function (index) {
        total = total + index.valor;
    });

    subtotal = total*100/118;

    IGV = total - subtotal;

    var data = {
        items: items,
        negocio: Negocios.findOne({_id: negocioId}).nombre,
        ruc: datos.ruc,
        cliente: datos.cliente,
        emision: datos.emision,
        vence: datos.vence,
        numero: datos.numero,
        observaciones: datos.observaciones,
        total: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        igv: IGV.toFixed(2),
        ruce: Negocios.findOne({_id: negocioId}).ruc,
        direccion: Negocios.findOne({_id: negocioId}).direccion,
        provincia: Negocios.findOne({_id: negocioId}).provincia,
        departamento: Negocios.findOne({_id: negocioId}).departamento,

    }

    var html_string = SSR.render('layout', {
        css: css,
        bootstrap: bootstrap,
        template: "factura",
        data: data
    });

    var options = {
        "paperSize": {
            "format": "Letter",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };

    console.log("Conectando webshot...");
    
    webshot(html_string, fileName, options, function(err) {

        fs.readFile(fileName, function (err, data) {
            
            if (err) {
                return console.log(err);
            }
 
            fs.unlinkSync(fileName);
            fut.return(data);
 
        });

    });
      
    let pdfData = fut.wait();
    let base64String = new Buffer(pdfData).toString('base64');
 
    return base64String;

    },
    'exportarFactura': function(ventaId) {
        check( ventaId, String);
 
    // SETUP
    // Grab required packages
    var webshot = Meteor.npmRequire('webshot');
    var fs      = Npm.require('fs');
    var Future = Npm.require('fibers/future');
 
    var fut = new Future();
    var fileName = "factura.pdf";

    let negocioId = Meteor.users.findOne({_id: this.userId}).profile.negocioId;


    let venta = Ventas.findOne({_id: ventaId});
    console.log(venta.clienteId);
    let cliente = Clientes.findOne({_id: venta.clienteId});

    console.log(cliente);

    if (venta.vence === "") {
        venta.vence = "-";
    }

    
    var bootstrap = Assets.getText('styles.css');
    var css = Assets.getText('custom.css');  

    SSR.compileTemplate('layout', Assets.getText('layout.html'));

    Template.layout.helpers({
        getDocType: function() {
            return "<!DOCTYPE html>";
        }
    });

    SSR.compileTemplate('factura', Assets.getText('factura.html'));
    
    var items = VentasItem.find({ventaId: ventaId});

    let total = 0;
    let subtotal;
    let IGV;

    items.forEach(function (index) {
        total = total + index.valor;
    });

    subtotal = total*100/118;

    IGV = total - subtotal;

    var data = {
        items: items,
        negocio: Negocios.findOne({_id: negocioId}).nombre,
        ruc: cliente.ruc,
        cliente: cliente.nombre,
        emision: venta.emision,
        vence: venta.vence,
        numero: venta.numero,
        observaciones: venta.observaciones,
        total: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        igv: IGV.toFixed(2),
        ruce: Negocios.findOne({_id: negocioId}).ruc,
        direccion: Negocios.findOne({_id: negocioId}).direccion,
        provincia: Negocios.findOne({_id: negocioId}).provincia,
        departamento: Negocios.findOne({_id: negocioId}).departamento,

    }

    var html_string = SSR.render('layout', {
        css: css,
        bootstrap: bootstrap,
        template: "factura",
        data: data
    });

    var options = {
        "paperSize": {
            "format": "Letter",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };

    console.log("Conectando webshot...");
    
    webshot(html_string, fileName, options, function(err) {

        fs.readFile(fileName, function (err, data) {
            
            if (err) {
                return console.log(err);
            }
 
            fs.unlinkSync(fileName);
            fut.return(data);
 
        });

    });
      
    let pdfData = fut.wait();
    let base64String = new Buffer(pdfData).toString('base64');
 
    return base64String;

    },
    'crearBoleta': function(datos) {
        check(datos, {
            ventaId: String,
            cliente: String,
            emision: String,
            numero: String,
            observaciones: String,
            direccion: String
        });
 
    // SETUP
    // Grab required packages
    var webshot = Meteor.npmRequire('webshot');
    var fs      = Npm.require('fs');
    var Future = Npm.require('fibers/future');
 
    var fut = new Future();
    var fileName = "boleta.pdf";

    let negocioId = Meteor.users.findOne({_id: this.userId}).profile.negocioId;

    let clienteId = Clientes.insert({
        nombre: datos.cliente,
        direccion: datos.direccion,
        negocioId: negocioId
    });

    let indefinido = Boletas.findOne({ventaId: datos.ventaId});

    if (indefinido !== undefined) {
        if ( Boletas.findOne({ventaId: datos.ventaId}).ventaId !== datos.ventaId ) {
            Boletas.insert({
                createdAt: new Date(),
                ventaId: datos.ventaId,
                negocioId: negocioId
            });
        }
    } else {
        Boletas.insert({
                createdAt: new Date(),
                ventaId: datos.ventaId,
                negocioId: negocioId
            });
    }

    
    

    var numeroDeBoleta = Boletas.find({negocioId: negocioId}).fetch().length;

    if (datos.numero === "") {
        var codificacion = Negocios.findOne({_id: negocioId}).codigo;
        
        Ventas.update({_id: datos.ventaId}, {
            $inc: {
                boleta: 1 
            }
        });

        //var numeroFactura = Ventas.findOne({_id: datos.ventaId}).factura;

        datos.numero = codificacion + numeroDeBoleta;
    } 

    Ventas.update({_id: datos.ventaId}, {
        $set: {
            emision: datos.emision,
            numero: datos.numero,
            observaciones: datos.observaciones,
            clienteId: clienteId 
        }
    });
    
    var bootstrap = Assets.getText('styles.css');
    var css = Assets.getText('custom.css');  

    SSR.compileTemplate('layoutb', Assets.getText('layoutb.html'));

    Template.layoutb.helpers({
        getDocType: function() {
            return "<!DOCTYPE html>";
        }
    });

    SSR.compileTemplate('boleta', Assets.getText('boleta.html'));
    
    var items = VentasItem.find({ventaId: datos.ventaId});

    let total = 0;

    items.forEach(function (index) {
        total = total + index.valor;
    });

    var data = {
        items: items,
        negocio: Negocios.findOne({_id: negocioId}).nombre,
        direccionc: datos.direccion,
        cliente: datos.cliente,
        emision: datos.emision,
        numero: datos.numero,
        observaciones: datos.observaciones,
        total: total.toFixed(2),
        ruce: Negocios.findOne({_id: negocioId}).ruc,
        direccion: Negocios.findOne({_id: negocioId}).direccion,
        provincia: Negocios.findOne({_id: negocioId}).provincia,
        departamento: Negocios.findOne({_id: negocioId}).departamento,

    }

    var html_string = SSR.render('layoutb', {
        css: css,
        bootstrap: bootstrap,
        template: "boleta",
        data: data
    });

    var options = {
        "paperSize": {
            "format": "Letter",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };

    console.log("Conectando webshot...");
    
    webshot(html_string, fileName, options, function(err) {

        fs.readFile(fileName, function (err, data) {
            
            if (err) {
                return console.log(err);
            }
 
            fs.unlinkSync(fileName);
            fut.return(data);
 
        });

    });
      
    let pdfData = fut.wait();
    let base64String = new Buffer(pdfData).toString('base64');
 
    return base64String;

    },
    'exportarBoleta': function(ventaId) {
        check( ventaId, String);
 
    // SETUP
    // Grab required packages
    var webshot = Meteor.npmRequire('webshot');
    var fs      = Npm.require('fs');
    var Future = Npm.require('fibers/future');
 
    var fut = new Future();
    var fileName = "boleta.pdf";

    let negocioId = Meteor.users.findOne({_id: this.userId}).profile.negocioId;


    let venta = Ventas.findOne({_id: ventaId});
    console.log(venta.clienteId);
    let cliente = Clientes.findOne({_id: venta.clienteId});

    console.log(cliente);

    
    var bootstrap = Assets.getText('styles.css');
    var css = Assets.getText('custom.css');  

    SSR.compileTemplate('layoutb', Assets.getText('layoutb.html'));

    Template.layoutb.helpers({
        getDocType: function() {
            return "<!DOCTYPE html>";
        }
    });

    SSR.compileTemplate('boleta', Assets.getText('boleta.html'));
    
    var items = VentasItem.find({ventaId: ventaId});

    let total = 0;

    items.forEach(function (index) {
        total = total + index.valor;
    });

    var direccion = cliente.direccion

    if (direccion === undefined) {
        direccion = "-"
    } 

    var data = {
        items: items,
        negocio: Negocios.findOne({_id: negocioId}).nombre,
        direccionc: direccion,
        cliente: cliente.nombre,
        emision: venta.emision,
        numero: venta.numero,
        observaciones: venta.observaciones,
        total: total.toFixed(2),
        ruce: Negocios.findOne({_id: negocioId}).ruc,
        direccion: Negocios.findOne({_id: negocioId}).direccion,
        provincia: Negocios.findOne({_id: negocioId}).provincia,
        departamento: Negocios.findOne({_id: negocioId}).departamento,

    }

    var html_string = SSR.render('layoutb', {
        css: css,
        bootstrap: bootstrap,
        template: "boleta",
        data: data
    });

    var options = {
        "paperSize": {
            "format": "Letter",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };

    console.log("Conectando webshot...");
    
    webshot(html_string, fileName, options, function(err) {

        fs.readFile(fileName, function (err, data) {
            
            if (err) {
                return console.log(err);
            }
 
            fs.unlinkSync(fileName);
            fut.return(data);
 
        });

    });
      
    let pdfData = fut.wait();
    let base64String = new Buffer(pdfData).toString('base64');
 
    return base64String;

    }


});