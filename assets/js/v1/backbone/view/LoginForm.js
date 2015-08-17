define(function(require) {
    var Backbone = require('backbone');

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
            $("#messageBox").css('display', 'none');
            
        	// TODO: Validate
        	var email = $('input[name="email"]').val();
        	var password = $('input[name="password"]').val();
            var _csrf = __c._csrf || '';
            
            // Checking 
            if (!email || !password || email.length < 4 || password.length < 4) {
                this.showMessage("warning", "Vui lòng điền chính xác username và password!");
                return false;
            }
            if (!this.isEmail(email)) {
                this.showMessage("danger", "Email không chính xác!");
                return false; 
            }
            
            this.showMessage("success", "Login with " + email + "...");

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
        
        isEmail: function(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
    });
});
