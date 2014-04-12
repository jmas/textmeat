var Auth = {};

Auth.model = null;

Auth.init = function(cb) {
  var me=this;

  User
    .findOne({
      email: 'jmas@yandex.ru'
    })
    .exec(function(err, model) {
      if (err) {
        return cb(false);
      }

      me.model = model;

      cb();
    });
};

Auth.getUser = function() {

  return this.model;

};

module.exports = Auth;