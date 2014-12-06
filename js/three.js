(function(window, undefined){
	"use strict";

	app.window = app.window || {};

	app.Item = Backbone.Model.extend({
		defaults: {
			part1: 'Hello',
			part2: 'World '
		}
	});

	app.List = Backbone.Collection.extend({
		model: app.Item
	});

	app.ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'addItem', 'appendItem');

			this.collection = new app.List();
			this.collection.bind('add', this.appendItem);

			this.counter = 0;
			this.render();
		},

		render: function(){
			var self = this;
			$(this.el).append("<button id='add'>Add List Item</button>");
			$(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(item){
				self.appendItem(item);
			}, this);
		},

		addItem: function(){
			this.counter++;
			app.item = new app.Item();
			app.item.set({
				part2: app.item.get('part2') + this.counter
			});
			this.collection.add(app.item);
		},

		appendItem: function(item){
			$('ul', this.el).append("<li>" + app.item.get('part1') +" "+ app.item.get('part2') + "</li>");
		}
	});
})(window, undefined);