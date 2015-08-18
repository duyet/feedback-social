/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findFromAlias: function(req, res) {
		var _alias = req.params.id + '/' || '';
		console.log(_alias);
		Post.findOne({alias: _alias}, function(err, model) {
			if (err || !model) return res.json(404, {});
			
			return res.json(model);
		});
	},
};

