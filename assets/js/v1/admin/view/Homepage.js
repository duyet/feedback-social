define(function(require) {

    var Backbone = require('backbone');

    return Backbone.View.extend({

        className: 'home-page-view',

        render: function() {
            this.$el.html(JST["assets/admin_templates/home.html"]());
            return this;
        }
    });

});
