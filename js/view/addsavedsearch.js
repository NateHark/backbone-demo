var AddSearchView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'saveSearch');
	},
	events: {
		"click #submit-search": "saveSearch"
	},
	saveSearch: function() {
		var value = this.$('#search-query').val();
		this.model.set({ 'query': value });
	}
});