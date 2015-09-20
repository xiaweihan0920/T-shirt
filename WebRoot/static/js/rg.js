$(function() {
	(function() {
		$('.rg-btn-step2').click(function(event) {
			if ($('.formtip').hasClass('error')) {
				//提示信息
				$('.error-tip').show();
				setTimeout(function() {
					$('.error-tip').fadeOut('400');
				}, 3000);
				return false;
			}
			$('.rg-step2').hide();
			$('.statu-num').addClass('pg-done');
			$('.statu-line').addClass('pg-done');
			$('.rg-step3').show();

			//避免button默认行为，刷新页面
			return false;
		});

		$('.step3').on('click', '.thumbnail', function(event) {
			var $this = $(this),
				value = $('#interest').val(),
				themeName = $this.find('img').data('theme'),
				pattern;

			if (this.dataset.toggle === undefined || this.dataset.toggle === 'yes') {
				$this.addClass('rg-selected');
				this.dataset.toggle = 'no';

				//传递 感兴趣的主题 给表单，val值的格式为'theme1&theme2'
				interest = !value ? themeName : value + '&' + themeName;
				$('#interest').val(interest);
			} else {
				$this.removeClass('rg-selected');
				this.dataset.toggle = 'yes';

				//修改表单interest字段的值
				pattern = eval("/(&)" + themeName + "/g");
				value = value.replace(pattern, '');
				$('#interest').val(value);
			}
		});

		$('.rg-finish').on('click', function(event) {
			event.preventDefault();
			$('.wrap-form form').trigger('submit');
		});
	})();
});