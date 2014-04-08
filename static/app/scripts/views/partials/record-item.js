define([
  'backbone',
  'underscore',
  'jquery',
  'views/partials/attachment',
  'text!templates/partials/record-item.html'
], function(Backbone, _, $, AttachmentView, tpl) {
  
  var View = Backbone.View.extend({
    model: null,
    template: _.template(tpl),
    attachmentEl: null,
    attachmentView: null,

    initialize: function() {
      this.render();
    },

    render: function() {
      var me=this;

      this.$el.html(this.template({ model: this.model }));

      this.attachmentEl = this.$el.find('[data-attachment-el]');

      setTimeout(function() {
        me.attachmentView = new AttachmentView({
          el: me.attachmentEl,
          model: me.model
        });
      }, 1);
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