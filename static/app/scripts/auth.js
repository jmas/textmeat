define([
  'backbone',
  'underscore',
  'common',
  'models/user'
], function(Backbone, _, common, User) {

  var Auth = {
    user: new User
  };

  _.extend(Auth, Backbone.Events);

  Auth.init = function() {
    var me=this;

    me.user.on('change', function() {
      me.trigger('change');
    });
  };

  Auth.update = function(next) {
    this.user.fetch();
  };

  Auth.isLogged = function() {
    return true;
  };

  Auth.init();

  return Auth;
});