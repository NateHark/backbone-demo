var SavedSearchView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		_.bindAll(this, 'change', 'remove', 'clear');
		this.model.bind('change', _.bind(this.render, this));
		this.model.view = this;
		
		this.model.set({ 'isActive': true }, { silent: true });
	},
	events: {
		'click .remove-search': 'clear'
	},
	render: function() {
		var template = '\
			{{#newItemCount}} \
			<div class="new-item-count">{{ newItemCount }}</div> \
			{{/newItemCount}} \
			<a class="saved-search" href="#">{{ name }}</a> \
			<a class="remove-search" href="#">(remove)</a> \
			';
		var context = _.extend(this.model.toJSON(), { name: this.model.get('query') });
		$(this.el).empty();
		$(this.el).html(Mustache.to_html(template, context));
		
		return this;
	},
	remove: function() {
		$(this.el).remove();
	},
	clear: function() {
		this.model.clear();
	}
});