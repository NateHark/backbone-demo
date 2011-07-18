var TweetListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'addTweet', 'clear');
		this.collection.bind('add', this.addTweet);
		this.collection.bind('reset', this.clear);
	},
	render: function() {
		var template = '\
			<div id="new-result-msg"></div> \
			<ul id="tweet-list"></ul>';
			
			$(this.el).html(Mustache.to_html(template));
			this.tweetList = this.$('#tweet-list');			
	},
	addTweet: function(tweet) {
 		var view = new TweetView({ model: tweet  });	
 		this.tweetList.append(view.render().el);
	},
	clear: function() {
		$('#tweet-list').empty();
	}
});
