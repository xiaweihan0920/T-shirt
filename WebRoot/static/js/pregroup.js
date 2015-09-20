$(function() {
	$('.pre-tabs').on('click', '.col-md-1', function(event) {
		var tab = this.className.match(/pre-tab-[a-z]*\b/)[0],
			list = tab.replace('-tab', '');
		$(this).addClass('pre-curtab')
			.siblings().removeClass('pre-curtab')
			.end().append($('.out-tri'))
				.append($('.in-tri'));
		$('.' + list).addClass('pre-list-cur')
			.siblings('.pre-list').removeClass('pre-list-cur');
	});

	$('.pre-list').on('click', '.pre-join', function(event) {
		var $num = $('.pre-joined-num'),
			num = parseInt($num.text().match(/(\d)*/)[0]),

			//后台插入，确定选择后以表单方式提交小组选择信息
			$groupInput = $('#groupSelect'),
			groupId = $(this).siblings('img').data('groupid'),
			selected = '',
			pattern;

		if (this.dataset.toggle === undefined || this.dataset.toggle === 'no') {
			this.innerHTML = '<span class=\"glyphicon glyphicon-ok\"></span> 已加入';
			this.dataset.toggle = 'yes';
			num++;

			//传递选择结果到表单
			selected = $groupInput.val() ? $groupInput.val() + '&' + groupId : groupId;
			$groupInput.val(selected);
		} else {
			this.innerHTML = '+加入小组';
			this.dataset.toggle = 'no';
			num--;

			//取消选择，修改表单值
			pattern = eval('/(&)' + groupId + '/g');
			$groupInput.val($groupInput.val().repalce(pattern, ''));
		}
		$num.text(num + '个小组');
	});
});