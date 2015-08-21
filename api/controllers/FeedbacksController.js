/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing Feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findFromAlias: function(req, res) {
		var _alias = req.params.id || '';
		console.log(_alias);
		Feedbacks.findOne({alias: _alias}, function(err, model) {
			if (err || !model) return res.json(404, {});
			
			return res.json(model);
		});
	},
};

