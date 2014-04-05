define([
  'backbone',
  'underscore',
  'jquery',
  'auth',
  'models/user',
  'views/home',
  'views/user',
  'views/record',
  'views/topic',
  'text!templates/app.html'
], function(Backbone, _, $, auth, User, HomeView, UserView, RecordView, TopicView, appTpl) {

  var App = Backbone.View.extend({
    el: $('#appView'),
    navEl: null, 
    navUserBtn: null,
    template: _.template(appTpl),
    pages: {},
    userModel: new User,

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

      this.pages.home = new HomeView({ el: $('#homeView') });
      this.pages.user = new UserView({ el: $('#userView') });
      this.pages.record = new RecordView({ el: $('#recordView') });
      this.pages.topic = new TopicView({ el: $('#topicView') });

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
    }
  });

  return App;
});