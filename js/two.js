(function(window, undefined){
	"use strict";

	app.window = app.window || {};

	app.ListView = Backbone.View.extend({
		el: $('body'),

		events: {
			'click button#add': 'addItem'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'addItem');

			this.counter = 0;
			this.render();
		},

		render: function(){
			$(this.el).append("<button id='add'>Add List Item</button>");
			$(this.el).append("<ul></ul>");
		},

		addItem: function(){
			this.counter++;
			$('ul', this.el).append("<li>Hello World! " + this.counter + "</li>");
		}
	});

})(window, undefined);