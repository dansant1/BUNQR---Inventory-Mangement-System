

Template.login.events({
 	'submit form': ( event, template ) => {

 		event.preventDefault();

 		let user = {
    		email: template.find( '[name="emailAddress"]' ).value,
   			password: template.find( '[name="password"]' ).value
  		};

  		Meteor.loginWithPassword(user.email, user.password, ( error ) => {
    		if ( error ) {
    			if (error.reason == 'User not found') {
    				Bert.alert( 'Usuario no encontrado', 'warning' );
    			} else if (error.reason == 'Match failed') {
    				Bert.alert( 'Ingresa los datos correctamente', 'warning' );
    			} else if (error.reason == 'Incorrect password') {
    				Bert.alert( 'Ingresa tu contraseña correctamente', 'warning' );
    			} else {
    				Bert.alert( 'Hubo un error interno, porfavor vuelve a intentarlo', 'warning' );
    			}

    		} else {

            let negocioId = Meteor.user().profile.negocioId;

        		Meteor.call('crearReporte', negocioId, function (error, result) {
        			if (error) {
        				console.log(error.reason);
        			} else {
        				let id = result._id

        				FlowRouter.go('/dashboard/' + id + '/r/' + negocioId);
        			}
        		});

    		}
    	});
 	}
});
