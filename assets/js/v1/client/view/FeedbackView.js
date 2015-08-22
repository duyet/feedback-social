define(function(require) {
    var Backbone = require('backbone');
    var VoteModel = require('model/VoteModel');
    var VoteCounter = require('model/VoteCounter');

    return Backbone.View.extend({
        initialize: function() {
            this.voteCounter = new VoteCounter();

            if (this.model) {
                this.model.on('change', this.render, this);
                this.voteCounter.on('change', this.render, this);
            }
        },
        
        render: function() {
            if (!this.model.id) {
                this.$el.html(JST["assets/templates/blank.html"]());
                return this;
            }
            console.log(this.model);
            if (this.model.get('alias')) 
                this.voteCounter.fetchCounter(this.model.get('alias'));
            console.log(this.voteCounter);

        	this.$el.html(JST["assets/templates/view-feedback.html"]({
            	model: this.model,
                __c: window.__c,
                voteCounter: this.voteCounter,
            }));

            return this;
        },

        events: {
            'click #voteUp'   : 'voteUp',
            'click #voteDown' : 'voteDown',
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
                console.log(err, data);
                if (err) {

                }

                // Vote ok
            })
        },
    });
});
