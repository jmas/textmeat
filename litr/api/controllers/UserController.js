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

module.exports = {
  
  index: function(req, res) {
    User.findOne({ id: req.session.user }, function(err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);
      
      return res.view({
        user: user
      });
    });
  },
  
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

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};