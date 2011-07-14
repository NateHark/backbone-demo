var TweetView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		_.bindAll(this, 'render');
	},
	render: function() {
		var template = '\
			<div class="profileImage"> \
				<img src="{{profileImageUrl}}" /> \
			</div> \
			<div class="twitterUser">{{user}}</div> \
			<div class="tweetContent">{{text}}</div> \
			<div class="postedDate">{{createdAt}}</div> \
			';

		$(this.el).html(Mustache.to_html(template, this.model.toJSON()));
		
		return this;
	}
});