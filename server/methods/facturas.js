Meteor.methods({
	'crearFactura': function() {
 
 
      // SETUP
      // Grab required packages
      	var webshot = Meteor.npmRequire('webshot');
      	var fs      = Npm.require('fs');
      	var Future = Npm.require('fibers/future');
 
    	var fut = new Future();


    	var fileName = "factura.pdf";

    	var options = {
  			"paperSize": {
     			"format": "Letter",
     			"orientation": "portrait",
     			"margin": "1cm"
   			},
   			siteType: 'html'
		};
 
      // GENERATE HTML STRING
     /* var css = Assets.getText('bootstrap.min.css');
 
      SSR.compileTemplate('layout', Assets.getText('layout.html'));
 
      Template.layout.helpers({
        getDocType: function() {
          return "<!DOCTYPE html>";
        }
      });
 
      SSR.compileTemplate('factura', Assets.getText('factura.html'));
 
      // PREPARE DATA
      var factura = Pokemon.find({});
      var data = {
        productos: prodductos,
        negocio: negocios,
		numero: numero,
		direccion: direccion
      }
 
      var html_string = SSR.render('layout', {
        css: css,
        template: "factura",
        data: data
      });
 
      console.log(html_string);

	console.log("Commencing webshot...");
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
      */
    
 
  }
});