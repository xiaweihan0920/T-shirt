$(function() {
	(function() {
		var topCalculate = function(el) {
			var maxHeight = 0;

			$(el).each(function() {
				var col = $(this).prop('class').split(" ")[1],
					$prevEl = $(this).prevAll('.' + col).filter(':first'),
					prevHeight = $prevEl.height() || 0,
					prevTop = $prevEl.prop('offsetTop') || 0;

				$(this).css("top", prevTop + prevHeight + 15);
				maxHeight = Math.max(maxHeight,parseInt($(this).prop('offsetTop')) + $(this).height() + 15);
			});
			$(el).parent().height(maxHeight);
		};

		var isLoad = true,
			t_img;

		var imgsIsLoad = function() {
			$('.cg-shirt-img').each(function() {
				if (this.height === 0) {
					isLoad = false;
				}
			});

			if (isLoad) {
				clearTimeout(t_img);
				topCalculate($('.cg-shirt'));
			} else {
				isLoad = true;
				a_img = setTimeout(imgsIsLoad, 500);
			}
		};
		imgsIsLoad();

		var ajaxNum = 1,
			col = ['col_01', 'col_02', 'col_03', 'col_04', 'col_01', 'col_02', 'col_03', 'col_04'];

		var shirtAjaxHandle = function(data) {
			var result = data.imgs,
				curT,
				i = 0, str = '';
			$('.cg-error').hide();
			for (; i < result.length; i++) {
				curT = result[i];
				str += '<div class="cg-shirt ' + col[i] + '" data-shirtId=' + curT.shirtId + '>';
				str += '<a href=' +  curT.shirtSrc + '>';
				str += '<img src=' + curT.imgSrc + ' alt=' + curT.desc + ' class="img-thumbnail cg-shirt-img">';
				str += '</a>';
				str += '<p class="cg-desc">' + curT.desc + '</p>';
				str += '<div class="t-topbar">';
				str += '<a href="" class="btn btn-danger tb-buy">';
				str += '<span class="glyphicon glyphicon-shoppingcart" aria-hidden="true"></span> 购买';
				str += '</a>';
				str += '<a href="" class="btn btn-default tb-comment">';
				str += '<span class="glyphicon glyphicon-comment"></span>';
				str += '</a>';
				str += '<button type="button" href="" class="btn btn-default tb-vote">';
				str += '<span class="glyphicon glyphicon-thumbs-up"></span>';
				str += '</button>'+ '</div>' + '</div>';
			}
			$('.cg-shirts').append(str);

			imgsIsLoad();
		};

		var themeAjaxHandle = function(data) {
			var result = data.themes,
				curT,
				i = 0, str = '';
			$('.cg-error').hide();
			for (; i < result.length; i++) {
				curT = result[i];
				str += '<div class="cg-shirt ' + col[i] + ' co-theme' + '" data-themeId=' + curT.themeId + '>';
				str += '<a href=' +  curT.themeSrc + '>';
				str += '<img src=' + curT.imgSrc + ' alt=' + curT.desc + ' class="img-thumbnail cg-shirt-img">';
				str += '</a>';
				str += '<p class="co-themeName">' + curT.themeName + '</p>';
				str += '<p class="co-themeDesc">' + curT.desc + '</p>';
				str += '</div>';
			}
			$('.cg-shirts').append(str);

			imgsIsLoad();
		};

		var flowAjax = function() {
			if (ajaxNum < 6) {
				$.ajax({
					url: '../test_data/flow.json',
					type: 'GET',
					dataType: 'json',
				})
				.done(function(data) {
					if (!$('.cg-shirt:first')[0].dataset.themeid) {
						shirtAjaxHandle(data);
					} else {
						themeAjaxHandle(data);
					}
					
					ajaxNum++;
				})
				.fail(function() {
					$('.cg-error').show();
				});
			} else {
				$('.cg-more').show();
			}
		};
		
		$(document).scroll(function(event) {
			if($('body').scrollTop() >= $(document).height() - $(window).height()) {
				flowAjax();
			}
		});

		$(document).ajaxSend(function(event, xhr, settings) {
			if (settings.url === '../test_data/flow.json') {
				$('.loading').show();
			}
		}).ajaxComplete(function(event, xhr, settings) {
			if (settings.url === '../test_data/flow.json') {
				$('.loading').hide();
			}
		});

		$('.cg-error').click(function(event) {
			flowAjax();
		});

		$('.cg-more').click(function(event) {
			ajaxNum = 1;
			flowAjax();
			$(this).hide();
		});
	})();
});