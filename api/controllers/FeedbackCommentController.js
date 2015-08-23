/**
 * FeedbackCommentController
 *
 * @description :: Server-side logic for managing Feedbackcomments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
		res.badRequest('Error');
	},

	byFeedbackAlias: function(req, res) {
		var _alias = req.params.id || '';
		if (!_alias) return res.badRequest('Error');

		FeedbackComment.find({ where : {feedback_post: _alias}, sort: { createdAt: -1 } }).populate('user').exec(function(err, models) {
			if (err) return res.badRequest('Error');

			// Remove author info
			if (Array.isArray(models)) {
				models.map(function(row) {
					if (row.hideMe) row.user = {};

					return row;
				})
			}

			return res.json(models);
		});
	},
};

