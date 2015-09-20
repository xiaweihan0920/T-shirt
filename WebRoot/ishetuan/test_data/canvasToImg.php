<?php
	if (isset($_REQUEST['name'])) {
		$name = $_REQUEST['name'];
		$saveImg = $_REQUEST['data'];
		$file = fopen('./' . $name . '.png', 'w+') or die("Unable to open file!");
		$saveImg = base64_decode($saveImg);
		fwrite($file, $saveImg);
		fclose($file);
	}
?>