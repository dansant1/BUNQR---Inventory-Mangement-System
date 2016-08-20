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

    if (datos.numero === "") {
        datos.numero = Negocios.findOne({_id: negocioId}).codigo;
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

    }

});