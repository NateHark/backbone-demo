var AddSearchView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'saveSearch', 'queryKeyPress');
	},
	events: {
		"click #submit-search": "saveSearch",
		"keypress #search-query" : "queryKeyPress"
	},
	queryKeyPress: function(event) {
		if(event.keyCode == 13) {
			this.saveSearch();
		}
	},
	saveSearch: function() {
		var value = this.$('#search-query').val();
		this.model.set({ 'query': value });
		this.model.set({ 'lastRead': 0 });
	}
});