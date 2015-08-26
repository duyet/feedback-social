define(function(require) {
    var Backbone = require('backbone');
    window.__c = window.__c || {};

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        
        render: function() {
            console.i("Render Navigation");
            
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
            
            this.$el.html(JST['assets/templates/navigation.html']({
                displayName: displayName, username: username
            }));
        },

        events: {
            'click .facebookLoginButton' : 'openFacebookLoginPanel'
        },

        openFacebookLoginPanel: function() {
            var popUpUrl = __c.baseUrl + __c.api_prefix + '/auth/facebook';
            window.facebookWindow = this.createPopupWindow(popUpUrl, 'Login', 780, 540);
            
            window.checkLoginStatus = function() {
                console.log("On checklogin status", window.facebookWindow);
                if (window.facebookWindow.closed) {
                    window.getFeedbackAppInstance(true).start();
                }
                else setTimeout(window.checkLoginStatus, 1000);
            };

            setTimeout(window.checkLoginStatus, 1000);
            
            window.facebookWindow.focus();

            return false;
        },

        createPopupWindow: function(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        },

        afterLogin: function() {
                   
        },
    });
});
