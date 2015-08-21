define(function(require) {
    var Backbone = require('backbone');
    return Backbone.View.extend({
        initialize: function(options) {
            this.page = options.page ? options.page : 'index';
        },
        
        render: function() {
            if (!JST["assets/templates/pages/"+ this.page +".html"]) {
                this.$el.html(JST["assets/templates/notfound.html"]());
                return this;
            }
            
            this.$el.html(JST["assets/templates/pages/"+ this.page +".html"]());
            return this;
        }
    });
});
