/**
 * TopicController
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
    var readingTopics = [];

    if (!req.session.user) {
      return res.json({ error: 'user is not logged in' }, 500);
    }
    
    User.findOne(req.session.user)
      .populate('readingTopics')
      .exec(function(err, user) {
        if (err) return res.json({ error: err.toString() }, 500);

        console.log('RT:', user);

        if (user.readingTopics) {
          _.each(user.readingTopics, function(item) {
            readingTopics.push(item.id);
          });
        }

        Topic.find()
          .sort({'readersCount': -1, 'recordsCount': -1, 'createdAt': 1})
          .exec(function(err, items) {
            if (err) return res.json({ error: err.toString() }, 500);

            return res.view({
              items: items,
              readingTopics: readingTopics
            });
          });
      });
  },

  view: function(req, res) {
    if (! req.query.id && ! req.query.name) {
      return res.json({ error: 'param id or name is required' }, 500);
    }

    var id = req.query.id,
        name = req.query.name,
        where;

    if (id) {
      where = { id: id };
    } else {
      where = { name: name };
    }

    Topic
      .findOne()
      .where(where)
      .exec(function(err, model) {
        if (err) return res.json({ error: err.toString() }, 500);

        return res.view({
          model: model
        });
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

        Topic.findOne(id)
          .populate('readers')
          .exec(function(err, topic) {
            if (err) return res.json({ error: err.toString() }, 500);

            user.readingTopics.add(id);
            user.readingCount = user.readingTopics.length + 1;
            topic.readersCount = topic.readers.length + 1;

            user.save(function(err, model) {
              if (err) return res.json({ error: err.toString() }, 500);

              topic.save(function(err, topic) {
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

        Topic.findOne(id)
          .populate('readers')
          .exec(function(err, topic) {
            if (err) return res.json({ error: err.toString() }, 500);

            user.readingTopics.remove(id);
            user.readingCount = user.readingTopics.length - 1;
            topic.readersCount = topic.readers.length - 1;

            user.save(function(err, model) {
              if (err) return res.json({ error: err.toString() }, 500);

              topic.save(function(err, topic) {
                return res.json(model);
              });
            });
          });
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TopicController)
   */
  _config: {}

  
};
