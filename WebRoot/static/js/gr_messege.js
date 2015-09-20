$(function() {
	$('.gr-tabs').click(function(event) {
		var parentLi = event.target.parentNode,
			whichTab = parentLi.className.split(' ')[0].replace('-tabs', '');
		$(parentLi).addClass('active')
			.siblings().removeClass('active');
		$('.' + whichTab).show()
			.siblings('.gr-tab').hide();
	});
});