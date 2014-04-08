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
  }
};
