var TweetListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'addTweet');
		this.collection.bind('add', this.addTweet);
	},
	render: function() {
		var template = '\
			<div id="new-result-msg"></div> \
			<ul id="tweet-list"></ul>';
			
			$(this.el).html(Mustache.to_html(template));
			this.tweetList = this.$('#tweet-list');			
	},
	addTweet: function(tweet) {
		console.log('resultsChange handler on TweetListView');
		console.log(tweet);
 		var view = new TweetView({ model: tweet  });	
 		this.tweetList.append(view.render().el);
	}	
});
