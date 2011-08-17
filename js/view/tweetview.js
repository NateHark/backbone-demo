/**
 * A view that represents a single Tweet
 */
var TweetView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		_.bindAll(this, 'render');
	},
	render: function() {
		var template = '\
			<div class="tweet"> \
				<div class="profile-image"> \
					<img src="{{profileImageUrl}}" width="48" height="48" /> \
				</div> \
				<div class="tweet-content"> \
					<div class="tweet-body"><a href="http://www.twitter.com/{{user}}">{{user}}</a>: {{text}}</div> \
					<div class="posted-date">{{createdAt}}</div> \
				</div> \
			</div> \
			';

		$(this.el).html(Mustache.to_html(template, this.model.toJSON()));
		
		return this;
	}
});