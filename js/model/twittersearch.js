/**
 * Represents a Twitter search query. This model contains a reference to two instances of 
 * TweetCollection. The first instance, "latestTweets", represents a cache of the most recent
 * results returned by a search. The second instance, "displayedTweets", represents the set
 * of Tweets visible on the page. After a query has been initially executed, new results are 
 * fetched into the "latestTweets" collection on an interval. The number of new Tweets is calculated
 * by comparing the number of Tweets in the "latestTweets" collection with and ID greater than
 * the maximum ID in the "displayedTweets" collection. When the user elects to view the new Tweets
 * the contents of the "latestTweets" collection are cloned into the "displayedTweets" collection.
 */
var TwitterSearch = Backbone.Model.extend({
	newItemCheckInterval: 30000,
	queryPageSize: 26,
	initialize: function(attributes) {
		_.bindAll(this, 'clear', 'executeTwitterSearch', 'revealLatestTweets', 'fetchNewItemCountCallback');
		this.bind('change:query', this.queryChanged);
		
		this.displayedTweets = new TweetCollection();
		this.displayedTweets.queryPageSize = this.queryPageSize;
		
		this.latestTweets = new TweetCollection();
		this.latestTweets.queryPageSize = this.queryPageSize;
		this.latestTweets.bind('change', this.fetchNewItemCountCallback);
	},
	queryChanged: function() {
		// Do initial fetch
		this.executeTwitterSearch();
				
		// Set refresh
		this.fetchTimer = setInterval(this.executeTwitterSearch, this.newItemCheckInterval);
	},
	executeTwitterSearch: function() {
		this.latestTweets.query = this.get('query');
		this.latestTweets.fetch();
	}, 
	fetchNewItemCountCallback: function(response) {
		var newItems = 0,
			me = this;

		if(!this.get('lastRead')) {
			this.set({ 'lastRead': this.latestTweets.maxId().get('id') });
		}
		
		newItems = this.latestTweets.filter(function(tweet) {
			return tweet.id > me.get('lastRead');
		}).length;
		
		if(newItems == 0) {
	       	me.revealLatestTweets(); 
        }
		
		this.set({
			'newItemCount': newItems
		});
	},
	revealLatestTweets: function() {
		this.displayedTweets.reset();
	   	var me = this,
	   		maxId = 0;
	   	$.each(this.latestTweets.models, function(i, val) {
	   		if(val.get('id') > maxId) {
	   			maxId = val.get('id');
	   		}
	    	me.displayedTweets.add(val);
	   	});   
	   	me.set({ 'lastRead': maxId });
	},
	clear: function() {
		clearInterval(this.fetchTimer);
	}
});