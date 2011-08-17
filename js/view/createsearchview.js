/**
 * View that encapsulates the input controls for entering a query and submitting a search.
 */
var CreateSearchView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'updateQuery', 'submitSearchClicked', 'queryKeyPress', 'latestTweetsChanged');
		this.model.latestTweets.bind('change', this.latestTweetsChanged);
	},
	events: {
		"click #submit-search": "submitSearchClicked",
		"keypress #search-query" : "queryKeyPress"
	},
	queryKeyPress: function(event) {
		if(event.keyCode == 13) {
			this.updateQuery();
		}
	},
	submitSearchClicked: function() {
		this.updateQuery();
	},
	updateQuery: function() {
		var value = this.$('#search-query').val();
		this.model.set({ 'query': value });
		this.model.set({ 'lastRead': 0 });
		
		this.$('.loading-icon').show();
	},
	latestTweetsChanged: function() {
		this.$('.loading-icon').hide();
	}
});