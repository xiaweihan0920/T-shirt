$(function() {
	(function() {
		$('.cg-shirts').on('mouseover', '.cg-shirt', function(event) {
			$(this).find('.t-topbar').show();
		}).on('mouseout', '.cg-shirt', function(event) {
			$(this).find('.t-topbar').hide();
		});
	})();
});