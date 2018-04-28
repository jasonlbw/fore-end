var financeStorage = (function() {
	function getExpireKey (key) {
		return '__' + key + '_local_expire_time__';
	}
	// 检测数据是否过期
	function validExpire (key) {
		var date = new Date(),
			 expireKey = getExpireKey(key),
			 time = localStorage.getItem(expireKey);
		if(time && Date.parse(time) && Date.parse(time) < date) {
			removeItem(expireKey);
			console.error('localStorage[' + key + '] is expired!');
			return false;
		}
		return true;
	}
	// 查询
	function getItem(key) {
		if(validExpire(key)) {
			return localStorage.getItem(key);
		}
	}

	// 删除
	function removeItem(key) {
		localStorage.removeItem(key);
	}

	// 增加
	function addItem(key, val) {
		var item = getItem(key);
		item && throw new Error('localStorage[' + key + '] is exist!');
		localStorage.setItem(key, val);
	}

	// 修改
	function setItem(key, val) {
		if(validExpire(key)) {
			localStorage.setItem(key, val);
		}
	}

	/*
	 * 设置过期日期
	 * key：键
	 * date：必须为日期
	 */
	function setExpire(key, date) {
		localStorage.setItem(getExpireKey(key), date);
	}
	return {
		getItem: getItem,
		removeItem: removeItem,
		addItem: addItem,
		setItem: setItem,
		setExpire: setExpire
	}
})();