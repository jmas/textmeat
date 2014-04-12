define([
  'backbone',
  'underscore',
  'jquery',
  'text!templates/partials/attachment.html'
], function(Backbone, _, $, tpl) {
  
  var View = Backbone.View.extend({
    model: null,
    template: _.template(tpl),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template({ model: this.model }));
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