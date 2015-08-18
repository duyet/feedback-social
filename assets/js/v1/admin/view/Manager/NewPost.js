define(function(require) {
    var Backbone = require('backbone');
    var PostModel = require('model/PostModel');
    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/admin_templates/manager-post-new.html"]());
            $('#postCreated').text('00:00');
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

        doSubmit: function(e) {
            // Hidden previous message 
            this.hideMessage();
            var that = this;
            
        	var post = new PostModel();

            post.set({ title : $('#postTitle').val()});
            post.set({ alias : $('#postTitleAlias').text() });
            post.set({ content : $('#postContent').val() });
            post.set({ created : new Date() });
            post.set({ state: $('#postState').val() });

            post.save(null, {
                success : function(model, response) {
                    console.log((model, response));
                    that.showMessage('success', "Saved success!, click <a href='/#!/post/"+ response.alias +"'>here</a> to view post.");
                }, 
                error : function(model, response) {
                    console.log((model, response));
                    that.showMessage('danger', response);
                }
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
