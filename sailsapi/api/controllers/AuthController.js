/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
	login: function(req, res) {
		User.findOne(1).exec(function(err, model) {
			if (err) { res.json({ error: err }, 500); }

			res.json(model);
		})
	},

	logout: function(req, res) {
		res.json({ success: true });
	}

};
