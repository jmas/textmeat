define([
  'backbone',
  'common',
  'moment'
], function(Backbone, common) {

  var Model = Backbone.Model.extend({
    urlRoot: common.getUrl('/topic'),
    url: function() {
      return common.getUrl('/topic/' + this.id)
    }
  });

  return Model;

});