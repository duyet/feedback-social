define(function(require) {
    var Backbone = require('backbone');
    var FeedbackLinkModel = require('model/FeedbackLinkModel');
	var __c = window.__c || {};
	
    return Backbone.Collection.extend({
		model: FeedbackLinkModel
    });
});
