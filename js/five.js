(function(window, undefined){
	"use strict";

	app.window = app.window || {};

	Backbone.sync = function(method, model, success, error){
		success();
	};

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

		events: {
			'click span.swap': 'swap',
			'click span.delete': 'remove'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'swap', 'remove');

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},

		render: function(){
			$(this.el).html('<span style="color:black;">' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
			return this;
		},

		unrender: function(){
			$(this.el).remove();
		},

		swap: function(){
			var swapped = {
				part1: this.model.get('part2'),
				part2: this.model.get('part1')
			};
			this.model.set(swapped);
		},

		remove: function(){
			this.model.destroy();
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