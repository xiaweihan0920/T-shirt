$(function() {
	//元素fixed，scroll到一定高度停止
	/*(function() {
		var $shot = $('.tshirtShot'),
			shirtHeight = $('.tshirt').height(),
			oldTop = $shot[0].offsetTop;
		$(document).scroll(function() {
			var scrollT = $('body').scrollTop();
			if (scrollT <= shirtHeight - 200) {
				$shot[0].style.top = oldTop + scrollT +'px';
			}
		});
	})();*/

	//缩略图对应
	$('.tshirtShot a').click(function() {
		$(this).parent().addClass('curShot')
			.siblings().removeClass('curShot');
		$('.sin-wrap-img img')[0].src = $(this).children('img')[0].src;
		return false;
	});
	//分享按钮
	$('#btn-share').mouseover(function() {
		$(this).children('.link').show();
	}).mouseout(function() {
		$(this).children('.link').hide();
	});
	
	//评论区：移动评论区出现回复字样
	$('.other-comment').mouseover(function(event) {
			if(typeof $(this).children('.response')[0] != 'object') {
				$(this).append('<span class="response">回复</span>');
			}
			$(this).children('.response').show();
			$('.response').click(function() {
				$('#mycomment').focus();
				$('#mycomment')[0].scrollIntoView(false);
			});
	}).mouseout(function(event) {
		$(this).children('.response').hide();
	});
});