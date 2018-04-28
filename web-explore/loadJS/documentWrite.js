var jquery = "<script src='http://libs.baidu.com/jquery/1.9.0/jquery.js'></script>";
document.write(jquery);
function load() {
	$(function() {
	  console.info('test');
	});
}
load();