Template.menuNegocios.events({
	'click .logout': function () {
		Meteor.logout();
		Bert.alert( 'Nos vemos luego :=)', 'success' );
	}
});