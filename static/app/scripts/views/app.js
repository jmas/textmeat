define([
  'backbone',
  'underscore',
  'jquery',
  'auth',
  'collections',
  'models/user',
  'models/record',
  'views/home',
  'views/user',
  'views/record',
  'views/topic/index',
  'views/topic/view',
  'views/partials/record-form',
  'text!templates/app.html'
], function(Backbone, _, $, auth, collections, User, Record, HomeView, UserView, RecordView, TopicIndexView, TopicView, RecordFormView, appTpl) {

  var App = Backbone.View.extend({
    el: $('#appView'),
    navEl: null, 
    navUserBtn: null,
    template: _.template(appTpl),
    pages: {},
    userModel: new User,
    recordForm: null,

    events: {
      'click #appNavAddBtn': 'openAddDialog'
    },

    initialize: function() {
      var me=this;

      this.render();

      this.userModel.on('change', function() {
        me.navUserBtn.html(this.get('name'));
      });

      this.userModel.fetch();
    },

    render: function() {
      this.$el.html(this.template());

      this.pages.home = new HomeView({ el: $('#homePage') });
      this.pages.user = new UserView({ el: $('#userPage') });
      this.pages.record = new RecordView({ el: $('#recordPage') });
      this.pages.topic = new TopicIndexView({ el: $('#topicPage') });
      this.pages.topicView = new TopicView({ el: $('#topicViewPage') });

      this.navEl = this.$el.find('#appNav');
      this.navUserBtn = this.$el.find('#appNavUserBtn');

      this.hideAllPages();
    },

    showPage: function(id) {
      var me=this;
      
      this.hideAllPages();

      _.map(this.pages, function(item, key) {
        if (id == key) {
          item.show();
          me.navEl.find('[data-item="' + key + '"]').addClass('active');
        }
      });
    },

    hideAllPages: function() {
      this.navEl.find('[data-item]').removeClass('active');

      _.map(this.pages, function(item) {
        item.hide();
      });
    },

    openAddDialog: function() {
      var model = new Record;

      model.set('user', auth.user.get('id'));

      model.on('sync', function() {
        collections.userRecords.add([ model ]);
        collections.userRecords.fetch();
        collections.records.fetch();
      });

      this.recordForm = new RecordFormView({ model: model });
      this.recordForm.show();
      return false;
    }
  });

  return App;
});