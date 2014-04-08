/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  me: function(req, res) {
    User.findOne(1).exec(function(err, model) {
      if (err) { return res.json({ error: err }, 500); }
      if (! model) { return res.json({ error: 'not found' }, 404); }
      
      model.cryptedEmail = model.cryptedEmail();
      res.json(model);
    });
  }
};
