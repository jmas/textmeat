define(['backbone', 'models/user'], function(Backbone, User) {

var Users = Backbone.Collection.extend({
  url: function() {
    return window.app.getBaseUrl() + '/user'
  },
  model: User
});

return Users;

});

