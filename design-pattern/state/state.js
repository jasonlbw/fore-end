(function () {
	function LeaveRequestModel () {
		this.user = '';
		this.leaveDate = '';
		this.leaveDays = '';
		this.result = '';
	}
	function LeaveRequestContext2 () {
		this.state = null;
		this.busniessVO = null;
		this.doWork = function () {
			if(typeof this.state === 'function') {
				this.state = this.state(this);// 切换状态
				this.doWork();
			}
		}
	}
	function projectManagerState (request) {
		var model = request.busniessVO;
		console.log('项目经理审核中，请稍等···');
		console.log(model.user + '申请从' + model.leaveDate + '开始请假' + model.leaveDays + '天，请项目经理审核(1为同意，2为不同意)');

		var answer = window.prompt('1为同意，2为不同意');
		var result = answer === '1' ? '同意' : '不同意';
		model.result += '项目经理审核结果：' + result + '\r\n';
		if(!(answer === 1 && model.leaveDays > 3)) {
			return auditOverState;
		}
		return deptManagerState;
	}
	function deptManagerState (request) {
		var model = request.busniessVO;
		console.log('部门经理开始审核。请稍等···');
		console.log(model.user + '申请从' + model.leaveDate + '开始请假' + model.leaveDays + '天，请部门经理审核(1为同意，2为不同意)');
		var answer = window.prompt('1为同意，2为不同意');
		var result = answer === '1' ? '同意' : '不同意';
		model.result += '部门经理审核结果：' + result;
		return auditOverState;
	}
	function auditOverState (request) {
		var model = request.busniessVO;
		console.log(model.user + '你的请假申请已经审核结束，结果为：' + model.result);
		return null;
	}
	var staff = new LeaveRequestModel();
	staff.user = '小周';
	staff.leaveDate = '2017-12-13';
	staff.leaveDays = 5;

	var request = new LeaveRequestContext2();
	request.busniessVO = staff;
	request.state = projectManagerState;
	request.doWork();

})();