define(function(require) {
    var Backbone = require('backbone');
    var SignupModel = require('model/SignupModel');
    var SigninModel = require('model/SigninModel');
    var NavigationView = require('view/Navigation');
    var cookie = require('cookie');
    
    $.cookie.json = true;

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/register-form.html"]());
            return this;
        },

        events: {
        	"submit": "doRegister",
        },

        doRegister: function(e) {
        	var that = this;
            // Hidden previous message 
            this.hideMessage();
            
        	// TODO: Validate
        	var username = $('input[name="username"]').val();
        	var email = $('input[name="email"]').val();
        	var password = $('input[name="password"]').val();
            var _csrf = __c._csrf || '';
            
            // Validate input
            if (!username || !email || !password || username.length < 4 || email.length < 4 || password.length < 4) {
                this.showMessage("warning", "Vui lòng điền chính xác username/email và password!");
                return false;
            }
            if (!this.isEmail(email)) {
                this.showMessage("danger", "Email không chính xác!");
                return false; 
            }
            
            // Get ready
            this.showMessage("success", "Register with #" + username + "...");
            var auth = new SignupModel({username: username, email: email, password: password, _csrf: _csrf});
            auth.save(null, {
            	error : function(e) {
            		console.log("here!!!");
            		that.showMessage("danger", "Thông tin không chính xác hoặc tài khoản/email đã có người sử dụng.");
            		return false;
            	},

            	success : function(model, response) {
            		that.showMessage("success", "Đăng kí thành công, đang đăng nhập...");
            		$('form.register-form').slideUp();

            		var login = new SigninModel(model);
            		login.save(null, {
            			error: function() {
            				that.showMessage("danger", "Login fail!!");
            				$('form.register-form').slideDown();
            			}, 

            			success: function(m, res) {
            				// Save token to global 
            				window.__c.user = res;
                            window.__c.firstLogin = true;

            				// Save user data to cookie 
            				$.cookie(window.__c.feedbackAuthenCookieKey, res);
            				that.showMessage("success", "Login success!!");
                            
                            // TODO: Redirect to last page
                            Backbone.history.navigate('!/user/' + window.__c.user.user.username, {trigger: true});
                            
                            // Re-render nav 
                            var navigationView = new NavigationView({ el: $('#main-nav ul') });
                            navigationView.render();
            			}
            		})
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
