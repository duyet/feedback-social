/**
 * FeedbackVoteController
 *
 * @description :: Server-side logic for managing Feedbackvotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne: function(req, res) {
		return res.forbidden({message: 'Access deny'});
	},

	find: function(req, res) {
		return res.forbidden({message: 'Access deny'});
	},

	vote: function(req, res) {
		var data = {};
		data.feedback_post = req.body.feedback_post || false;
		data.user = req.body.user || false;
		data.vote_type = req.body.vote_type || false;

		if (!data.feedback_post || !data.user || !data.vote_type) {
			console.log(data);
			return res.forbidden({message: 'Missing data'});
		}

		FeedbackVote.create(data).exec(function(err, model) {
			if (err || !model) {
				console.log(err);
				return res.forbidden();
			}

			return res.json(model);
		});
	},

	counter: function(req, res) {
		var id = req.params.id;

		// TODO: Fix that by using groupby
		FeedbackVote.find({feedback_post: id}).exec(function(err, models) {
			if (err || !models) {
				return res.forbidden({message: 'Some thing went wrong'});
			}
			var result = {
				up: 0,
				down: 0
			};

			models.map(function(row) { if (row.vote_type == 'up') result.up++; else result.down++; });
			return res.json(result);
		});
	},
};

