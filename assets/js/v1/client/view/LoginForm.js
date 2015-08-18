define(function(require) {
    var Backbone = require('backbone');
    var AuthenticatedModel = require('model/AuthenticatedModel');

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/login-form.html"]());
            return this;
        }, 

        events: {
        	"submit": "doLogin",
        },

        doLogin: function(e) {
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
            var auth = new AuthenticatedModel({username: email, password: password, _csrf: _csrf});
            auth.login(function(data) {
              console.log(data); 
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
