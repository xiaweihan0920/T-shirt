$(function() {
	(function() {
		function vaildBuy() {
			return $('#in-color').val() && $('#in-size').val() && $('#in-num').val();
		}

		$('.gd-shirtshot').on('click', 'img', function(event) {
			event.preventDefault();
			var src = this.src;
			$('.gd-shirt').attr('src', this.src);
			$(this).addClass('gd-curshot')
				.siblings().removeClass('gd-curshot');
		});

		$('.color').on('click', 'img', function(event) {
			event.preventDefault();
			var src = this.src,
				$this = $(this);
			$('.gd-shirt').attr('src', this.src);
			$this.addClass('gd-cur')
				.siblings().removeClass('gd-cur');
			$('#in-color').val($this.find('img').attr('title'));
		});

		$('.size').on('click', 'li', function(event) {
			event.preventDefault();
			var $this = $(this);
			$this.addClass('gd-cur')
				.siblings().removeClass('gd-cur');
			$('#in-size').val($this.find('button').text());
		});

		$('#gd-num').on('keydown', function(event) {
			var keyCode = event.keyCode;
			if (!((keyCode > 47 && keyCode < 58) || keyCode === 8 || (keyCode > 95 && keyCode < 106))) {
				event.preventDefault();
			}
		});

		$('.gd-btn-buy').on('click', function(event) {
			event.preventDefault();
			$('#in-num').val($('#gd-num').val());
			if (vaildBuy()) {
				$('.gd-user-form').removeClass('warning')
					.find('.gd-warning').hide();
				$('#gd-buy-form').submit();
			} else {
				$('.gd-user-form').addClass('warning')
					.find('.gd-warning').show();
			}
		});

		$('.gd-shopcar').on('click', function(event) {
			event.preventDefault();
			$('#in-num').val($('#gd-num').val());
			if (vaildBuy()) {
				$('.gd-user-form').removeClass('warning')
					.find('.gd-warning').hide();
				$.ajax({
					url: '../serverTest.php',
					type: 'POST',
					dataType: 'text',
					data: {"size": $('#in-size').val(),
							"color": $('#in-size').val(),
							"num": $('#in-num').val()
						},
				})
				.done(function() {
					var $tip = $('.shopcar-tip');
					if (!$tip) {
						$tip = $('<p class="shopcar-tip">已成功添加到购物车</p>');
					}
					$('body').append($tip);
					$tip.hide('slow');
				})
				.fail(function() {
					var $tip = $('.shopcar-tip');
					if (!$tip) {
						$tip = $('<p class="shopcar-tip">添加失败，请稍后再试</p>');
					}
					$('body').append($tip);
					$tip.hide('slow');
				});
				
			} else {
				$('.gd-user-form').addClass('warning')
					.find('.gd-warning').show();
			}
		});
	})();
});