// A generic saved search
var SavedSearch = Backbone.Model.extend({
	newItemCheckInterval: 10000,
	initialize: function(attributes) {
		_.bindAll(this, 'clear', 'searchTwitter', 'revealLatestTweets');
		this.bind('change:query', this.queryChanged);
		
		// Set model for containing search results
		this.tweets = new TweetList();
		this.hiddenTweets = new TweetList();
	},
	queryChanged: function() {
		// Do initial fetch
		this.searchTwitter();
				
		// Set refresh
		this.fetchTimer = setInterval(this.searchTwitter, this.newItemCheckInterval);
	},
	searchTwitter: function() {
		var me = this;
		$.getJSON("http://search.twitter.com/search.json?callback=?",
			{ rpp:25, q: me.get('query') }, 
			function(response){ me.fetchNewItemCountCallback(response); },
			'jsonp');
	}, 
	fetchNewItemCountCallback: function(response) {
		if(!this.get('lastRead')) {
			this.set({ 'lastRead': response.max_id });
		}
		
		var newItems = 0,
			me = this;
			
		me.hiddenTweets.reset();
		$.each(response.results, function(i, val) {
		    me.hiddenTweets.add(new Tweet({
		          'createdAt': val.created_at,
		          'profileImageUrl': val.profile_image_url,
		          'user': val.from_user,
		          'text': val.text   
		    })); 
		     
			// Count new items
			if(val.id > me.get('lastRead')) {
				newItems++;
			}
		});
		
		console.log(newItems + " new items");
		
		if(newItems == 0) {
	       me.revealLatestTweets(); 
        }
		
		this.set({
			'newItemCount': newItems
		});
	},
	revealLatestTweets: function() {
	   this.tweets.reset();
	   var me = this;
	   $.each(this.hiddenTweets.models, function(i, val) {
	       me.tweets.add(val);
	   });   
	},
	clear: function() {
		this.view.remove();
		clearInterval(this.fetchTimer);
	}
});