$(function(){
	var formVail = function(){
		var errorCount = 0;

		$('.wrap-form input').focus(function(){
			var $parent = $(this).parents('.form-group'),
				msg_succ, msg_error, msg_tip;
			$parent.find('.formtip').remove();

			if($(this).is('#username')){
				if(this.value === ""){
					msg_tip = '<span class="formtip tip">请至少输入6位的用户名</span>';
					$parent.append(msg_tip);
				} else if (this.value.length < 6){
					msg_error = '<span class="formtip error">请至少输入6位的用户名</span>';
					$parent.append(msg_error);
				} else{
					msg_succ = '<span class="formtip success">请至少输入6位的用户名</span>';
					$parent.append(msg_succ);
				}
			}

			else if($(this).is('#email')){
				if(this.value === ""){
					msg_tip = '<span class="formtip tip">请输入正确格式的邮箱</span>';
					$parent.append(msg_tip);
				} else if (/@/.test(this.value)&&/.com/.test(this.value)){
					msg_succ = '<span class="formtip success">请输入正确格式的邮箱</span>';
					$parent.append(msg_succ);
				} else {
					msg_error = '<span class="formtip error">请输入正确格式的邮箱</span>';
					$parent.append(msg_error);
				}
			}

			else if ($(this).is('#password')){
				if (this.value === ""){
					msg_tip = '<span class="formtip tip">密码由6-18位字符组成, 区分大小写</span>';
					$parent.append(msg_tip);
				} else if (this.value.length < 6 || this.value.length > 18){
					msg_error = '<span class="formtip error">密码由6-18位字符组成, 区分大小写</span>';
					$parent.append(msg_error);
				} else{
					msg_succ = '<span class="formtip success">密码由6-18位字符组成, 区分大小写</span>';
					$parent.append(msg_succ);
				}
			}

			else if ($(this).is('#pass-confirm')){
				if (this.value && this.value === $('#password').val()){
					msg_succ = '<span class="formtip success">Ok</span>';
					$parent.append(msg_succ);
				} else {
					msg_error = '<span class="formtip error">两次输入密码不一致</span>';
					$parent.append(msg_error);
				}
			}
		}).blur(function(){
			var $parent = $(this).parents('.form-group'),
				msg_succ, msg_error, msg_tip;
			$parent.find('.formtip').remove();

			if($(this).is('#username')){
				if(this.value === "" || this.value.length < 6){
					msg_error = '<span class="formtip error">请至少输入6位的用户名</span>';
					$parent.append(msg_error);
				} else{
					msg_succ = '<span class="formtip success">请至少输入6位的用户名</span>';
					$parent.append(msg_succ);
				}
			}

			else if($(this).is('#email')){
				if (/@/.test(this.value)&&/.com/.test(this.value)){
					msg_succ = '<span class="formtip success">请输入正确格式的邮箱</span>';
					$parent.append(msg_succ);
				} else {
					msg_error = '<span class="formtip error">请输入正确格式的邮箱</span>';
					$parent.append(msg_error);
				}
			}

			else if ($(this).is('#password')){
				if (this.value === "" || this.value.length < 6 || this.value.length > 18){
					msg_error = '<span class="formtip error">密码由6-18位字符组成, 区分大小写</span>';
					$parent.append(msg_error);
				} else{
					msg_succ = '<span class="formtip succ">密码由6-18位字符组成, 区分大小写</span>';
					$parent.append(msg_succ);
				}
			}

			else if ($(this).is('#pass-confirm')){
				if (this.value && this.value === $('#password').val()){
					msg_succ = '<span class="formtip success">Ok</span>';
					$parent.append(msg_succ);
				} else{
					msg_error = '<span class="formtip error">两次输入密码不一致</span>';
					$parent.append(msg_error);
				}
			}
		}).keyup(function(){
			$(this).triggerHandler('focus');
		});
	};

	$('.gr-control input').focus(function() {
		var $parent = $(this).parents('.gr-control'),
			length = this.value.replace(/[u0391-uFFE5]/g, 'aa').length;
		$parent.find('.formtip').remove();

		if(this.value === "") {
			var msg_user_tip = '<span class="formtip tip">最多15个汉字或30个英文字母</span>';
			$parent.append(msg_user_tip);
		} else if (length > 30){
			var msg_user_error = '<span class="formtip error">最多15个汉字或30个英文字母</span>';
			$parent.append(msg_user_error);
		} else {
			var msg_user_succ = '<span class="formtip success">最多15个汉字或30个英文字母</span>';
			$parent.append(msg_user_succ);
			$('.bt-create').removeAttr('disabled');
		}
	}).blur(function() {
		var $parent = $(this).parents('.gr-control'),
			length = this.value.replace(/[u0391-uFFE5]/g, 'aa').length;
		$parent.find('.formtip').remove();
		if(this.value === "") {
			var msg_user_tip = '<span class="formtip error">小组名称不能为空</span>';
			$parent.append(msg_user_tip);
		} else if (length > 30){
			var msg_user_error = '<span class="formtip error">最多15个汉字或30个英文字母</span>';
			$parent.append(msg_user_error);
		} else {
			var msg_user_succ = '<span class="formtip success">最多15个汉字或30个英文字母</span>';
			$parent.append(msg_user_succ);
			$('.bt-create').removeAttr('disabled');
		}
	}).keyup(function() {
		$(this).trigger('focus');
	});

	formVail();

	var formVail2 = function() {
		$('.address').on('focus', '.form-group input', function(event) {
			var $this = $(this),
				$parent = $this.parents('.form-group');
			var msg_user_tip, msg_user_error, msg_user_succ;
			$parent.find('.formtip').remove();
			if ($this.is('#ad-name')) {
				if(this.value === ""){
					msg_user_tip = '<span class="formtip tip">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_tip);
				} else if (this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length > 25 || this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length < 2){
					msg_user_error = '<span class="formtip error">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_error);
				} else{
					msg_user_succ = '<span class="formtip success">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_succ);
				}
			}

			if ($this.is('#ad-phone')) {
				if(this.value === "") {
					msg_user_tip = '<span class="formtip tip">6 — 20个数字</span>';
					$parent.append(msg_user_tip);
				} else if (/\d{6,20}/g.test(this.value)) {
					msg_user_succ = '<span class="formtip success">6 — 20个数字</span>';
					$parent.append(msg_user_succ);
				} else{
					msg_user_error = '<span class="formtip error">6 — 20个数字</span>';
					$parent.append(msg_user_error);
				}
			}
		});

		$('.address').on('keyup', '.form-group input', function(event) {
			var $this = $(this),
				$parent = $this.parents('.form-group');
			var msg_user_tip, msg_user_error, msg_user_succ;
			$parent.find('.formtip').remove();
			if ($this.is('#ad-name')) {
				if(this.value === ""){
					msg_user_tip = '<span class="formtip tip">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_tip);
				} else if (this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length > 25 || this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length < 2){
					msg_user_error = '<span class="formtip error">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_error);
				} else{
					msg_user_succ = '<span class="formtip success">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_succ);
				}
			}

			if ($this.is('#ad-phone')) {
				if(this.value === "") {
					msg_user_tip = '<span class="formtip tip">6 — 20个数字</span>';
					$parent.append(msg_user_tip);
				} else if (/\d{6,20}/g.test(this.value)) {
					msg_user_succ = '<span class="formtip success">6 — 20个数字</span>';
					$parent.append(msg_user_succ);
				} else{
					msg_user_error = '<span class="formtip error">6 — 20个数字</span>';
					$parent.append(msg_user_error);
				}
			}
		});
	
		$('.address').on('blur', '.form-group input', function(event) {
			var $this = $(this),
				$parent = $this.parents('.form-group');
			var msg_user_tip, msg_user_error, msg_user_succ;
			$parent.find('.formtip').remove();
			if ($this.is('#ad-name')) {
				if (this.value === "" || this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length > 25 || this.value.replace(/[\u0391-\uFFE5]/g, 'aa').length < 2){
					msg_user_error = '<span class="formtip error">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_error);
				} else{
					msg_user_succ = '<span class="formtip success">收货人姓名应为2-25个字符，一个汉字为两个字符</span>';
					$parent.append(msg_user_succ);
				}
			}

			if ($this.is('#ad-phone')) {
				if (/\d{6,20}/g.test(this.value)) {
					msg_user_succ = '<span class="formtip success">6 — 20个数字</span>';
					$parent.append(msg_user_succ);
				} else{
					msg_user_error = '<span class="formtip error">6 — 20个数字</span>';
					$parent.append(msg_user_error);
				}
			}
		});
	};
	formVail2();
});