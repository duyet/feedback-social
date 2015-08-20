define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};
    return Backbone.Model.extend({
		url: __c.api_prefix + '/auth/signup'
    });
});
