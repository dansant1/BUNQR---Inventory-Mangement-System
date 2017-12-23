
Template.signup.events({
	'submit form': ( event, template ) => {
		event.preventDefault();

		let user = {
    		email: template.find( '[name="emailAddress"]' ).value,
    		password: template.find( '[name="password"]' ).value,
   			profile: {
   				nombre: template.find( '[name="nombre"]' ).value,
   				apellido: template.find( '[name="apellido"]' ).value,
                empresa: template.find( '[name="empresa"]' ).value
   			},
				opcion: 1
  		};

        if (user.profile.nombre !== "" && user.profile.apellido !== "" && user.profile.empresa !== "") {
            Meteor.call('crearUsuario', user, function (err, result) {
                if ( err ) {
                    Bert.alert( err.reason, 'warning' );
                } else {
                    Bert.alert( '¡Bienvenido!', 'success' );
                    FlowRouter.go('/dashboard')
                }
            });
        }


	}
});

Template.signupReferido.events({
    'submit form': function (event, template) {
        event.preventDefault();

        let user = {
            email: template.find( '[name="emailAddress"]' ).value,
            password: template.find( '[name="password"]' ).value,
            profile: {
                nombre: template.find( '[name="nombre"]' ).value,
                apellido: template.find( '[name="apellido"]' ).value,
                empresa: template.find( '[name="empresa"]' ).value,
                distribuidorId: FlowRouter.getParam('distribuidorId')
            }
        };

        if (user.profile.nombre !== "" && user.profile.apellido !== "" && user.profile.empresa !== "") {
            Meteor.call('crearUsuarioReferido', user, function (err, result) {
                if ( err ) {
                    Bert.alert( err.reason, 'warning' );
                } else {
                    Bert.alert( '¡Bienvenido!', 'success' );
                    FlowRouter.go('/dashboard')
                }
            });
        }
    }
});
