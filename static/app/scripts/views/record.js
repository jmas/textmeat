define([
  'backbone',
  'underscore',
  'jquery',
  'collections',
  'views/partials/record-item',
  'text!templates/record/index.html'
], function(Backbone, _, $, collections, RecordItemView, tpl) {
  
  var View = Backbone.View.extend({
    template: _.template(tpl),
    feedListEl: null,

    initialize: function() {
      var me=this;

      this.render();

      collections.records.on('add', function(model) {
        me.addOne(model);
      });
      collections.records.fetch();
    },

    render: function() {
      this.$el.html(this.template());

      this.feedListEl = this.$el.find('#recordFeedList');
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

    addOne: function(model) {
      var view = new RecordItemView({model: model});
      view.render();
      
      this.feedListEl.append(view.$el);
    }
  });

  return View;
});