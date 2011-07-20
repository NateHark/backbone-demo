/**
 * A notification of new tweets matching the current search.
 */
var NewTweetNoticeView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render', 'newItemCountChanged', 'refreshTweets', 'clear');
		this.model.bind('change:newItemCount', this.newItemCountChanged);
		this.model.bind('change:query', this.clear);
		this.model.bind('clear', this.clear);
	},
	events: {
		"click #refresh-tweets": "refreshTweets"
	},
	render: function() {
		var newItems = this.model.get('newItemCount');
		if(newItems > this.model.queryPageSize) {
			newItems = newItems + '+';
		}
		
		var template = '\
			<div class="new-tweet-notice"> ' +
				newItems + ' new results for term <b>{{query}}</b>. \
				<a id="refresh-tweets" href="#">Click here</a> to see them. \
			</div> \
			';

		$(this.el).html(Mustache.to_html(template, this.model.toJSON()));
		
		return this;
	},
	newItemCountChanged: function() {
		if(this.model.get('newItemCount') > 0) {
			this.render();
		}
	},
	refreshTweets: function() {
		this.model.revealLatestTweets();
		$(this.el).empty();
	},
	clear: function() {
		$(this.el).empty();
	}
});