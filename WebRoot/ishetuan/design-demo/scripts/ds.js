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
			var canvasBackground = document.getElementById('canvasBackground'),
				canvasBackgroundContext = canvasBackground.getContext('2d'),
				img = new Image();
			var	curImg = $('.ds-imgup'),
				curHeight = curImg.height(),
				curWidth = curImg.width(),
				offsetX = curImg.position().left + 170;
				offsetY = curImg.position().top + 120;
			img.src = imgURL;

			canvasBackgroundContext.drawImage(img, offsetX, offsetY, curWidth, curHeight);
			var saved = canvasBackground.toDataURL("image/png");
			window.open(saved);
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