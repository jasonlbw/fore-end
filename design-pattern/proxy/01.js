function XiaoZhou () {
	this.talk = function () {
		console.log('老大，不好意思上次的事，请多多谅解哈。');
	}
}
function Boss () {
	var melon = new Melon();
	this.talk = function () {
		console.log('小刘，最近忙什么呢？');
		melon.talk();
	}
}
function Melon () {
	var xiaozhou = new XiaoZhou();
	this.talk = function () {
		console.log('老大，晚上没事聚个餐聊聊天，那天我见小周了，她有话要跟你说···');
		xiaozhou.talk();
	}
}
function go () {
	var boss = new Boss();
	boss.talk();
}
go();