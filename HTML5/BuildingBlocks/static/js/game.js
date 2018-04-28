var Game = function() {
	var gameBox,
		 gameDoms = [],
		 nextBox,
		 nextDoms = [],
		 scoreBox,
		 timeBox,
		 resultBox,
		 current,//当前方块
		 next,//下一个方块
		 score = 0;
	// 10*20矩阵
	var gameList = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	var modifyColor = function (data, box) {
		if(data === 1) {
			box.className = 'done';
		} else if(data === 2) {
			box.className = 'current';
		} else {
			box.className = 'none';
		}
	}

	/*
	 * 初始化游戏盒子
	 * container 游戏盒子
	 * list 游戏数据
	 * doms 游戏数据<=>节点
	 */
	var initBox = function (container, list, doms) {
		for(var i = 0, i_length = list.length; i < i_length; i++) {
			var dom = [];
			for(var j = 0, j_length = list[0].length; j < j_length; j++) {
				var temp = document.createElement('div');
				modifyColor(list[i][j], temp);
				temp.style.top = (i * 20) + 'px';
				temp.style.left = (j * 20) + 'px';
				container.appendChild(temp);
				dom.push(temp);
			}
			doms.push(dom);
		}
	}
	/*
	 * 刷新游戏盒子
	 * list 游戏数据
	 * doms 游戏数据<=>节点
	 */
	var reloadBox = function (list, doms) {
		for(var i = 0, i_length = list.length; i < i_length; i++) {
			for(var j = 0, j_length = list[0].length; j < j_length; j++) {
				modifyColor(list[i][j], doms[i][j]);
			}
		}
	}

	/*
    * 设置当前方块到游戏盒子中
    * type {number} 0：清空，1：设置
	 */
	var setList = function (type) {
		for(var i = 0, i_length = current.list.length; i < i_length; i++) {
			for(var j = 0, j_length = current.list[0].length; j < j_length; j++) {
				if(!check(current.origin, i, j)) {
					continue;
				}
				gameList[current.origin.x + i][current.origin.y + j] = (type === 0 ? 0 : current.list[i][j]);
			}
		}
	}

	/*
	 * 验证方块的监测点是否超出临界位置
	 */
	function check (pos, i, j) {
		if (pos.x + i < 0) {// 上边界
			return false;
		} else if (pos.x + i >= gameList.length) {// 下边界
			return false;
		} else if (pos.y + j < 0) {// 左边界
			return false;
		} else if (pos.y + j >= gameList[0].length) {// 右边界
			return false;
		} else if (gameList[pos.x + i][pos.y + j] === 1) {// 已完成方块边界
			return false;
		} else {
			return true;
		}
	}

	/*
    * 核心逻辑(验证当前方块的位置边界)
    * pos 游戏盒子中的位置
    * list 当前盒子数据
	 */
	function isValid (pos, list) {
		for(var i = 0, i_length = list.length; i < i_length; i++) {
			for(var j = 0, j_length = list[0].length; j < j_length; j++) {
				if(list[i][j] === 0) {
					continue;
				}
				if(!check(pos, i, j)) {
					return false;
				}
			}
		}
		return true;
	}

	this.init = function (boxes, type, direct) {
		var sf = new SquareFactory();
		current = sf.create(0, 2);
		next = sf.create(type, direct);

		gameBox = boxes.gameBox;
		nextBox = boxes.nextBox;
		scoreBox = boxes.scoreBox;
		timeBox = boxes.timeBox;
		resultBox = boxes.resultBox;
		initBox(gameBox, gameList, gameDoms);
		initBox(nextBox, next.list, nextDoms);


		//reloadBox(next.list, nextDoms);
	}

	/*
	 * 操作方块
	 * style 操作方式
	 */
	function operate (style) {
		if(!current[style + 'Check'](isValid)) {
			return false;
		}
		// 重置方块盒子在游戏盒子中对应位置的数据为0
		setList(0);
		// 设置方块盒子在游戏盒子中的放置位置
		current[style]();
		// 重置方块盒子的数据到游戏盒子中的对应位置
		setList(1);
		// 重新渲染游戏盒子界面
		reloadBox(gameList, gameDoms);
		return true;
	}

	this.down = function () {
		return operate('down');
	}
	this.left = function () {
		operate('left');
	}
	this.right = function () {
		operate('right');
	}
	this.rotate = function () {
		operate('rotate');
	}
	this.fall = function () {
		while (this.down());
	}
	// 方块到底部时固定
	this.fixed = function () {
		for(var i = 0, i_length = gameList.length; i < i_length; i++) {
			for(var j = 0, j_length = gameList[0].length; j < j_length; j++) {
				if(!check(current.origin, i, j)) {
					continue;
				}
				if(gameList[current.origin.x + i][current.origin.y + j] === 2) {
					gameList[current.origin.x + i][current.origin.y + j] = 1;
				}
			}
		}
		reloadBox(gameList, gameDoms);
	}
	// 消行
	this.clearLine = function () {
		var line = 0;
		for (var i = gameList.length - 1; i > 0; i--) {
			var clear = true;
			for(var j = 0, j_length = gameList[0].length; j < j_length; j++) {
				if(gameList[i][j] === 1) {
					continue
				}
				clear = false;
				break;
			}
			if(!clear) {
				continue
			}
			// 消行
			line++;
			for(var m = i; m > 0; m--) {
				for(var n = 0; n < j_length; n++) {
					gameList[m][n] =  m === 0 ? 0 : gameList[m - 1][n];
				}
			}
			i++;
		}
		return line;
	}
	// 检测是否游戏结束
	this.checkGameOver = function () {
		var overFlag = false;
		for(var i = 0, i_length = gameList[0].length; i < i_length; i++) {
			if(gameList[1][i] === 1) {
				overFlag = true;
				break;
			}
		}
		return overFlag;
	}

	this.createNext = function (type, direct) {
		current = next;
		setList(1);
		next = new SquareFactory().create(type, direct);
		reloadBox(gameList, gameDoms);
		reloadBox(next.list, nextDoms);
	}

	this.addScore = function (line) {
		var s = 0;
		switch (line) {
			case 1:
				s = 10;
				break;
			case 2:
				s = 30;
				break;
			case 3:
				s = 60;
				break;
			case 4:
				s = 100;
				break;
			default:
				break;
		}
		score += s;
		scoreBox.innerHTML = score;
	}
	this.setTime = function (time) {
		timeBox.innerHTML = time;
	}
	this.gameOver = function (win) {
		var reslut = '';
		if(win) {
			result = 'YOU WIN!';
		} else {
			result = 'GAME OVER!';
		}
		resultBox.innerHTML = result;
	}
}