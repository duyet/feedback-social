define(function(require) {
    var Backbone = require('backbone');
    var Modal = require('bootstrap/modal');

    return Backbone.View.extend({
    	// Default variable 
        isHiddenMe: false,

        initialize: function() {
        	this.on("changed:isHiddenMe", function() {
        		if (this.isHiddenMe) $("#check-hidden-me").html("x");
        		else $("#check-hidden-me").html("&nbsp;&nbsp;");
        	})
    	},

        render: function() {
            this.$el.html(JST["assets/templates/new-form.html"]());
            return this;
        },

        

        events: {
        	"click #add-link": "openModalAddLink",
        	"click #add-img": "openModalAddImg",
        	"click #click-to-upload-image": "clickToUploadImage",
        	"click #click-hidden-me": "toggleHiddenMe",
        }, 

        openModalAddLink : function(e) {
        	$("#modalAddLink").modal('show');
        },

        openModalAddImg : function(e) {
        	$("#modalAddImg").modal('show');
        },

        clickToUploadImage: function(e) {
        	// TODO: Upload function here
        },

        toggleHiddenMe: function(e) {
        	this.isHiddenMe = !this.isHiddenMe;
        	this.trigger("changed:isHiddenMe");
        },
    });

});
