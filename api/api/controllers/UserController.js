/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  me: function(req, res) {
    User.findOne({ email: 'jmas@yandex.ru' }).exec(function(err, model) {
      if (err) { return res.json({ error: err }, 500); }
      if (! model) { return res.json({ error: 'not found' }, 404); }
      
      res.json(model);
    });
  },

  find: function(req, res) {
    var params = req.params.all(),
        find;

    for (var k in params) if (params.hasOwnProperty(k)) {
      if (params[k] === undefined) {
        delete params[k];
      }
    }

    if (req.params.id) {
      find = User
        .findOne();
    } else {
      find = User
        .find();
    }

    find
      .where(params)
      .sort({ 'createdAt': 'desc' })
      .exec(function(err, models) {
        if (err) { return res.json({ error: err.toString() }, 500); }

        res.json(models);
      });
  }
};
