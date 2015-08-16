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
        	this.bind('onAddNewUrl', this.renderUrlList);
        	this.bind('onFetchedUrlData', this.renderUrlFetchedData);
    	},

        render: function() {
            this.$el.html(JST["assets/templates/new-form.html"]());
            return this;
        },

        renderUrlList: function() {
        	console.log("Render URL List.");
        	ItemListView = Backbone.View.extend({
        		render: function(data) {
        			if (!data || !data.get('url')) return '';
        			var urlInfo = data.get('data') || {};

        			if (!urlInfo.title) urlInfo.title = data.get('url');

        			return '<li>'
        			+ '<a href="'+ data.get('url') +'">' + urlInfo.title + '</a>'
        			+ '<span class="host">'+ urlInfo.host +'</span>'
        			+'</li>';
        		},
        	});
        	var urls = this.formData.get('links');
        	$("#input-links").html('');
        	for (var i in urls) {
        		var li = new ItemListView();
        		$("#input-links").append(li.render(urls[i]));
        	}
        },

        renderUrlFetchedData: function() {
			return this.renderUrlList();
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
			var that = this;

			if (this.isValidURL(inputUrl)) {
				Backbone.ajax({
					dataType: "json",
					url: "/api/v1/helper/url_fetch?url=" + encodeURIComponent(inputUrl),
					data: "",
					success: function(data){
						console.log("Load URL Review, return: ", data);
						var fetchedData = new UrlFetchedModel({
							url: inputUrl,
							data: data
						});
						//console.log(that.formData);
						var urlList = that.formData.get('links') || [];
						console.log("Current url list: ", urlList);
						urlList.push(fetchedData);

						that.formData.set({links: urlList});
						that.trigger('onFetchedUrlData');
					}
				});
				// this.trigger('onAddNewUrl');
				$("#modalAddLink").modal('hide');
			} else {
				return alert("Invalid URL.")
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
