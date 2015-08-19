define(function(require) {
    var Backbone = require('backbone');
    var PostModel = require('model/PostModel');
    return Backbone.Model.extend({
		url: __c.api_prefix + '/post',
		model: PostModel
    });
});
