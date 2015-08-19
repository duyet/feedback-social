define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
		urlRoot: __c.api_prefix + '/post/findfromalias',

		getByAlias: function(alias){
			this.url = this.urlRoot + "/" + alias;
			return this.fetch();
		}
    });
});
