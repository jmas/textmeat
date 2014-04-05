define([
  'backbone',
  'common',
  'models/record'
], function(Backbone, common, Record) {

  var Records = Backbone.Collection.extend({
    urlRoot: common.getUrl('/record'),
    url: common.getUrl('/record'),
    model: Record
  });

  return Records;

});