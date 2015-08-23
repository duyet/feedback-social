define(function(require) {
    var Backbone = require('backbone');
    var moment = require('moment');
    var moment_vi = require('moment_vi');
    var VoteModel = require('model/VoteModel');
    var VoteCounter = require('model/VoteCounter');
    var FeedbackCommentCollection = require('collection/FeedbackCommentCollection');
    var FeedbackComment = require('model/FeedbackCommentModel');

    return Backbone.View.extend({
        isHiddenMe: false,

        initialize: function() {
            this.on("changed:isHiddenMe", function() {
                if (this.isHiddenMe) {
                    $("#check-hidden-me").html("x");
                    $('#sendAs').html('Guest');
                } else { 
                    $("#check-hidden-me").html("&nbsp;&nbsp;");
                    $('#sendAs').html(window.__c.user.user.username);
                }
            });

            this.voteCounter = new VoteCounter();

            if (this.model) {
                this.model.on('change', this.render, this);
                this.voteCounter.on('change', this.render, this);
            }

            // View
            this.CommentRowItem = Backbone.View.extend({
                tagName: 'li',
                className: 'comment',

                initialize: function(options) {
                    if (options && options.isNewComment) {
                        this.isNewComment = true;
                        this.className += ' isNewComment';
                    }

                    _.bindAll(this, 'render');
                },

                render: function() {
                    if (!this.model) return this;

                    var name = '[Hidden]';
                    var user_link = '#!';

                    if (this.model.hideMe === false) {
                        name = this.model.user.username;
                        user_link += '/user/' + this.model.user.username;
                    } else {
                        user_link += '/p/hidden-user';
                    }

                    var AvatarPlaceHolder = require('model/AvatarPlaceHolderModel');
                    var avatar = (new AvatarPlaceHolder()).generate(name);
                    if (this.model.hideMe && this.model.hideMe === false) 
                        if (this.model.user.photo)
                            avatar = this.model.user.photo || avatar;

                    moment.locale('vi');
                    var html = JST["assets/templates/comment-item.html"]({
                        data: {
                            avatar: avatar, 
                            name: name,
                            user_link: user_link,
                            date: moment(this.model.createdAt).fromNow() || '',
                            message: this.model.content
                        }
                    });

                    this.$el.html(html);
                    return this;
                }

            });
        },

        events: {
            'click #voteUp'   : 'voteUp',
            'click #voteDown' : 'voteDown',
            'click #click-hidden-me': 'toggleHiddenMe',
            'submit #comment-form' : 'doSubmitComment',
        },
        
        render: function() {
            if (!this.model.id) {
                this.$el.html(JST["assets/templates/blank.html"]());
                return this;
            }

            if (this.model.get('alias')) {
                // Fetch counter 
                this.voteCounter.fetchCounter(this.model.get('alias'));

                // Render comments
                this.renderComment();
            }
            
        	this.$el.html(JST["assets/templates/view-feedback.html"]({
            	model: this.model,
                __c: window.__c,
                voteCounter: this.voteCounter,
            }));

            return this;
        },

        renderComment: function() {
            var that = this;
            // Fetch commment 
            this.comments = new FeedbackCommentCollection({ alias: this.model.get('alias') });
            this.comments.fetch({
                success: function (collection, response, options) {
                    var commentList = $('.commentlist');
                    response.forEach(function(comment) {
                        var itemView = new that.CommentRowItem({
                            model: comment
                        });
                        commentList.append(itemView.render().el);
                    });
                }
            });
        },

        doSubmitComment : function(e) {
            var that = this;
            that.hideMessage();

            if (!window.__c.isAuth) {
                return alert('Please login');
            }

            var action = new FeedbackComment();
            action.set({ feedback_post: this.model.get('alias') });
            action.set({ user: window.__c.user.user.id });
            action.set({ hideMe: this.isHiddenMe });
            action.set({ content: this.getCommentContent() });

            action.save(null, {
                error: function(message, response) {
                    that.showMessage('danger', '');
                },
                success: function(message, response) {
                    //that.showMessage('success', 'Thành công');
                    that.clearCommentContent();
                    //$('#comment-form').fadeOut();
                    
                    console.log(message);
                    message.set({ user: __c.user.user });
                    var itemView = new that.CommentRowItem({
                        model: message,
                        isNewComment: true
                    });
                    var commentList = $('.commentlist');
                    commentList.prepend(itemView.render().el);
                },
            });

            return false;
        },

        getCommentContent : function() {
            // TODO: Replace all ban html tag
            return $('#commentMessage').html() || '';
        },

        clearCommentContent : function() {
            return $('#commentMessage').html(''); 
        },

        toggleHiddenMe: function(e) {
            this.isHiddenMe = !this.isHiddenMe;
            this.trigger("changed:isHiddenMe");
        },

        voteUp : function() {
            return this.actionVote('up');
        },

        voteDown : function() {
            return this.actionVote('down');
        },

        actionVote: function(vote_type) {
            var action = new VoteModel();
            action.vote(this.model.get('alias'), vote_type, function(err, data) {
                if (err) {
                    return alert(err);
                }

                // Update local vote, disable vote function
            })
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
