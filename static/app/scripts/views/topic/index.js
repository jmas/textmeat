define([
  'backbone',
  'underscore',
  'jquery',
  'collections',
  'views/partials/topic-item',
  'text!templates/topic/index.html'
], function(Backbone, _, $, collections, ItemView, tpl) {
  
  var View = Backbone.View.extend({
    collection: collections.topics,
    template: _.template(tpl),
    listEl: null,

    initialize: function() {
      var me=this;

      this.render();

      this.collection.on('sync', function() {
        me.addAll(me.collection.models);
      });

      this.collection.fetch({
        data: {
          limit: 30
        }
      });
    },

    render: function() {
      this.$el.html(this.template());

      this.listEl = this.$el.find('[data-list-el]');

      this.addAll();
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

    addAll: function(models) {
      var me=this;
      this.listEl.html('');

      _.map(models, function(item) {
        me.addOne(item);
      });
    },

    addOne: function(model) {
      var view = new ItemView({model: model});
      view.render();
      
      this.listEl.append(view.$el);
    }
  });

  return View;
});