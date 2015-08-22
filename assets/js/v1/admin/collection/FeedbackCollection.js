define(function(require) {
    var Backbone = require('backbone');
    var FeedbackModel = require('model/FeedbackModel');
    return Backbone.Model.extend({
		url: __c.api_prefix + '/feedbacks',
		model: FeedbackModel
    });
});
