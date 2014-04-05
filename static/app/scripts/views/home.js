define([
  'backbone',
  'underscore',
  'jquery',
  'text!templates/home/index.html',
], function(Backbone, _, $, tpl) {

  var View = Backbone.View.extend({
    template: _.template(tpl),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }
  });

  return View;
});