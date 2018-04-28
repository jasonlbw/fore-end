/*
 * 2017-12-15
 * melon
 * 面向对象思想
 */
// 提款机案例
(function () {
	// 账户实体类：金额、等级
	function Account (balance, rank) {
		this.balance = balance;
		this.rank = rank;
	}
	Account.prototype = {
		getBalance: function () {
			return this.balance;
		},
		getRank: function () {
			return this.rank;
		},
		setBalance: function (balance) {
			this.balance = balance;
		}
	}
	// 转账功能类
	function TransferTransaction (from, to) {
		this.from = from;
		this.to = to;
	}
	TransferTransaction.prototype = {
		// 核心功能：转账
		transfer: function (balance) {
			this.from.setBalance(this.from.getBalance() - balance);
			this.to.setBalance(this.to.getBalance() + balance);
		},
		getFrom: function () {
			return this.from;
		},
		getTo: function () {
			return this.to;
		}
	}
	// 转账业务逻辑层
	function TransferManager (from, to) {
		this.from = from;
		this.to = to;
		this.transaction = null;
		this.rankVendor = {
			'normal': {
				limit: 1000
			},
			'vip': {
				limit: 5000
			}
		}
	}
	TransferManager.prototype = {
		transfer: function (balance) {
			// 判断条件
			var fromBalance = this.from.balance;
			if(fromBalance < balance) {
				throw new Error('余额不足！');
			}
			var fromRank = this.from.getRank();
			var limit = this.rankVendor[fromRank].limit;
			if(balance > limit) {
				throw new Error(`您的转账金额超出了规定范围：${limit}`);
			}
			this.transaction = new TransferTransaction(this.from, this.to);
			this.transaction.transfer(balance);
		}
	}
	var accountA = new Account(5000, 'vip');
	var accountB = new Account(3000, 'normal');
	console.log(accountA.getBalance(), accountB.getBalance());
	var client = new TransferManager(accountA, accountB);
	client.transfer(3000);
	console.log(accountA.getBalance(), accountB.getBalance());
})();