/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  me: function(req, res) {
    User.findOne(1).exec(function(err, model) {
      if (err) { res.json({ error: err }, 500); }
      
      res.json(model);
    });
  }
};
