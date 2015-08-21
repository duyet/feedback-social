define(function(require) {
    var Backbone = require('backbone');
    var SigninModel = require('model/SigninModel');
    var NavigationView = require('view/Navigation');
    var cookie = require('cookie');
    
    $.cookie.json = true;

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/login-form.html"]());
            return this;
        }, 

        events: {
        	"submit": "doLogin",
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
                    $.cookie(window.__c.feedbackAuthenCookieKey, res);
                    that.showMessage("success", "Đăng nhập thành công!");
                    
                    // Redirect to userpage 
                    // TODO: Redirect to last page
                    Backbone.history.navigate('!/user/' + window.__c.user.user.username, {trigger: true});
                    
                    // Re-render nav 
                    var navigationView = new NavigationView({ el: $('#main-nav ul') });
                    navigationView.render();
                }
            });

        	return false;
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
