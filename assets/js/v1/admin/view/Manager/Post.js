define(function(require) {
    var Backbone = require('backbone');
    var Posts = require('collection/PostCollection');

    return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
			_.bindAll(this, 'render');
		},

        render: function(posts) {
        	var posts = new Posts();

            this.$el.html(JST["assets/admin_templates/manager-post-list.html"]({
            	posts: posts.fetch()
            }));

            return this;
        }
    });
});
