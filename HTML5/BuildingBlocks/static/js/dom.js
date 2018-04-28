function $(selector) {
	return document.querySelector(selector);
}
var dom = {
	addEvent: function (ele, type, cb) {
		if(ele.addEventLinstener) {
			ele.addEventLinstener(type, cb);
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + type, cb);
		} else {
			ele['on' + type] = cb;
		}
	},
	removeEvent: function (ele, type, cb) {
		if(ele.removeEventLinstener) {
			ele.removeEventLinstener(type, cb);
		} else if (ele.detachEvent) {
			ele.detachEvent('on' + type, cb);
		}
	}
}