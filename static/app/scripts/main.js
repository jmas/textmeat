require.config({
  paths: {
    'jquery':     'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone':   'vendor/backbone-amd/backbone',
    'text':       'vendor/requirejs-text/text',
    'moment':     'vendor/momentjs/moment'
  },
  urlArgs: "bust=" + (new Date()).getTime()
});

require([
  'auth',
  'router',
  'views/app'
], function(auth, router, AppView) {

  window.appView = new AppView;

  // Auth init
  auth.update();

  // Route init
  router.on('route', function(id) {
    window.appView.showPage(id);
  });

  Backbone.history.start();

  // router.navigate('record', true);
});