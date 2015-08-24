define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};

    return Backbone.Model.extend({
		rooturl: __c.api_prefix + '/feedbackvote/info',

		fetchInfo(alias) {
			if (!__c.isAuth) return next('Please login');

			if (alias) {
				this.url = this.rooturl + '/' + alias;
				return this.save({
					feedback_post: alias,
					user: window.__c.user.user.id
				});
			}
			
			return this;
		}
    });
});
