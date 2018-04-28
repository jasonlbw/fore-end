var app = document.getElementById('app');
console.log(app);

/*
 * 获取兼容性异步加载对象
 */
function getRequestHttp() {
	var requestHttp;
	if (window.ActiveXObject) {
		var arr = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0",
							 "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", 
							 "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
		for (var i = 0, length = arr.length; i < length; i++) {
			try {
				requestHttp = new ActiveXObject(arr[i]);
				return requestHttp;
			} catch (error) {}
		}
	} else {
		try {
			requestHttp = new XMLHttpRequest();
			return requestHttp;
		} catch (otherError) {}
	}
}