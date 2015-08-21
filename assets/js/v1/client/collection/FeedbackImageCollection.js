define(function(require) {
    var Backbone = require('backbone');
    var FeedbackImageModel = require('model/FeedbackImageModel');
	var __c = window.__c || {};
	
    return Backbone.Collection.extend({
		model: FeedbackImageModel
    });
});
