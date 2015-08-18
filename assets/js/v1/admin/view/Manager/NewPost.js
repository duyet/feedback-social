define(function(require) {
    var Backbone = require('backbone');
    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/admin_templates/manager-post-new.html"]());

            return this;
        },

        events: {
        	"submit": "doSubmit",
        	'keyup #postTitle': 'getAlias'
        },

        getAlias: function() {
        	var title = this.titleToAlias($('#postTitle').val());
        	console.log(title);
        	if (!title.length) {
        		$("#postTitleAliasContainer").css('display', 'none');
        		return;
        	}

        	$("#postTitleAliasContainer").css('display', 'block');
        	$("#postTitleAlias").text(this.getAlias(title));
        },

        titleToAlias: function(title) {
        	var title = title || '';
        	console.log(title);
        	return title;
        },

        doSubmit: function(e) {
            // Hidden previous message 
            this.hideMessage();
            
        	// TODO: Validate
        	var title = $('input[name="email"]').val();
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
    });
});
