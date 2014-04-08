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
      .sort({ 'createdAt': 'desc' })
      .exec(function(err, models) {
        if (err) { return res.json({ error: err.toString() }, 500); }

        res.json(models);
      });
  }
};
