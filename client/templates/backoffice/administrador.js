Template.administrador.onRendered(function () {
	
});

Template.administrador.helpers({
	negocio: function () {
		const userId = Meteor.userId();
		const negocio = Meteor.users.find({_id: userId}).emails.address;
		return negocio;
	}
});

Template.administrador.events({
	
});