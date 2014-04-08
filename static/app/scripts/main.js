require.config({
  paths: {
    'underscore':      'vendor/underscore-amd/underscore',
    'backbone':        'vendor/backbone-amd/backbone',
    'text':            'vendor/requirejs-text/text',
    'moment':          'vendor/momentjs/moment',
    'nprogress':       'vendor/nprogress/nprogress',
    'jquery':          'vendor/jquery/dist/jquery',
    'jqueryui':        'vendor/jqueryui/ui/minified/jquery-ui.min',
    'jquery-debounce': 'vendor/bower-jquery-debounce/jquery.debounce'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'jqueryui': {
      deps: ['jquery'],
      exports: '$'
    },
    'jquery-debounce': {
      deps: ['jquery'],
      exports: '$'
    }
  },
  urlArgs: "bust=" + (new Date()).getTime()
});

require([
  'backbone',
  'underscore',
  'jquery',
  'auth',
  'router',
  'views/app',
  'nprogress',
  'helpers'
], function(Backbone, _, $, auth, router, AppView, NProgress, helpers) {
  _.helpers = helpers;

  Backbone.ajax = $.ajax;

  NProgress.configure({ showSpinner: false });

  // var finishLoadingTimer;
  var isLoaderStarted = false;
  var countAjaxs = 0;
  var tryFinishLoading = function() {
    if (! isLoaderStarted) {
      NProgress.start();
      isLoaderStarted = true;
    }

    if (countAjaxs > 0) { 
      NProgress.set(1 / countAjaxs);
    } else {
      NProgress.done();
      isLoaderStarted = false;
    }
    
    // clearTimeout(finishLoadingTimer);
    // setTimeout(function() {
    //   NProgress.done();
    //   isLoaderStarted = false;
    //   console.log('done');
    // }, 400);
  };

  $(document).ajaxStart(function() {
    countAjaxs++;
    tryFinishLoading();
  });

  $(document).ajaxStop(function() {
    countAjaxs--;
    tryFinishLoading();
  });

  // NProgress.start();
  // NProgress.set(0.4);
  // $(document).on('page:fetch',   function() { NProgress.start(); });
  // $(document).on('page:change',  function() { NProgress.done(); });
  // $(document).on('page:restore', function() { NProgress.remove(); });

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