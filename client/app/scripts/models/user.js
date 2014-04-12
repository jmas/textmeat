define([
  'backbone',
  'common'
], function(Backbone, common, moment) {

  var User = Backbone.Model.extend({
    // urlRoot: common.getUrl('/user'),
    url: function() {
      return common.getUrl('/user/' + (this.get('id') ? this.get('id'): 'me'))
    }
  });

  return User;

});