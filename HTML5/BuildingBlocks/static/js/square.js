var Square = function () {
	this.list = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	this.origin = {
		x: 0,
		y: 0
	};
	this.direct = 0;
}
// 是否能旋转
Square.prototype.rotateCheck = function (isValid) {
	var d = (this.direct + 1) % 4;
	var temp = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	for (var i = 0, i_length = temp.length; i < i_length; i++) {
		for (var j = 0, j_length = temp[0].length; j < j_length; j++) {
			temp[i][j] = this.rotates[d][i][j];
		}
	}
	return isValid(this.origin, temp);
}
// 旋转
Square.prototype.rotate = function (num) {
	!num && (num = 1);
	this.direct = (this.direct + num) % 4;
	for(var i = 0, i_length = this.list.length; i < i_length; i++) {
		for(var j = 0, j_length = this.list[0].length; j < j_length; j++) {
			this.list[i][j] = this.rotates[this.direct][i][j]
		}
	}
}
// 是否能下落
Square.prototype.downCheck = function (isValid) {
	var temp = {};
	temp.x = this.origin.x + 1;
	temp.y = this.origin.y;
	return isValid(temp, this.list);
}
// 下落
Square.prototype.down = function () {
	this.origin.x++;
}
// 是否能左移
Square.prototype.leftCheck = function (isValid) {
	var temp = {};
	temp.x = this.origin.x;
	temp.y = this.origin.y - 1;
	return isValid(temp, this.list);
}
// 左移
Square.prototype.left = function () {
	this.origin.y--;
}
// 是否能右移
Square.prototype.rightCheck = function (isValid) {
	var temp = {};
	temp.x = this.origin.x;
	temp.y = this.origin.y + 1;
	return isValid(temp, this.list);
}
// 右移
Square.prototype.right = function () {
	this.origin.y++;
}