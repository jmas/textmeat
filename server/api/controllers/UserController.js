/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  me: function(req, res) {
    var find,
        params = req.params.all();

      find = User
      .findOne({
        email: 'jmas@yandex.ua'
      });

    if (params.populate instanceof Array) {
      params.populate.forEach(function(item) {
        find.populate(item.toString());
      });

      delete params.populate;
    }

    find
      .exec(function(err, model) {
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

    if (params.populate instanceof Array) {
      params.populate.forEach(function(item) {
        find.populate(item.toString());
      });

      delete params.populate;
    }

    find
      .where(params)
      .sort({ 'createdAt': -1 })
      .exec(function(err, models) {
        if (err) { return res.json({ error: err }, 500); }

        res.json(models);
      });
  },

  read: function(req, res) {
    var params = req.params.all();

    if (! params.id) {
      return res.json({ error: 'Require id.' }, 500);
    }

     User
      .findOne()
      .where({
        id: params.id
      })
      .populate('readers')
      .exec(function(err, model) {
        if (err) return res.json({ error: err }, 500);
        
        req.sessionUser.reading.add(model.id);

        req.sessionUser.save(function(err) {
          if (err) return res.json({ error: err }, 500);

          res.json(model);
        });
      });
  },

  unread: function(req, res) {

  }
};
