$(function() {
	$('#ds-upload').on('click', function(event) {
		$('#f-upload').trigger('click');
	});

	$('#ds-extra').on('click', function(event) {
		if (!this.dataset.toggleZ || this.dataset.toggleZ === 'no') {
			$('.ds-imgup-wrap').removeClass('bigZ');
			$('.toggleZ').text('将上传图显示在上层');
			this.dataset.toggleZ = 'yes';
		} else {
			$('.ds-imgup-wrap').addClass('bigZ');
			$('.toggleZ').text('将上传图片显示在下层');
			this.dataset.toggleZ = 'no';
		}
	});
	
	(function() {
		var imgURL = '';

		$('#f-upload').on('change', function(event) {
			var file = this.files[0];
			if (!!file) {
				var fileReader = new FileReader();
				fileReader.onload = function() {
					imgURL = this.result;
					$('.ds-imgup')[0].src = this.result;
					$('#ds-extra').removeAttr('disabled');
					$('.ds-imgup-wrap').addClass('bigZ');
					$('.ds-imgup').resizable({containment: ".ds-imgup-wrap"});
					$('.ds-imgup').draggable({containment: ".ds-imgup-wrap"});
					$('.ui-wrapper').css('overflow', 'visible');
				};

				fileReader.readAsDataURL(file);
			}
		});

		$('#ds-save').on('click', function(event) {
			
			var title=document.getElementById('named').value;
			if(title==""||title==null){
					alert('名字不能为空');
					return false;
			}else{
			var canvasBackground = document.getElementById('canvasBackground'),
				canvasBackgroundContext = canvasBackground.getContext('2d'),
				img = new Image();
			var	curImg = $('.ds-imgup'),
				curHeight = curImg.height(),
				curWidth = curImg.width(),
				offsetX = curImg.position().left + 170,
				offsetY = curImg.position().top + 120;
			var saved = '',
				b64 = '',
				target;
			img.src = imgURL;
			
			//将图片在canvas中绘制
			target=canvasBackgroundContext.drawImage(img, offsetX, offsetY, curWidth, curHeight);
			//canvas导出图片并上传到服务器和保存到用户本地(以打开新链接的方式)
			saved = canvasBackground.toDataURL("image/png");
			b64 = saved.substring(22);
			$.ajax({
				//服务器处理程序
				url: '/shirt/save',
				type: 'POST',
				data: {'data': b64, 'name': title}
			})
			.done(function() {
				window.location.href="/ishetuan/shirt/success.html";	
			
			})
			.fail(function() {
				alert('sorry,it is failed.The size of upload picture should not be too large');
				location.reload(true);
			})
			.always(function() {
				console.log("complete");
			});
				window.open(saved);
			}
		});

		$('#ds-new').on('click', function(event) {
			newCanvas();
			app.drawBackground();
			$('#f-upload')[0].files[0] = null;
			$('.ds-imgup').attr('src', '');
			$('#f-upload')[0].value = '';
		});
		
	})();
});