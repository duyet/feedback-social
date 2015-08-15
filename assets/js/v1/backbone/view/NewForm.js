define(function(require) {
    var Backbone = require('backbone');
    var Modal = require('bootstrap/modal');
    var UrlFetchedModel = require('model/UrlFetchedModel');
    var FormDataModel = require('model/FormDataModel');

    return Backbone.View.extend({
    	// Default variable 
        isHiddenMe: false,
        inputUrls : [],

        initialize: function() {
        	this.on("changed:isHiddenMe", function() {
        		if (this.isHiddenMe) $("#check-hidden-me").html("x");
        		else $("#check-hidden-me").html("&nbsp;&nbsp;");
        	});

        	this.formData = new FormDataModel();
			this.formData.bind('change', function() {
        		// Update link #input-links
        		var links = this.formData.get('links');
        		console.log(links);
        	});
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
        	"paste #inputAdd-Url": "onPasteUrl",
        	"click #btn-add-link" : "addNewLink",
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

        onPasteUrl: function(e) {
			var inputUrl = document.getElementById("inputAddUrl").value;
			console.log("URL: ", inputUrl);
			console.log("Check ", e);

			
		},

		addNewLink: function(e) {
			var inputUrl = $("#inputAddUrl").val();

			if (this.isValidURL(inputUrl)) {
				Backbone.ajax({
					dataType: "json",
					url: "/api/v1/helper/url_fetch?url=" + inputUrl,
					data: "",
					success: function(data){
						console.log("Load URL Review, return: ", data);
						var fetchedData = new UrlFetchedModel({
							url: inputUrl,
							data: data
						});
						var urlList = this.formData.get('links');
						urlList.push(fetchedData);

						this.formData.set({links: urlList});
					}
				});
			}
		},

        // ==============================
        // Helper function
        // ==============================
        isValidURL : function(url) {
			var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

			if (RegExp.test(url)) return true;

			return false;
		} 
    });

});
