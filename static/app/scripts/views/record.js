define([
  'backbone',
  'underscore',
  'jquery',
  'common',
  'collections',
  'views/partials/record-item',
  'text!templates/record/index.html',
  'jquery-debounce'
], function(Backbone, _, $, common, collections, RecordItemView, tpl) {
  
  var View = Backbone.View.extend({
    template: _.template(tpl),
    feedListEl: null,
    limit: 15,
    currentPage: 0,
    isLoading: false,

    initialize: function() {
      var me=this;

      this.render();

      collections.records.on('add', function(model) {
        me.addOne(model);
        me.isLoading = false;
      });
      
      this.isLoading = true;
      collections.records.fetch({
        url: common.getUrl('/record/reading'),
        data: {
          limit: this.limit
        }
      });

      this.handleScroll();
    },

    handleScroll: function() {
      var me=this,
          feedOffsetTop=me.feedListEl.offset().top,
          win=$(window),
          winHeight,
          feedListHeight;
      
      win.scroll($.throttle(function() {
        if (! me.isLoading && me.$el.is(':visible')) {
          feedListHeight = me.feedListEl.height();
          winHeight=win.height(),
          me.isLoading=false;

          if (feedOffsetTop + feedListHeight - winHeight * 2 < win.scrollTop()) {
            me.currentPage++;
            me.isLoading = true;

            collections.records.fetch({
              url: common.getUrl('/record/reading'),
              data: {
                limit: me.limit,
                skip: me.currentPage * me.limit
              }
            });

            console.log('fetch!');
          }
        }
      }, 50));
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