Template.topbar.events({
	
	'click .nuevo-1': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/ingresos');
	},
	'click .nuevo-2': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/almacenes/salidas');
	},
	'click .nuevo-3': function () {
		FlowRouter.go('/dashboard/' + FlowRouter.getParam('negocioid') + '/registros/proformas');
	},
	'click .nuevo-4': function () {

	},
	'click .nuevo-5': function () {

	},
	'click .nuevo-6': function () {

	},
	'click .nuevo-7': function () {

	},
	'click .nuevo-8': function () {

	},
	'click .nuevo-9': function () {

	},
});

Template.topbar.onCreated(function () {
	var self = this;

	self.autorun(function() {
    	var postId = FlowRouter.getParam('postId');
    	self.subscribe('users');  
  	});
});

Template.topbar.helpers({
	nombre: function () {
		return Meteor.users.findOne({});
	}
});