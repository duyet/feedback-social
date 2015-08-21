/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing Feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findFromAlias: function(req, res) {
		var _alias = req.params.id || '';
		Feedbacks.findOne({alias: _alias}, function(err, model) {
			if (err || !model) return res.json(404, {});
			
			return res.json(model);
		});
	},

	lite: function(req, res) {
		Feedbacks.find({}, function(err, models) {
			if (err || !models) return res.json(401, []);
			
			return res.json(models);
		});
	},
};

