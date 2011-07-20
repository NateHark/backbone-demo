/**
 * View that encapsulates the input controls for entering a query and submitting a search.
 */
var CreateSearchView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'updateQuery', 'onSubmitSearch', 'onQueryKeyPress');
	},
	events: {
		"click #submit-search": "onSubmitSearch",
		"keypress #search-query" : "onQueryKeyPress"
	},
	onQueryKeyPress: function(event) {
		if(event.keyCode == 13) {
			this.updateQuery();
		}
	},
	onSubmitSearch: function() {
		this.updateQuery();
	},
	updateQuery: function() {
		var value = this.$('#search-query').val();
		this.model.set({ 'query': value });
		this.model.set({ 'lastRead': 0 });
	}
});