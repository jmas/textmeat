require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
  },
  urlArgs: "bust=" + (new Date()).getTime()
});

require(['views/app', 'app'], function(AppView, App) {
  window.app = App;

  window.app.c.users.fetch();
  
  new AppView;
});