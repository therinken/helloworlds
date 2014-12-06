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

	app.ItemView = Backbone.View.extend({
		tagName: 'li',

		initialize: function(){
			_.bindAll(this, 'render');
		},
		render: function(){
			$(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>');
			return this;
		}

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

		appendItem: function(){
			app.itemView = new app.ItemView({
				model: app.item 
			});
			$('ul', this.el).append(app.itemView.render().el);
		}
	});

})(window, undefined);