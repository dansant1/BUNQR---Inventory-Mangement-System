Template.logout.events({
	'click .logout': function () {
		Meteor.logout();
		FlowRouter.go('/login');
	}
});