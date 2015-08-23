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
            console.log(this.model);
            
            if (!this.model.get('token')) {
                this.$el.html(JST["assets/templates/notfound.html"]());
                return this;
            }
            
            // Avatar link 
            var user = this.model.get('user') || {};
            
            if (!user.photo) {
                var colors = ['99b433', '1e7145', 'ff0097', '9f00a7', '7e3878', '603cba', '00aba9', '2d89ef', '2b5797', 'e3a21a', 'da532c', 'b91d47'];
                var color = colors[Math.floor(Math.random()*colors.length)];
                user.photo = 'https://placeholdit.imgix.net/~text?txtsize=250&w=350&h=350&bg='+ color +'&txtclr=fff&txt=' + this.getFirstLetterFromName(user.username);
            }
            
            this.model.set({user : user});
            
        	this.$el.html(JST["assets/templates/view-user-index.html"]({
            	model: this.model,
                __c: window.__c
            }));
            
            return this;
        }, 
        
        getFirstLetterFromName : function(username) {
              return username[0].toUpperCase() || "";
        },
    });
});
