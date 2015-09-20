$(function() {
	(function() {
		function createAddress() {
			var str = "<div class=\"address\">"+
						"		<form action=\"\" method=\"POST\" class=\"form-horizontal\">"+
						"			<fieldset>"+
						"				<legend>添加收货地址</legend>"+
						"				<div class=\"form-group\">"+
						"					<label class=\"col-sm-2\">所在地区</label>"+
						"					<div class=\"col-sm-6\">"+
						"						<select name=\"province\"></select><select name=\"city\"></select><select name=\"area\"></select><br>"+
						"					</div>"+
						"				</div>"+
						"				<div class=\"form-group\">"+
						"					<label for=\"ad-address\" class=\"col-sm-2\">收货地址</label>"+
						"					<div class=\"col-sm-6\">"+
						"						<input type=\"text\" name=\"ad-address\" id=\"ad-address\">"+
						"					</div>"+
						"				</div>"+
						"				<div class=\"form-group\">"+
						"					<label for=\"ad-postalcode\" class=\"col-sm-2\">邮政编码</label>"+
						"					<div class=\"col-sm-6\">"+
						"						<input type=\"text\" name=\"ad-postalcode\" id=\"ad-postalcode\" placeholder=\"如不确定请填写000000\">"+
						"					</div>"+
						"				</div>"+
						"				<div class=\"form-group\">"+
						"					<label for=\"ad-name\" class=\"col-sm-2\">收货人姓名</label>"+
						"					<div class=\"col-sm-6\">"+
						"						<input type=\"text\" name=\"ad-name\" id=\"ad-name\">"+
						"					</div>"+
						"				</div>"+
						"				<div class=\"form-group\">"+
						"					<label for=\"ad-phone\" class=\"col-sm-2\">手机号码</label>"+
						"					<div class=\"col-sm-6\">"+
						"						<input type=\"text\" name=\"ad-phone\" id=\"ad-phone\">"+
						"					</div>"+
						"				</div>"+
						"				<div class=\"form-group\">"+
						"					<div class=\"col-sm-1\">"+
						"						<input type=\"checkbox\" name=\"ad-default\" id=\"ad-default\">"+
						"					</div>"+
						"					<label for=\"ad-default\" class=\"col-sm-6\">设为默认地址</label>"+
						"				</div>"+
						"				<button type=\"submit\" class=\"btn btn-default\">保存</button>"+
						"				<button class=\"btn btn-default ad-cancel\">取消</button>"+
						"			</fieldset>"+
						"		</form>"+
						"	</div>";
			$(str).appendTo('body');
		}

		createAddress();
		new PCAS("province","city","area");

		$('.ol-new-ad').click(function(event) {
			$('.address').show();
			$('#zhezhao').show();
		});

		$('.ol-cancel').click(function(event) {
			$('.address').hide();
			$('#zhezhao').hide();
		});
	})();
});