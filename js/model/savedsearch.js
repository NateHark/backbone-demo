// A generic saved search
var SavedSearch = Backbone.Model.extend({
	newItemCheckInterval: 30000,
	queryPageSize: 25,
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
			{ rpp:me.queryPageSize, q: me.get('query') }, 
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
		    	  'id': val.id,
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
		
		if(newItems == 0) {
	       	me.revealLatestTweets(); 
        }
		
		this.set({
			'newItemCount': newItems
		});
	},
	revealLatestTweets: function() {
		this.tweets.reset();
	   	var me = this,
	   		maxId = 0;
	   	$.each(this.hiddenTweets.models, function(i, val) {
	   		if(val.get('id') > maxId) {
	   			maxId = val.get('id');
	   		}
	    	me.tweets.add(val);
	   	});   
	   	me.set({ 'lastRead': maxId });
	},
	clear: function() {
		clearInterval(this.fetchTimer);
	}
});