define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
		url: __c.api_prefix + '/feedbacks',
		
		initialize: function() {
			
		}
    });
});
