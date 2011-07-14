var SavedSearchListView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'addSearch');
		this.collection.bind('add', this.addSearch);
	},
	render: function() {
		var template = '\
			<ul id="search-list"></ul>';
		$(this.el).html(Mustache.to_html(template));
		this.searchList = this.$('#search-list');
		
		return this;
	},
	addSearch:function(search) {
		var view = new SavedSearchView({ model: search });
		this.searchList.append(view.render().el);
	}
});