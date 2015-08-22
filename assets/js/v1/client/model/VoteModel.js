define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};

    return Backbone.Model.extend({
		url: __c.api_prefix + '/feedbackvote/vote',

		vote: function(feedback_post, value, next) {
			value = (value != 'up') ? 'down' : 'up';
			
			if (!__c.isAuth) return next('Please login');

			this.set({feedback_post: feedback_post});
			this.set({user: window.__c.user.user.id});
			this.set({vote_type: value});

			return this.save({
				error: function(err) {
					next(err);
				},
				success: function(err, model) {
					next(null, model);
				}
			});
		}
    });
});
