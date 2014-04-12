define([
  'backbone',
  'common',
  'models/user'
], function(Backbone, common, User) {

  var Users = Backbone.Collection.extend({
    urlRoot: common.getUrl('/user'),
    url: common.getUrl('/user'),
    model: User
  });

  return Users;

});