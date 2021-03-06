/**
 * RecordController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  
  find: function(req, res) {
    var params = req.params.all();

    for (var k in params) if (params.hasOwnProperty(k)) {
      if (params[k] === undefined) {
        delete params[k];
      }
    }

    if (params.or) {
      params.or = JSON.parse(params.or);
    }

    var find = Record
      .find()
      .where(params)
      .populate('user');

    if (req.query.limit) {
      find = find.limit(req.query.limit);
    }

    if (req.query.skip) {
      find = find.skip(req.query.skip);
    }

    find
      .sort({ 'createdAt': -1 })
      .exec(function(err, models) {
        if (err) { return res.json({ error: err.toString() }, 500); }

        res.json(models);
      });
  },

  reading: function(req, res) {
    var find,
      readingUsers = [];

    find = Record.find();

    if (req.query.limit) {
      find = find.limit(req.query.limit);
    }

    if (req.query.skip) {
      find = find.skip(req.query.skip);
    }

    console.log(req.sessionUser);

    // req.sessionUser.populate('reading').exec(function() {
    //   console.log('success');
    // });

    // req.sessionUser.reading.forEach(function(model) {
    //   console.log(model);

    //   //readingUsers.push(model.id);
    // });

    // console.log(readingUsers);

    find
      .where({
        user: ['532b5ea60555250b22b08fef']
      })
      .populate('user')
      .sort({ 'createdAt': -1 })
      .exec(function(err, models) {
        if (err) { return res.json({ error: err.toString() }, 500); }

        res.json(models);
      });
  }
};
