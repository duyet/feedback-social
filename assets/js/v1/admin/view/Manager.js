define(function(require) {
    var Backbone = require('backbone');
    var $ = require('jquery');
    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/admin_templates/manager-main.html"]());
			
			if ($("[rel=tooltip]").length) {
				$("[rel=tooltip]").tooltip();
			}
            
            return this;
        }
    });
});
