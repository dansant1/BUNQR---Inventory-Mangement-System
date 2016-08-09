Template.crearUsuario.events({
  'click .agregar': ( event, template ) => {
    event.preventDefault();

    let user = {
        email: template.find( '[name="email"]' ).value,
        password: template.find( '[name="password"]' ).value,
        profile: {
          nombre: template.find( '[name="nombre"]' ).value,
          apellido: template.find( '[name="apellido"]' ).value,
          distribuidorId: Meteor.userId()
        }
      };

      Meteor.call('crearUsuarioReferido', user, function (err, result) {
        if ( err ) {
            Bert.alert( err.reason, 'warning' );
          } else {
            Bert.alert( '¡Creaste un usuario!', 'success' );
            template.find( '[name="email"]' ).value     = "";
            template.find( '[name="password"]' ).value  = "";
            template.find( '[name="nombre"]' ).value    = "";
            template.find( '[name="apellido"]' ).value  = "";
        }
      });
  }
});


Template.crearCliente.events({
  'click .agregar': ( event, template ) => {
    event.preventDefault();

    let user = {
        email: template.find( '[name="email"]' ).value,
        password: template.find( '[name="password"]' ).value,
        profile: {
          nombre: template.find( '[name="nombre"]' ).value,
          apellido: template.find( '[name="apellido"]' ).value,
          distribuidorId: Meteor.userId()
        }
      };

      Meteor.call('crearUsuarioReferido', user, function (err, result) {
        if ( err ) {
            Bert.alert( err.reason, 'warning' );
          } else {
            Bert.alert( '¡Creaste un usuario!', 'success' );
            template.find( '[name="email"]' ).value     = "";
            template.find( '[name="password"]' ).value  = "";
            template.find( '[name="nombre"]' ).value    = "";
            template.find( '[name="apellido"]' ).value  = "";
        }
      });
  }
});


Template.crearDistribuidor.events({
  'click .agregar': ( event, template ) => {
    event.preventDefault();

    let user = {
        email: template.find( '[name="email"]' ).value,
        password: template.find( '[name="password"]' ).value,
        profile: {
          nombre: template.find( '[name="nombre"]' ).value,
          apellido: template.find( '[name="apellido"]' ).value
        }
      };

      Meteor.call('crearDistribuidor', user, function (err, result) {
        if ( err ) {
            Bert.alert( err.reason, 'warning' );
          } else {
            Bert.alert( '¡Creaste un distribuidor!', 'success' );
            template.find( '[name="email"]' ).value     = "";
            template.find( '[name="password"]' ).value  = "";
            template.find( '[name="nombre"]' ).value    = "";
            template.find( '[name="apellido"]' ).value  = "";
        }
      });
  }
});
