define(function(require) {
    var Backbone = require('backbone');
    var FeedbackCommentModel = require('model/FeedbackCommentModel');
	var __c = window.__c || {};
	
    return Backbone.Collection.extend({
		rootUrl: __c.api_prefix + '/feedbackcomment/byFeedbackAlias',
		model: FeedbackCommentModel,

		initialize: function(options) {
			if (options.alias) this.url = this.rootUrl + '/' + options.alias;
		}
    });
});
