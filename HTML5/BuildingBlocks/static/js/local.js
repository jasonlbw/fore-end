var Local = function () {
	var game,
		 timer,
		 keyFn,
		 clickFn,
		 time = 0,
		 timeCount = 0,
		 interval = 500,
		 scoreBox = $('#score'),
		 timeBox = $('#time'),
		 resultBox = $('#result');
	var me = this;
	/*
	 * 给客户端的键盘绑定事件
	 */
	function bindKeyEvent () {
		keyFn = function(e) {
			var code = e.keyCode;
			if(code === 38) {// up
				game.rotate();
			} else if(code === 39) {// right
				game.right();
			} else if(code === 40) {// down
				game.down();
			} else if(code === 37) {// left
				game.left();
			} else if(code === 32) {// space
				game.fall();
			}
		};
		dom.addEvent(document, 'keydown', keyFn);
	}

	/*
	 * 绑定点击事件
	 */
	function bindClickEvent () {
		clickFn = function (e) {
			var id = e.target.getAttribute('id');
			if(id === 'up') {
				game.rotate();
			} else if (id === 'down') {
				game.down();
			} else if (id === 'left') {
				game.left();
			} else if (id === 'right') {
				game.right();
			} else if (id === 'fall') {
				game.fall();
			} else if (id === 'new') {
				timeBox.innerHTML = '0';
				scoreBox.innerHTML = '0';
				resultBox.innerHTML = '';
				stop();
				time = 0;
				timeCount = 0;
				me.start();
			}
		}
		dom.addEvent(document, 'click', clickFn);
	}

	/*
	 * 时间处理
	 */
	function timeHandler () {
		timeCount++;
		if (timeCount === 2) {
			timeCount = 0;
			time++;
			game.setTime(time);
		}
	}

	function move () {
		timeHandler();
		var flag = game.down();
		if (!flag) {
			game.fixed();
			var line = game.clearLine();
			if(line > 0) {
				game.addScore(line);
			}
			var overFlag = game.checkGameOver();
			if(overFlag) {
				console.log('over');
				game.gameOver(false);
				stop();
			} else {
				game.createNext(generateType(), generateDirect());
			}
		}
	}

	/*
	 * 结束
	 */
	function stop () {
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		dom.removeEvent(document, 'keydown', keyFn);
		dom.removeEvent(document, 'click', clickFn);
	}

	// 随机生成一个方块类型
	function generateType () {
		return Math.floor(Math.random() * 7);
	}
	// 随机生成一个旋转次数
	function generateDirect () {
		return Math.floor(Math.random() * 4);
	}

	this.start = function () {
		var doms = {
			gameBox: $('#game'),
			nextBox: $('#next'),
			scoreBox: scoreBox,
			timeBox: timeBox,
			resultBox: resultBox
		},
		type = generateType(),
		direct = generateDirect();

		game = new Game();
		game.init(doms, type, direct);
		bindKeyEvent();
		bindClickEvent();
		game.createNext(generateType(), generateDirect());
		timer = setInterval(move, interval);
	}
}