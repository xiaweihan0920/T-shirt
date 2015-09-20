$(function (){
	/*nav下的dropdown*/
	//分类，我的酷设
	$('.dropdown').mouseover(function(){
		if(this.className.indexOf('no-line') == -1) {
			$(this).find('.dropdown-menu').show();
		}
	}).mouseout(function(){
		if(this.className.indexOf('no-line') == -1) {
			$(this).find('.dropdown-menu').hide();
		}
	});
	//消息
	$('.dropdown').click(function(event) {
		$(this).find('.arrow').toggle()
			.end().find('.nav-mess').toggle();
		event.stopPropagation();
	});
	$('body').click(function() {
		try {
			if($('.nav-mess')[0].style.display === 'block') {
				$('.nav-mess').hide();
				$('.arrow').hide();
			}
		} catch (ex) {}
		
	});
	//消息下的nav-tab
	$('.nav-tabs').click(function(event) {
		var parentLi = $(event.target).parents('li')[0];
		var classN = parentLi.className.split(' ')[0];
		$(parentLi).addClass('active')
				.siblings().removeClass('active');
		$('.nav-mess-content').find('.' + classN).addClass('mess-cur')
			.siblings().removeClass('mess-cur');
		event.stopPropagation();
	});

	/*nav下的pop和按钮式链接*/
	$('button.nav-reg').click(function(){
		window.location.assign("/regis");
	});

	(function() {
		createZhezhao();

		var documentHeight = $('body').height();
		$('.nav-login').click(function(){
			$('#zhezhao').height(documentHeight)
				.show();
			$('.login-pop').show();
			return false;
		});

		$('#pop-close').click(function(){
			$('#zhezhao').hide();
			$('.login-pop').hide();
		});

		function createZhezhao() {
			var str = "<div id=\"zhezhao\"></div>" +
				"<div class=\"container login-pop\">"+
				"<div class=\"row pop-header\">"+
				"<span>登录</span>"+
				"<span class=\"glyphicon glyphicon-remove\" id=\"pop-close\" aria-hidden=\"true\"></span>"+
				"</div>"+
				"<div class=\"row\">"+
				"<div class=\"col-md-6 wrap-pop\">"+
				"<div class=\"center-block pop-form\">"+
				"<form action=\"/login\" method=\"POST\">"+
				"<fieldset>"+
				"<div class=\"form-group\">"+
				"<label for=\"account\" class=\"sr-only\">账号</label>"+
				"<div>"+
				"<input type=\"text\" class=\"form-control\" name=\"email\" id=\"email\" placeholder=\"用户名或邮箱\">"+
				"</div>"+
				"</div>"+
				"<div class=\"form-group\">"+
				"<label for=\"password\" class=\"sr-only\"></label>"+
				"<div>"+
				"<input type=\"password\" class=\"form-control\" name=\"password\" id=\"password\" placeholder=\"密码\">"+
				"</div>"+
				"</div>"+
				"<div class=\"remeber\">"+
				"    <label>"+
				"    <input type=\"checkbox\" name=\"remember_me\" value=\"1\">记住我"+
				"    </label>"+
				"    <a href=\"\" class=\"pull-right\">忘记密码？</a>"+
				" </div>"+
				" <div class=\"form-group\">"+
				"<div>"+
				"     <button type=\"submit\" class=\"btn btn-info btn-lg\" id=\"bt-login\">登录</button>"+
				"    </div>"+
				"</div>"+
				"</fieldset>"+
				"</form>"+
				"</div>"+
				"</div>"+
				"<div class=\"col-md-6 wrap-social\">"+
				"<div class=\"social-link\">"+
				"<a href=\"\" class=\"btn btn-default btn-lg\"><span>使用微博账号登录</span></a>"+
				"<a href=\"\" class=\"btn btn-default btn-lg\"><span>使用微博账号登录</span></a>"+
				"<a href=\"\" class=\"btn btn-default btn-lg\"><span>使用微博账号登录</span></a>"+
				"<a href=\"\" class=\"btn btn-default btn-lg\"><span>使用微博账号登录</span></a>"+
				"<a href=\"\" class=\"btn btn-default btn-lg\"><span>使用微博账号登录</span></a>"+
				"</div>"+
				"</div>"+
				"</div>"+
				"<div class=\"row pop-reg\">"+
				"<p>还没有账号？<a href=\"/regis\">立即注册</a></p>"+
				"</div>"+
				"</div>";
			$(str).appendTo('body');
		}
	})();
});
