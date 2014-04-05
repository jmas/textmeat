define(['backbone', 'models/user'], function(Backbone, User) {
  var App = Backbone.View.extend({
    initialize: function() {
      console.log( 'Wahoo!', User );
    }
  });

  return App;
});