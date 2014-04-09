define([
  'backbone',
  'underscore',
  'jquery',
  'models/user',
  'auth',
  'router',
  'collections',
  'views/partials/record-item',
  'text!templates/user/index.html',
  'text!templates/partials/summary.html'
], function(Backbone, _, $, User, auth, router, collections, RecordItemView, tpl, summaryTpl) {
  
  var View = Backbone.View.extend({
    model: new User,
    template: _.template(tpl),
    summaryTpl: _.template(summaryTpl),
    recordsListEl: null,
    summaryEl: null,

    initialize: function() {
      var me=this;

      this.render();

      this.model.on('change', function() {
        me.renderSummary();
        // collections.userRecords.reset();
        collections.userRecords.fetch({
          data: {
            user: me.model.get('id'),
            limit: 15
          }
        });
      });

      collections.userRecords.on('sync', function() {
        me.renderRecords();
      });

      router.on('route:user', function(id) {
        id = id || auth.user.get('id');

        if (! me.model.get('id') || me.model.get('id') != id) {
          me.clear();
          me.model.clear();
          me.model.set('id', id);
          me.model.fetch();
        }
      });
    },

    render: function() {
      this.$el.html(this.template());

      this.recordsListEl = this.$el.find('[data-user-records-list-el]');
      this.summaryEl = this.$el.find('[data-user-summary-el]');
    },

    renderSummary: function() {
      this.summaryEl.html(this.summaryTpl({ model: this.model }));
    },

    renderRecords: function() {
      var me=this;

      this.recordsListEl.html('');
      _.map(collections.userRecords.models, function(item) {
        me.addOneRecord(item);
      });
    },

    addOneRecord: function(model) {
      var view = new RecordItemView({ model: model });
      view.render();

      this.recordsListEl.append(view.$el);
    },

    clear: function()
    {
      this.summaryEl.html('');
      this.recordsListEl.html('');
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