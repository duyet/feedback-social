define(function(require) {
    var Backbone = require('backbone');
    var SigninModel = require('model/SigninModel');
    var NavigationView = require('view/Navigation');
    var cookie = require('cookie');
    
    var __c = window.__c || {};
    $.cookie.json = true;

    return Backbone.View.extend({
        initialize: function() {
            if (window.__c.isAuth) 
                Backbone.history.navigate('!/user/' + window.__c.user.user.username, {trigger: true});
        },

        render: function() {
            console.i("Render LoginForm");
            this.$el.html('');

            if (window.__c.isAuth) {
                return this;
            }

            this.$el.html(JST["assets/templates/login-form.html"]());
            return this;
        }, 

        events: {
        	'submit': 'doLogin',
            'click .facebookLoginButton' : 'openFacebookLoginPanel'
        },

        doLogin: function(e) {
            var that = this;
            // Hidden previous message 
            this.hideMessage();
            
        	// TODO: Validate
        	var email = $('input[name="email"]').val();
        	var password = $('input[name="password"]').val();
            var _csrf = __c._csrf || '';
            
            // Validate input
            if (!email || !password || email.length < 4 || password.length < 4) {
                this.showMessage("warning", "Vui lòng điền chính xác username/email và password!");
                return false;
            }
            if (email.length < 4 || password.length < 4) {
                this.showMessage("warning", "Username/Email và password phải trên 4 ký tự!");
                return false;
            }
            if (email.indexOf('@') > 0 && !this.isEmail(email)) {
                this.showMessage("danger", "Email không chính xác!");
                return false; 
            }
            
            // Get ready
            this.showMessage("success", "Login with " + email + "...");
            $('form.login-form').slideUp();

            var login = new SigninModel({email: email, password: password});
            login.save(null, {
                error: function() {
                    that.showMessage("danger", "Sai tên đăng nhập hoặc mật khẩu!");
                    $('form.login-form').slideDown();
                }, 

                success: function(m, res) {
                    // Save token to global 
                    window.__c.user = res;
                    window.__c.isAuth = true;
                    $.cookie(window.__c.feedbackAuthenCookieKey, res);
                    that.showMessage("success", "Đăng nhập thành công!");
                    
                    that.afterLogin();
                    
                    // Restart App 
                    window.__App.start();
                    
                    // Re-render nav 
                    var navigationView = new NavigationView();
                    window.__App.regionNav.show(navigationView);
                }
            });

        	return false;
        },

        openFacebookLoginPanel: function() {
            var popUpUrl = __c.baseUrl + __c.api_prefix + '/auth/facebook';
            window.facebookWindow = this.createPopupWindow(popUpUrl, 'Login', 780, 540);
            
            window.checkLoginStatus = function() {
                console.log("On checklogin status", window.facebookWindow);
                if (window.facebookWindow.closed) {
                    that.afterLogin();
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
            // Redirect to userpage 
            // TODO: Redirect to last page
            Backbone.history.navigate('!/user/' + window.__c.user.user.username, {trigger: true});
            // Restart App
            window.__App.restart();
            // Redirect to userpage 
            // TODO: Redirect to last page
        },

        showMessage: function(messageType, messageContent, next) {
              var messageBox = $("#messageBox");
              
              messageBox.removeClass();
              messageBox.addClass("alert alert-" + messageType);
              messageBox.html(messageContent);
              messageBox.css('display', 'block');
              
              if (next) next();
              return true;
        },
        
        hideMessage: function() {
            $("#messageBox").css('display', 'hidden');
        },
        
        isEmail: function(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
    });
});
