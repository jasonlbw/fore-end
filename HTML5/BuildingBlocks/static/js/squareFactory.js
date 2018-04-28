var SquareFactory = function() {}
SquareFactory.prototype.create = function(index, direct) {
	var s;
	index++;
	switch(index) {
		case 1: 
			s = new SquareA();
			break;
		case 2: 
			s = new SquareB();
			break;
		case 3: 
			s = new SquareC();
			break;
		case 4: 
			s = new SquareD();
			break;
		case 5: 
			s = new SquareE();
			break;
		case 6: 
			s = new SquareF();
			break;
		case 7: 
			s = new SquareG();
			break;
		default: 
			break;		
	}
	s.origin.x = 0;
	s.origin.y = 3;
	s.rotate(direct);
	return s;
}

// 条形积木
function SquareA () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 2, 0, 0]
		],
		[
		   [0, 0, 0, 0],
		   [2, 2, 2, 2],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 2, 0, 0]
		],
		[
		   [0, 0, 0, 0],
		   [2, 2, 2, 2],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareA.prototype = Square.prototype;

function SquareB () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 0, 0, 0],
		   [0, 2, 0, 0],
		   [2, 2, 2, 0],
		   [0, 0, 0, 0]
		],
		[
		   [2, 0, 0, 0],
		   [2, 2, 0, 0],
		   [2, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [2, 2, 2, 0],
		   [0, 2, 0, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 2, 0],
		   [0, 2, 2, 0],
		   [0, 0, 2, 0],
		   [0, 0, 0, 0],
		]
	];
}
SquareB.prototype = Square.prototype;
// 田形方块
function SquareC () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 2, 2, 0],
		   [0, 2, 2, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 2, 0],
		   [0, 2, 2, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 2, 0],
		   [0, 2, 2, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 2, 0],
		   [0, 2, 2, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareC.prototype = Square.prototype;

function SquareD () {
	Square.call(this);
	this.rotates = [
		[
		   [2, 0, 0, 0],
		   [2, 2, 2, 0],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]

		],
		[
		   [0, 2, 2, 0],
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 0, 0, 0]

		],
		[
		   [0, 0, 0, 0],
		   [2, 2, 2, 0],
		   [0, 0, 2, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 0, 0],
		   [0, 2, 0, 0],
		   [2, 2, 0, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareD.prototype = Square.prototype;

function SquareE () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 0, 0, 2],
		   [0, 2, 2, 2],
		   [0, 0, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 2, 0],
		   [0, 0, 2, 0],
		   [0, 0, 2, 2],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 0, 0],
		   [0, 2, 2, 2],
		   [0, 2, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 2, 2, 0],
		   [0, 0, 2, 0],
		   [0, 0, 2, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareE.prototype = Square.prototype;

function SquareF () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 0, 0, 0],
		   [0, 2, 2, 0],
		   [2, 2, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [2, 0, 0, 0],
		   [2, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 0, 0],
		   [0, 2, 2, 0],
		   [2, 2, 0, 0],
		   [0, 0, 0, 0]
		],
		[
		   [2, 0, 0, 0],
		   [2, 2, 0, 0],
		   [0, 2, 0, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareF.prototype = Square.prototype;

function SquareG () {
	Square.call(this);
	this.rotates = [
		[
		   [0, 0, 0, 0],
		   [0, 2, 2, 0],
		   [0, 0, 2, 2],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 0, 2],
		   [0, 0, 2, 2],
		   [0, 0, 2, 0],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 0, 0],
		   [0, 2, 2, 0],
		   [0, 0, 2, 2],
		   [0, 0, 0, 0]
		],
		[
		   [0, 0, 0, 2],
		   [0, 0, 2, 2],
		   [0, 0, 2, 0],
		   [0, 0, 0, 0]
		]
	];
}
SquareG.prototype = Square.prototype;