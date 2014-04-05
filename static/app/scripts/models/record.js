define([
  'backbone',
  'common',
  'moment'
], function(Backbone, common) {

  var Record = Backbone.Model.extend({
    urlRoot: common.getUrl('/record'),
    url: common.getUrl('/record'),
    createdAtFromNow: function() {
      return moment(this.get('createdAt')).fromNow();
    }
  });

  return Record;

});