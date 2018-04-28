// 缓存实例
function Universe () {
	if(typeof Universe.instance === 'object') {
		return Universe.instance;
	}
	this.start_time = 0;
	this.bang = 'Big';

	Universe.instance = this;
}

// 重写构造函数
function Universe1 () {
	var instance = this;
	this.start_time = 0;
	this.bang = 'Big';

	Universe1 = function () {
		return instance;
	}
}

var Universe3;
(function () {
	var instance;
	Universe = function () {
		if(instance) {
			return instance;
		}
		instance = this;
		this.start_time = 0;
		this.bang = 'Big';
	}
})();