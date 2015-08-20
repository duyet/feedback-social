define(function(require) {
    var Backbone = require('backbone');
    var FeedbackModel = require('model/FeedbackModel');
    
    return Backbone.View.extend({
        initialize: function() {
            this.model = new  new FeedbackModel();
            this.model.on('change', this.render);
        },
        
        render: function() {
            
            
            this.$el.html(JST["assets/templates/explore-main.html"]({
                data: this.model
            }));
            return this;
        }
    });
});
