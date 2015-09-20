$(function (){
	(function() {
		var cur = 0;
	
	var slide = function(){
		cur++;
		if(cur !== 5) {
			var $curEl = $('#slide-num .current');
			$('#slide li:eq(' + cur + ')').siblings().fadeOut()
				.end().fadeIn('slow', function() {
					$curEl.removeClass('current').removeClass('btn-danger')
						.addClass('btn-default');
					$('#slide-num span:eq(' + cur + ')').removeClass('btn-default')
						.addClass('current').addClass('btn-danger');
				});
		}else {
			$('#slide li').show();
			cur = 0;
			$('#slide-num .current').removeClass('current').removeClass('btn-danger')
				.addClass('btn-default');
			$('#slide-num span:eq(0)').removeClass('btn-default')
				.addClass('current').addClass('btn-danger');
		}
	};
	var time = setInterval(slide,7000);

	var $slideNum = $('#slide-num span');
	$slideNum.click(function(){
		clearInterval(time);
		var curNum = parseInt($(this).text());
		cur = curNum - 1;
		console.log(cur);
		$('#slide li:eq(' + cur + ')').siblings().fadeOut()
			.end().fadeIn("slow",function(){
				var curEl = $('#slide-num .current');
				curEl.removeClass('current').siblings().hide()
					.end().removeClass('btn-danger')
					.addClass('btn-default');
				$('#slide-num span:eq(' + cur + ')').removeClass('btn-default')
					.addClass('current').addClass('btn-danger');
			});
		time = setInterval(slide,7000);
	});
	})();
});