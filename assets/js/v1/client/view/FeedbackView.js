define(function(require) {
    var Backbone = require('backbone');
    var VoteModel = require('model/VoteModel');
    var VoteCounter = require('model/VoteCounter');
    var FeedbackComment = require('collection/FeedbackCommentCollection');

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
        },

        events: {
            'click #voteUp'   : 'voteUp',
            'click #voteDown' : 'voteDown',
            'click #click-hidden-me': 'toggleHiddenMe',
            'submit #commentform' : 'doSubmitComment',
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
            
            CommentRowItem = Backbone.View.extend({
                tagName: 'li',
                className: 'comment',

                initialize: function(options) {
                    _.bindAll(this, 'render');
                },

                render: function() {
                    if (!this.model) return this;

                    var name = '[Hidden]';
                    if (this.model.hideMe && this.model.hideMe == false) 
                        name = this.model.user.username || name;

                    var AvatarPlaceHolder = require('model/AvatarPlaceHolderModel');
                    var avatar = (new AvatarPlaceHolder()).generate(name);
                    if (this.model.hideMe && this.model.hideMe == false) 
                        if (this.model.user.photo)
                            avatar = this.model.user.photo || avatar;

                    var html = JST["assets/templates/comment-item.html"]({
                        data: {
                            avatar: avatar, 
                            name: name,
                            date: this.model.createdAt || '',
                            message: this.model.content || '',
                        }
                    });

                    this.$el.html(html);
                    return this;
                }

            });

            // Fetch commment 
            this.comments = new FeedbackComment({ alias: this.model.get('alias') });
            this.comments.fetch({
                success: function (collection, response, options) {
                    var commentList = $('.commentlist');
                    response.forEach(function(comment) {
                        var itemView = new CommentRowItem({
                            model: comment
                        });
                        commentList.append(itemView.render().el);
                    });
                }
            });
        },

        doSubmitComment : function(e) {
            var that = this;
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
                    that.showMessage('success', 'Thành công');
                    $('#commentform').slideUp();
                },
            });

            return false;
        },

        getCommentContent : function() {
            return $('textarea[name="commentMessage"]').val() || '';
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
