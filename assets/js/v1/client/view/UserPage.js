define(function(require) {
    var Backbone = require('backbone');
    var Tab = require('bootstrap/tab');
    
    return Backbone.View.extend({
        initialize: function() {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
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
                user.photo = 'https://placeholdit.imgix.net/~text?txtsize=250&w=350&h=350&bg=1e7145&txtclr=fff&txt=' + this.getFirstLetterFromName(user.username);
            }
            
            this.model.set({user : user});
            
        	this.$el.html(JST["assets/templates/userpage.html"]({
            	model: this.model
            }));

            return this;
        }, 
        
        getFirstLetterFromName : function(username) {
              return username[0].toUpperCase() || "";
        },
    });
});
