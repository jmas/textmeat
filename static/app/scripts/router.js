define([
    'backbone'
], function(Backbone) {

  var Router = Backbone.Router.extend({
    routes: {
      'home':       'home',
      'user':       'user',
      'user/:id':   'user',
      'record':     'record',
      'record/:id': 'record',
      'topic':      'topic',
      'topic/:id':  'topic'
    }
  });

  return new Router;

});