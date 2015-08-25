define(function(require) {
    var Backbone = require('backbone');
    var Modal = require('bootstrap/modal');
    var UrlFetchedModel = require('model/UrlFetchedModel');
    var FormDataModel = require('model/FormDataModel');
    var FeedbackModel = require('model/FeedbackModel');
    var FeedbackLinkCollection = require('collection/FeedbackLinkCollection');
    var FeedbackImageCollection = require('collection/FeedbackImageCollection');
    var Marked = require('marked');

    window.__c = window.__c || {};

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

        events: {
            "click #add-link": "openModalAddLink",
            "click #add-img": "openModalAddImg",
            "click #click-to-upload-image": "clickToUploadImage",
            "click #click-hidden-me": "toggleHiddenMe",
            "paste #inputAdd-Url": "onPasteUrl",
            "click #btn-add-link" : "addNewLink",
            "keyup #postTitle" : "renderPostAlias",
            'click #clickPreview': 'togglePreview',
            'submit form': 'onSubmitForm',
        }, 

        render: function() {
            if (!window.__c.isAuth || window.__c.isAuth == false) {
                this.$el.html(JST["assets/templates/please-login.html"]());    
                return this;
            }

            this.$el.html(JST["assets/templates/new-feedback.html"]());
            return this;
        },

        onSubmitForm: function() {
            var that = this;
            this.hideMessage();

            var title = this.getPostTitle();
            if (!title || title.length < 5) {
                this.showMessage('danger', 'Vui lòng nhập tiêu đề hợp lệ');
                return false;
            }

            var markdownContent = this.getPostMarkdownContent();
            if (!markdownContent || markdownContent.length < 10) {
                this.showMessage('danger', 'Vui lòng nhập nội dung bài viết');
                return false;
            }

            var data = {
                title: title,
                alias: this.getPostAlias(),
                markdownContent: markdownContent,
                htmlContent: this.getPostHtmlContent(),
                links: new FeedbackLinkCollection(this.formData.get('links')),
                images: new FeedbackImageCollection(this.formData.get('images')),
                image: this.getFeedbackImage(),
                tags: this.getPostTags(),
                state: 'publish',
                author: window.__c.user.user || {},
                hiddenInfo: this.isHiddenMe,
                noticeMessage: this.getNoticeMessage()
            };

            var action = new FeedbackModel(data);
            action.save(null, {
                success: function(model, response) {
                    console.log(model, response);
                    that.showMessage('success', 'Thành công, xem lại <a href="#!/f/'+ response.alias +'">tại đây</a>');
                },
                error: function(model, error) {
                    that.showMessage('danger', "Lỗi, không thể gửi phản hồi.");
                }
            });

            return false;
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

        togglePreview: function() {
            var currentMode = $('#clickPreview').data('mode') || 'preview'; // preview & edit
            if (currentMode == 'edit') {
                var postContent = this.getPostMarkdownContent();
                var postPreview = this.markdownToHtml(postContent);
                console.log(postPreview)
                $('#postPreviewContent').html(postPreview);
                
                $('#clickPreview').data('mode', 'preview');
                $('#postContent').hide();
                $('#postPreviewContent').show();
                
            } else {
                $('#clickPreview').data('mode', 'edit');
                $('#postContent').show();
                $('#postPreviewContent').hide();
            }
        },

        getFeedbackImage : function() {
            return $('#postImage').val() || '';
        },

        getPostMarkdownContent : function( ) {
            var box = document.getElementById('postContent');
            return box.innerText || box.textContent;
        },
        
        getPostHtmlContent : function() {
            var content = $('#postPreviewContent').html();
            
            if (!content) {
                var box = document.getElementById('postContent');
                var markdownContent = box.innerText || box.textContent;
                return Marked(markdownContent);
            }
            
            return content;
        },

        getNoticeMessage: function() {
            return $('#noticeMessage').val() || '';
        },
        
        markdownToHtml : function(text) {
              return Marked(text);
        },

        getPostTitle : function() {
            return $('#postTitle').val() || '';
        },

        getPostAlias : function() {
            var title = this.titleToAlias(this.getPostTitle());
            
            return title || '';
        },

        renderPostAlias: function() {
            var title = this.getPostAlias();

            $("#postTitleAliasContainer").css('display', 'block');
            $("#postTitleAlias").text(title + '/');
        },

        titleToAlias: function(t) {
            var title = t || '';
            title = title.toLowerCase()
                .replace(/ /g,'-')
                .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                .replace(/\ /g, '-')
                .replace(/đ/g, "d")
                .replace(/đ/g, "d")
                .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
                .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
                .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g,"o")
                .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e")
                .replace(/ì|í|ị|ỉ|ĩ/g,"i")
                .replace(/[-_]+/g, '-')
                .replace(/[^\w-]+/g,'')
                .replace(/^[^A-z0-9]+/, '')
                .replace(/([^A-z0-9]+)$/, '');
            return title;
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

        getPostTags : function() {
            var tags = $('#postTags').val();
            if (!tags) return [];
            
            return tags.split(",").map(function(tag) { return tag.trim() });
        },

        // ==============================
        // Helper function
        // ==============================
        isValidURL : function(url) {
			var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

			if (RegExp.test(url)) return true;

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
