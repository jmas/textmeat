define(['backbone'], function(Backbone, user) {

var User = Backbone.Model.extend({
	url: function() {
		return window.app.getBaseUrl() + '/user'
	}
});

return User;

});