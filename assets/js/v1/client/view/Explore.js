define(function(require) {
    var Backbone = require('backbone');
    var FeedbackExploreModel = require('model/FeedbackExploreModel');
    
    return Backbone.View.extend({
        initialize: function() {
            var that = this;

            this.model = new FeedbackExploreModel();
            this.model.fetch();
            this.model.on('change', this.render, this);
        },
        
        render: function() {
            console.i("Render ExploreView");
            
            this.$el.html(JST["assets/templates/explore-main.html"]({
                data: this.model.attributes
            }));
            return this;
        }
    });
});
