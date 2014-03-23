/**
 * UserController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var util = require("util");

var actionView = function(req, res) {
  var id = req.query.id || req.session.user;

  if (! id) {
    return res.json({ error: 'user not exists' }, 404);
  }

  User.findOne({ id: id })
    //.populate('records', { '$sort': {createdAt: -1} })
    // .sort({'records.createdAt': -1})
    .exec(function(err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);

      Record.find()
        .where({ user: id })
        .populate('user')
        .sort({'createdAt': -1})
        .exec(function(err, items) {
          console.log('err: ', JSON.stringify(err), items);

          if (err) return res.json({ error: 'DB error' }, 500);

          return res.view({
            user: user,
            records: items
          });
        });
    });
};

module.exports = {
  
  index: actionView,
  view: actionView,
  
  login: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.query.email).done(function (err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.query.password, user.password, function (err, match) {
          if (err) return res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            return res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            return res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        return res.json({ error: 'User not found' }, 404);
      }
    });
  },

  create: function(req, res) {
    User.create(req.query, function(err, user) {
      console.log(JSON.stringify(err));

      if (err) return res.json({ error: err.toString() }, 500);

      return res.json(user);
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
