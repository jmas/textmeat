define([
  'backbone',
  'common',
  'models/topic'
], function(Backbone, common, User) {

  var Users = Backbone.Collection.extend({
    urlRoot: common.getUrl('/topic'),
    url: common.getUrl('/topic'),
    model: User
  });

  return Users;

});