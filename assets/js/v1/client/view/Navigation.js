define(function(require) {
    var Backbone = require('backbone');
    window.__c = window.__c || {};

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        
        render: function() {
            var displayName = '';
            var username = '';
            window.__c.user = window.__c.user || {};
            if (window.__c.isAuth) {
                
                displayName = 'Guest';
                if (window.__c.user.user.username.length)
                    displayName = window.__c.user.user.username;
                if (window.__c.user.user.firstName.length && window.__c.user.user.lastName.length)
                    displayName = window.__c.user.user.firstName + window.__c.user.user.firstName;
                username = window.__c.user.user.username || '';
            }
            
            this.$el.html(JST['assets/templates/main-menu.html']({
                displayName: displayName, username: username
            }));
        },
    });
});
