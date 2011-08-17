/**
 * A model that represents a single tweet.
 */
var Tweet = Backbone.Model.extend({});

/**
 * A model that represents a collection of Tweets returned via the Twitter search API.
 */
var TweetCollection = Backbone.Collection.extend({
	model: Tweet,
	queryPageSize: 25,
	query: '',
	initialize: function() {
		_.bindAll(this, 'url', 'fetch', 'fetchCallback', 'maxId');
	},
	// Since the Twitter search API response isn't a simple JSON array, override the default
	// fetch behavior with logic that can parse the results.
	fetch: function(options) {
		var me = this;
		$.getJSON(me.url(), 
			{ 
				rpp:me.queryPageSize, 
				q: me.get('query') 
			}, 
			function(response) { 
				me.fetchCallback(response); 
			},
			'jsonp'
		);	
	},
	fetchCallback: function(response) {
		var me = this;
		me.reset();
		
		_.each(response.results, function(tweet, i) {
		    me.add(new Tweet({
		    	  'id': tweet.id,
		          'createdAt': tweet.created_at,
		          'profileImageUrl': tweet.profile_image_url,
		          'user': tweet.from_user,
		          'text': tweet.text   
		    }), 
		    { silent: true }); 
		});
		
		this.trigger('change');
	},
	url: function() {
		return "http://search.twitter.com/search.json?&q=" + this.query + "&rpp=" + 
			this.queryPageSize + "&callback=?";
	},
	maxId: function() {
		return this.max(function(tweet) { return tweet.id; });
	}
});
