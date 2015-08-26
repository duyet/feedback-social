define(function(require) {
    var Backbone = require('backbone');
    var moment = require('moment');
    var moment_vi = require('moment_vi');
    var VoteModel = require('model/VoteModel');
    var VoteCounter = require('model/VoteCounter');
    var VoteInfo = require('model/VoteInfoModel');
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
            this.voteInfo = new VoteInfo();

            if (this.model) {
                this.model.on('change', this.render, this);
                this.voteCounter.on('change', this.renderVoteCounter, this);
                this.voteInfo.on('change', this.renderVoteInfo, this);
            }

            // View
            this.CommentRowItem = this.CommentRowItem || Backbone.View.extend({
                tagName: 'li',
                className: 'comment',
                attributes: function() {
                    return {
                        'data-commentId': this.model.id
                    };
                },

                initialize: function(options) {
                    if (options && options.isNewComment) {
                        this.isNewComment = true;
                        this.className += ' isNewComment';
                    }

                    _.bindAll(this, 'render');
                },

                render: function() {
                    if (!this.model) return this;

                    var AvatarPlaceHolder = require('model/AvatarPlaceHolderModel');

                    var name = '-hidden-';
                    var user_link = '#!';
                    var avatar;

                    if (this.model.hideMe === false) {
                        // Breaking here, not hide but missing user data
                        // TODO: Fix me
                        if (!this.model.user) return this;

                        name = this.model.user.displayName || this.model.user.username;
                        user_link += '/user/' + this.model.user.username;
                        avatar = this.model.user.photo || (new AvatarPlaceHolder()).generate(name);
                    } else {
                        user_link += '/p/hidden-user';
                        avatar = (new AvatarPlaceHolder()).getHiddenAvatar();
                    }

                    
                    
                    if (this.model.hideMe === false)
                        if (this.model.user.photo)
                            

                    moment.locale('vi');
                    var html = JST["assets/templates/comment-item.html"]({
                        data: {
                            id: this.model.id,
                            avatar: avatar,
                            name: name,
                            user_link: user_link,
                            date: moment(this.model.createdAt).fromNow() || '',
                            message: this.model.content
                        },
                        user: this.model.user,
                        __c: window.__c
                    });

                    this.$el.html(html);
                    return this;
                }

            });
        },

        events: {
            'click #voteUp': 'onClickVoteUp',
            'click #voteDown': 'onClickVoteDown',
            'click #click-hidden-me': 'toggleHiddenMe',
            'submit #comment-form': 'doSubmitComment',
            'click .makeDeleteComment': 'makeSureDelete',
            'click .actionDeleteComment': 'actionDeleteComment',
        },

        render: function() {
            console.i("Render FeedbackView");

            if (!this.model.id) {
                this.$el.html(JST["assets/templates/blank.html"]());
                return this;
            }

            if (this.model.get('alias')) {
                // Fetch counter 
                this.voteCounter.fetchCounter(this.model.get('alias'));

                // Fetch vote status
                this.voteInfo.fetchInfo(this.model.get('alias'));

                // Render comments
                this.renderComment();
            }

            this.$el.html(JST["assets/templates/view-feedback.html"]({
                model: this.model,
                __c: window.__c,
            }));

            return this;
        },

        renderVoteCounter: function() {
            $('#voteUp .counter').html(this.voteCounter.get('up') || 0);
            $('#voteDown .counter').html(this.voteCounter.get('down') || 0);
        },

        updateVoteCounter: function(vote_type) {
            if (vote_type == 'up') $('#voteUp .counter').html(parseInt($('#voteUp .counter').text()) + 1);
            else $('#voteDown .counter').html(parseInt($('#voteDown .counter').text()) + 1);
        },

        renderVoteInfo: function() {
            // Remove panel lock 
            $('.vote-panel').removeClass('vote-panel-clocked');
            $('.vote-panel #voteUp').removeClass('selectedMe');
            $('.vote-panel #voteDown').removeClass('selectedMe');

            if (!window.__c.isAuth) return false;

            if (this.voteInfo.get('user') && this.voteInfo.get('vote_type')) {
                if (this.voteInfo.get('user') != window.__c.user.user.id) return false;
                if (this.lockVotePanel(this.voteInfo.get('vote_type')));
            }
        },

        lockVotePanel: function(vote_type) {
            if (!vote_type || (vote_type != 'up' && vote_type != 'down')) return false;
            $('.vote-panel').addClass('vote-panel-clocked');

            if (vote_type == 'up') $('.vote-panel #voteUp').addClass('selectedMe');
            if (vote_type == 'down') $('.vote-panel #voteDown').addClass('selectedMe');
        },

        renderComment: function() {
            var that = this;
            // Fetch commment 
            this.comments = new FeedbackCommentCollection({
                alias: this.model.get('alias')
            });
            if (!this.comments.fetched) {
                this.comments.fetch({
                    success: function(collection, response, options) {
                        this.fetched = true;

                        var commentList = $('.commentlist');
                        response.forEach(function(comment) {
                            var itemView = new that.CommentRowItem({
                                model: comment
                            });
                            commentList.append(itemView.render().el);
                        });
                    }
                });
            }
        },

        makeSureDelete: function(e) {
            // TODO: Alert user to make sure delete
        },

        actionDeleteComment: function(e) {

            var commentId = ($(e.toElement).data('commentid')) || false;
            if (!commentId || !window.__c.isAuth) return alert('Error!');

            console.log($(e.toElement), commentId);

            var action = new FeedbackComment();
            action.set({
                id: commentId
            });
            action.set({
                user: window.__c.user.user.id
            });
            action.deleteComment(function(err, message) {
                if (err) alert(err);
                var deletedComment = $('.commentlist').find("li[data-commentid='" + commentId + "']");
                if (deletedComment) deletedComment.html('<i>Đã xóa</i>');
            });
        },

        doSubmitComment: function(e) {
            var that = this;
            this.hideMessage();

            if (!window.__c.isAuth) {
                return alert('Please login');
            }

            var action = new FeedbackComment();
            action.set({
                feedback_post: this.model.get('alias')
            });
            action.set({
                user: window.__c.user.user.id
            });
            action.set({
                hideMe: this.isHiddenMe
            });
            action.set({
                content: this.getCommentContent()
            });

            // Validate 
            if (!action.isValidate()) {
                this.showMessage('danger', action.getError());
                return false;
            }

            action.save(null, {
                error: function(message, response) {
                    that.showMessage('danger', '.....');
                },
                success: function(message, response) {
                    //that.showMessage('success', 'Thành công');
                    that.clearCommentContent();
                    //$('#comment-form').fadeOut();

                    console.log(message);
                    message.set({
                        user: __c.user.user
                    });

                    var itemView = new that.CommentRowItem({
                        model: message.attributes,
                        isNewComment: true
                    });
                    var commentList = $('.commentlist');
                    commentList.prepend(itemView.render().el);
                },
            });

            return false;
        },

        getCommentContent: function() {
            // TODO: Replace all ban html tag
            return $('#commentMessage').html() || '';
        },

        clearCommentContent: function() {
            return $('#commentMessage').html('');
        },

        toggleHiddenMe: function(e) {
            this.isHiddenMe = !this.isHiddenMe;
            this.trigger("changed:isHiddenMe");
        },

        canVote: function() {
            $('#voteMessage').hide();

            if (!window.__c.isAuth) {
                $('#voteMessage').html('Vui lòng <a href="#!/login">đăng nhập</a> hoặc <a href="#!/register">đăng kí</a> để xác nhận phản hồi.').addClass('text-danger inner-top-xs text-center').fadeIn();
                return false;
            }

            return true;
        },

        onClickVoteUp: function() {
            $('#voteMessage').html('').hide();
            if ($('#voteUp').hasClass('selectedMe')) {
                // Is voted, action now is un-vote
                return this.unVote('up');
            }

            if (this.canVote()) {
                this.actionVote('up', function(err, data) {
                    if (err) return $('#voteMessage').html('Lỗi, không thể vote').addClass('text-danger inner-xs text-center').fadeIn();

                });
            }
        },

        onClickVoteDown: function() {
            $('#voteMessage').html('').hide();
            if ($('#voteDown').hasClass('selectedMe')) {
                // Is voted, action now is un-vote
                return this.unVote('down');
            }

            if (this.canVote()) {
                this.actionVote('down', function(err, data) {
                    if (err) return $('#voteMessage').html('Lỗi, không thể vote').addClass('text-danger inner-xs text-center').fadeIn();
                });
            }
        },

        unVote: function(vote_type, next) {
            var that = this;
            var action = new VoteModel();

            action.unVote(this.model.get('alias'), function(err, data) {
                // Remove panel lock 
                $('.vote-panel').removeClass('vote-panel-clocked');
                $('.vote-panel #voteUp').removeClass('selectedMe');
                $('.vote-panel #voteDown').removeClass('selectedMe');

                // Update counter
                that.voteCounter.set({
                    up: (vote_type == 'up' ? that.voteCounter.get('up') - 1 : that.voteCounter.get('up')),
                    down: (vote_type == 'down' ? that.voteCounter.get('down') - 1 : that.voteCounter.get('down'))
                });

                // Fetch vote status
                that.voteInfo.clear();

                // Re-render
                that.renderVoteCounter();
            })
        },

        actionVote: function(vote_type, next) {
            var that = this;
            var action = new VoteModel();

            action.vote(this.model.get('alias'), vote_type, function(err, data) {
                if (err) return next(err);

                // Update counter
                that.voteCounter.set({
                    up: (vote_type == 'up' ? that.voteCounter.get('up') + 1 : that.voteCounter.get('up')),
                    down: (vote_type == 'down' ? that.voteCounter.get('down') + 1 : that.voteCounter.get('down'))
                });

                // Fetch vote status
                that.voteInfo.fetchInfo(that.model.get('alias'));

                // Update information about vote action, lock the panel
                that.renderVoteInfo();

                // Vote message
                $('#voteMessage').html('Bạn đã vote <i class="icon-thumbs-' + vote_type + '-1"></i>').addClass('text-success inner-top-xs text-center').fadeIn();

                // Callback
                next(null, data);
            });
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
