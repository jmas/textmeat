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

  function render(user, items, isRead) {
    return res.view({
      user: user,
      records: items,
      isRead: isRead
    });
  }

  function isIReadHim(user, id, next) {
    isRead = false;

    _.each(user.readers, function(item) {
      if (item.id === req.session.user) {
        isRead = true;
      }
    });

    next(isRead);
  }

  User.findOne(id)
    .populate('readers')
    .exec(function(err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);

      Record.find()
        .where({ user: id })
        .populate('user')
        .sort({'createdAt': -1})
        .exec(function(err, items) {
          console.log('err: ', JSON.stringify(err), items);

          if (err) return res.json({ error: 'DB error' }, 500);

          if (id == req.session.user) {
            return render(user, items, false);
          } else {
            isIReadHim(user, id, function(isRead) {
              return render(user, items, isRead);
            });
          }
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

  read: function(req, res) {
    if (!req.query.id) {
      return res.json({ error: 'param id is requred' }, 500);
    }

    var id = req.query.id;

    if (!req.session.user) {
      return res.json({ error: 'user is not logged in' }, 500);
    }

    User.findOne(req.session.user)
      .populate('reading')
      .exec(function(err, user) {
        if (err) return res.json({ error: err.toString() }, 500);

        User.findOne(id)
          .populate('readers')
          .exec(function(err, readUser) {
            if (err) return res.json({ error: err.toString() }, 500);

            user.reading.add(id);
            user.readingCount = user.reading.length + 1;
            readUser.readersCount = readUser.readers.length + 1;

            user.save(function(err, model) {
              if (err) return res.json({ error: err.toString() }, 500);

              readUser.save(function(err, readUser) {
                return res.json(model);
              });
            });
          });
      });
  },

  unread: function(req, res) {
    if (!req.query.id) {
      return res.json({ error: 'param id is requred' }, 500);
    }

    var id = req.query.id;

    if (!req.session.user) {
      return res.json({ error: 'user is not logged in' }, 500);
    }

    User.findOne(req.session.user)
      .populate('reading')
      .exec(function(err, user) {
        if (err) return res.json({ error: err.toString() }, 500);

        User.findOne(id)
          .populate('readers')
          .exec(function(err, readUser) {
            if (err) return res.json({ error: err.toString() }, 500);

            user.reading.remove(id);
            user.readingCount = user.reading.length - 1;
            readUser.readersCount = readUser.readers.length - 1;

            user.save(function(err, model) {
              if (err) return res.json({ error: err.toString() }, 500);

              readUser.save(function(err, readUser) {
                return res.json(model);
              });
            });
          });
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
