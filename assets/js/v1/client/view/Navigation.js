define(function(require) {
    var Backbone = require('backbone');
    window.__c = window.__c || {};

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        
        render: function() {
            console.info("Render Navigation ...");
            
            var displayName = '';
            var username = '';
            window.__c.user = window.__c.user || {};
            if (window.__c.isAuth) {
                
                displayName = 'Guest';
                if (window.__c.user.user.username)
                    displayName = window.__c.user.user.username;
                if (window.__c.user.user.displayName)
                    displayName = window.__c.user.user.displayName;
                username = window.__c.user.user.username || '';
            }
            
            this.$el.html(JST['assets/templates/main-menu.html']({
                displayName: displayName, username: username
            }));
        },
    });
});
