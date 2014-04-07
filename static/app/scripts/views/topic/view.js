define([
  'backbone',
  'underscore',
  'jquery',
  'router',
  'collections',
  'models/topic',
  'views/partials/record-item',
  'text!templates/topic/view.html',
  'text!templates/partials/summary.html'
], function(Backbone, _, $, router, collections, Topic, ItemView, tpl, summaryTpl) {
  
  var View = Backbone.View.extend({
    model: new Topic,
    collection: collections.topicRecords,
    template: _.template(tpl),
    summaryTpl: _.template(summaryTpl),
    listEl: null,
    summaryEl: null,

    initialize: function() {
      var me=this;

      this.render();

      this.model.on('change:id', function() {
        me.collection.fetch();
      });

      this.model.on('change', function() {
        me.renderSummary();
      });

       this.collection.on('sync', function() {
        me.addAll(me.collection.models);
      });

      router.on('route:topicView', function(id) {
        if (id && (! me.model.get('id') || me.model.get('id') != id)) {
          me.model.clear();
          me.model.set({ id: id });
          me.model.fetch();
        }
      });
    },

    renderSummary: function() {
      console.log(this.summaryEl);
      this.summaryEl.html(this.summaryTpl({ model: this.model }));
    },

    render: function() {
      this.$el.html(this.template());

      this.listEl = this.$el.find('[data-list-el]');
      this.summaryEl = this.$el.find('[data-summary-el]');

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