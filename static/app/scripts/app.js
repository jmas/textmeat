define(['collections/users'], function(Users) {
  var App = {
  	c: {}
  };

  App.getBaseUrl = function() {
  	return 'http://localhost:1337';
  };

  App.c.users = new Users;

  return App;
});