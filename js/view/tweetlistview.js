/**
 * A view that represents a list of Tweets
 */
var TweetListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'addTweet', 'reset');
		this.collection.bind('add', this.addTweet);
		this.collection.bind('reset', this.reset);
	},
	render: function() {	
		var template = '\
			<div id="new-result-msg"></div> \
			<ul id="tweet-list"></ul>';
			
		$(this.el).html(Mustache.to_html(template));
		this.tweetList = this.$('#tweet-list');	
		
		var me = this;
		this.collection.each(function(tweet) {
			var view = new TweetView({ model: tweet  });	
 			me.tweetList.append(view.render().el);	
		});			
	},
	addTweet: function(tweet) {
 		var view = new TweetView({ model: tweet  });	
 		this.tweetList.append(view.render().el);
	},
	reset: function() {
		$(this.el).empty();
		this.render();
	}
});
