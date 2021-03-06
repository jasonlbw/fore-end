// 计分器使用中介者模式
(function () {
	function Player (name) {
		this.name = name;
		this.points = 0;
	}
	Player.prototype.play = function () {
		this.points += 1;
		mediator.played();
	}
	var scoreboard = {
		element: document.getElementById('result'),
		update: function (score) {
			var msg = '';
			for(var key in score) {
				if(!score.hasOwnProperty(key)) {
					continue;
				}
				msg += `<p><strong>${key}</strong>：${score[key]}分</p>`;
			}
			this.element.innerHTML = msg;
		}
	};
	var mediator = {
		players: {},
		names: ['James', 'Melon', 'Kobe'],
		setup: function () {
			for(var i = 0, length = this.names.length; i < length; i++) {
				var name = this.names[i];
				this.players[name] = new Player(name);
			}
		},
		played: function () {
			var score = {};
			for(var i = 0, length = this.names.length; i < length; i++) {
				var name = this.names[i];
				score[name] = this.players[name].points;
			}
			scoreboard.update(score);
		},
		keypress: function (e) {
			e = e || window.event;
			var names = mediator.names,
				 players = mediator.players,
				 key = e.keyCode || e.which || e.charCode;
			if (key === 48) {
				players[names[0]].play();
			} else if (key === 49) {
				players[names[1]].play();
			} else if (key === 50) {
				players[names[2]].play();
			}
		}
	}
	mediator.setup();
	window.onkeypress = mediator.keypress;
	setTimeout(function () {
		window.onkeypress = null;
		console.log('Game Over!');
	}, 30000);
})();