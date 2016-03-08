Template.negocios.onCreated(function() {
	var tu = this;
	tu.autorun(function() {
    	tu.subscribe('negocios'); 
    	 
  	});
});

Template.negocios.helpers({
	negocios: function () {
		return Negocios.find().fetch();
	},
	hayNegocios: function () {
		if (Negocios.find().count() === 0) {
			return false;
		} else {
			return true;
		}
	}
});


Template.negocios.events({
	'click .item-negocio': function (event, template) {
		
		event.preventDefault();

		var negocioId = this._id;

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