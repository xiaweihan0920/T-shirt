//移到txu上时出现功能按钮
$(function fade_top(){
	$('.new-content').mouseover(function(){
		$(this).find('.ind-top').show();
	}).mouseout(function(){
		$(this).find('.ind-top').hide();
	});

	$('.cla-content').mouseover(function(){
		$(this).find('.ind-top').show();
	}).mouseout(function(){
		$(this).find('.ind-top').hide();
	});
});

