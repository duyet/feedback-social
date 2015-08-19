define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
		url: __c.api_prefix + '/post',
		
		initialize: function() {
			if( !this.get('tags') ){ 
				this.set({tags: new Array()});
			}
		}
    });
});
