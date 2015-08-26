define(function(require) {
    var Backbone = require('backbone');
    var Tab = require('bootstrap/tab');
    var NavigationView = require('view/Navigation');
    
    return Backbone.View.extend({
        initialize: function() {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
        },
        
        events: {
            'click #signoutClick' : 'signMeOut',
            'click #editClick' : 'viewFormEditInfo',
            'click #changeLanguage' : 'onChangeLanguage',
            'submit #editInfoForm' : 'onUpdateInfo',
        },
        
        signMeOut: function() {
            console.log("Request signout..")
            var SignOut = require('model/SignoutModel');
            var action = new SignOut();
            action.signout();
            
            // Re-render nav 
            var navigationView = new NavigationView({ el: $('#main-nav ul') });
            navigationView.render();
            
            // Redirect to login page   
            Backbone.history.navigate('!/login', {trigger: true});
        },
        
        viewFormEditInfo: function() {
            $('#editForm').fadeIn();
        },

        onUpdateInfo: function() {

        },
        
        onChangeLanguage: function() {
            $('#changeLanguageMessage').text("Notice: Hệ thống hiện tại chỉ hỗ trợ Tiếng Việt.");
        },
        
        render: function() {
            console.i("Render UserPage");
            
            if (!this.model.get('token')) {
                this.$el.html(JST["assets/templates/notfound.html"]());
                return this;
            }
            
            // Avatar link 
            var user = this.model.get('user') || {};
            
            if (!user.photo) {
                var AvatarPlaceHolder = require('model/AvatarPlaceHolderModel');
                user.photo = (new AvatarPlaceHolder()).generate(user.username);
            }
            
            this.model.set({user : user});
            
        	this.$el.html(JST["assets/templates/view-user-index.html"]({
            	model: this.model,
                __c: window.__c
            }));
            
            return this;
        }
    });
});
