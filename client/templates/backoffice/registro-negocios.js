Template.registroNegocios.events({
	'submit form': function (event, template) {
		event.preventDefault();

 		let datos = {
    		empresa: template.find( '[name="empresa"]' ).value,
   			descripcion: template.find( '[name="descripcion"]' ).value
  		};

  		Meteor.call('registrarEmpresa', datos, function (err, result) {
  			if (err) {
  				Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
  			} else {
  				Bert.alert( 'Creaste una nueva empresa :=)', 'success' );
  				FlowRouter.go('dashboard');
  			}
  		});
	}
});