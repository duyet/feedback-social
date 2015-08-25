/**
 * FeedbackCommentController
 *
 * @description :: Server-side logic for managing Feedbackcomments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var sanitizeHtml = require('sanitize-html');

module.exports = {
	find: function(req, res) {
		res.badRequest('Error');
	},

	create: function(req, res) {
		var filterTag = function(html) {
			var html = html || '';
			
			return sanitizeHtml(html, {
				allowedTags: sails.config.settings.comment_allow_tags || [],
				selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
				exclusiveFilter: function(frame) {
					return !frame.text.trim();
				}
			});
		};
		
		var data = req.body;
		data.content = filterTag(data.content);

		FeedbackComment.create(data).exec(function(err, model) {
			if (err || !model) return res.badRequest('Error');
			
			return res.json(model);
		});
	},

	byFeedbackAlias: function(req, res) {
		var _alias = req.params.id || '';
		if (!_alias) return res.badRequest('Error');

		FeedbackComment.find({ where : {feedback_post: _alias, deleted: false}, sort: { createdAt: -1 } }).populate('user').exec(function(err, models) {
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

	delete: function(req, res) {
		if (!req.body || !req.body.user || !req.body.id) {
			return res.badRequest('Request error');
		}

		FeedbackComment.findOne({ where : {id: req.body.id, deleted: false, user: req.body.user}})
		.exec(function(err, model) {
			if (err) return res.badRequest('Error');

			model.deleted = true;
			model.save();

			return res.json(model);
		});
	}
};

