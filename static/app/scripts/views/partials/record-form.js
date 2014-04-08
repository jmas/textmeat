define([
  'backbone',
  'underscore',
  'jquery',
  'models/record',
  'text!templates/partials/record-form.html',
  'jqueryui'
], function(Backbone, _, $, Record, tpl) {
  
  var View = Backbone.View.extend({
    model: new Record,
    template: _.template(tpl),
    messageEl: null,

    events: {
      'keyup [data-message-el]': 'onMessageKeyup'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      var me=this;

      this.$el.html(this.template({
        model: this.model
      }));

      this.messageEl = this.$el.find('[data-message-el]');

      this.$el.dialog({
        autoOpen: false,
        modal: true,
        buttons: [
          {
            text: 'Add',
            click: function() {
              me.save();
              $(this).dialog('close');
            }
          }
        ]
      });
    },

    show: function() {
      this.$el.dialog('open');
    },

    hide: function() {
      this.$el.dialog('close');
    },

    onMessageKeyup: function() {
      this.model.set('message', this.messageEl.val())
    },

    save: function() {
      this.model.save();
    }
  });

  return View;
});