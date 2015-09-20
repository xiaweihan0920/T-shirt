$(function() {
	var Good = Backbone.Model.extend({
		defaults: function() {
			return {
				id: Goods.nextId(),
				price: 30,
				number: 1,
				total: 30
			};
		},

		
	});
});