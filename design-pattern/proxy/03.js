(function () {
	function User (name, code) {
		this.name = name;
		this.code = code;
	}
	User.prototype = {
		getName: function () {
			return this.name;
		},
		getCode: function () {
			return this.code;
		},
		post: function () {
			console.log(this.name + '发帖子！');
		},
		remove: function () {
			console.log(this.name + '删帖子！');
		},
		check: function () {
			console.log(this.name + '审核帖子！')
		},
		comment: function () {
			console.log(this.name + '回复帖子！');
		}
	}

	function Forum (user) {
		this.user = user;
	}
	Forum.prototype = {
		getUser: function () {
			return this.user;
		},
		post: function () {
			var code = this.user.getCode();
			if(code === '001' || code === '003') {
				return this.user.post();
			}
			console.log(this.user.getName() + '没权限发帖子！');
		},
		remove: function () {
			var code = this.user.getCode();
			if(code === '002' || code === '003') {
				return this.user.remove();
			}
			console.log(this.user.getName() + '没权限删除帖子！');
		},
		check: function () {
			var code = this.user.getCode();
			if(code === '002' || code === '003') {
				return this.user.check();
			}
			console.log(this.user.getName() + '没权限审核帖子！');
		},
		comment: function () {
			var code = this.user.getCode();
			if(code === '003') {
				return this.user.comment();
			}
			console.log(this.user.getName() + '没权限回复帖子！');
		}
	}

	function ForumClient () {
		this.go = function () {
			var melon =  new Forum(new User('melon', '003'));
			melon.post();
			melon.remove();
			melon.check();
			melon.comment();

			var xiaozhou =  new Forum(new User('xiaozhou', '002'));
			xiaozhou.post();
			xiaozhou.remove();
			xiaozhou.check();
			xiaozhou.comment();
		}
	}
	var client = new ForumClient()
	client.go();
})();