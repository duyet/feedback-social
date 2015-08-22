define(function(require) {
    var Backbone = require('backbone');
    var Feedbacks = require('collection/FeedbackCollection');

    return Backbone.View.extend({
        initialize: function(options) {
			this.options = options;
			_.bindAll(this, 'render');
		},

        events: {
            'click .makeInExplore' : 'makeFeedbackExplore',
        },

        makeFeedbackExplore: function(e) {
            var that = this;
            
            MakeInExplore = Backbone.Model.extend({
                url: __c.api_prefix + '/feedbacks/makeInExplore',
                initialize: function(options) {
                    if (options.alias) this.url += '/' + options.alias;
                }
            });

            var action = new MakeInExplore({ alias : $(e.toElement).data('alias') });

            var changeExploreTo = ($(e.toElement).data('inexplore') ? false : true);

            console.log("!!!!!!!1", changeExploreTo, $(e.toElement).data('inexplore'));
            action.set({ inExplore: changeExploreTo });
            action.save(null, {
                error: function() {
                    console.log('Error');
                }, 
                success: function() {
                    that.render();
                }
            })

        },

        render: function() {
            console.log("Render ...");
            var that = this;
        	this.collection = new Feedbacks();
            
            this.$el.html(JST["assets/admin_templates/manager-feedback-list.html"]({
            	//posts: posts.fetch()
            }));

            PostItemRow = Backbone.View.extend({
                tagName: 'tr',
                initialize: function(options) {
                    _.bindAll(this, 'render');
                    //this.model.bind('change', this.render);
                },

                render: function() {
                    this.$el.empty();

                    this.$el.append(('<td><a href="/#!/f/'+ this.model.alias +'">' + this.model.title + '</a></td>'));
                    //this.$el.append(('<td>'+ this.model.createdAt +'</td>'));
                    
                    this.$el.append(('<td><span class="makeInExplore '+ (this.model.inExplore ? 'label label-success' : '') +'" data-alias="'+ this.model.alias +'" data-inexplore="'+ (this.model.inExplore ? true : false) +'">explore</span></td>'));
                    
                    this.$el.append(('<td><span class="label label-'+ (this.model.state == 'publish' ? 'success' : 'default') +'">'+ this.model.state +'</span></td>'));
                    this.$el.append(('<td><a href="/#!/manager/feedback/'+ this.model.alias +'/edit">edit</a> | <a href="/#!/post/'+ this.model.alias +'delete">delete</a></td>'));

                    return this;
                }

            });

            this.collection.fetch({
                success: function (collection, response, options) {
                    var tbody = $('#feedbackList');
                    console.log(collection, response);
                    response.forEach(function(post) {
                        var itemView = new PostItemRow({
                            model: post
                        });

                        tbody.append(itemView.render().el);
                    });
                }
            });

            return this;
        }
    });
});
 