// 计算器使用命令模式
(function () {
	function add (x, y) {
		return x + y;
	}
	function sub (x, y) {
		return x - y;
	}
	function mul (x, y) {
		return x * y;
	}
	function div (x, y) {
		return x / y;
	}
	var Command = function (execute, undo, value) {
		this.execute = execute;
		this.undo = undo;
		this.value = value;
	}
	var AddCommand = function (value) {
		return new Command(add, sub, value)
	}
	var SubCommand = function (value) {
		return new Command(sub, add, value);
	}
	var MulCommand = function (value) {
		return new Command(mul, div, value);
	}
	var DivCommand = function (value) {
		return new Command(div, mul, value);
	}

	var Calculator = function () {
		var current = 0,
			 commands = [];
		function action (command) {
			var name = command.execute.toString().substr(9, 3);
			return name.charAt(0).toUpperCase() + name.slice(1);
		}
		return {
			execute: function (command) {
				current = command.execute(current, command.value);
				commands.push(command);
				log.add(action(command) + '：' + command.value);
			},
			undo: function () {
				var command = commands.pop();
				current = command.undo(current, command.value);
				log.add('undo ' + action(command) + '：' + command.value);
			},
			currentValue: function () {
				return current;
			}
		}
	}
	// 日志记录
	var log = (function () {
		var msg = '';
		return {
			add: function (log) {
				msg += log + '\r\n';
			},
			show: function () {
				console.log(msg);
				msg = '';
			}
		}
	})();

	var calculator = new Calculator();
	calculator.execute(new AddCommand(100));
	calculator.execute(new SubCommand(24));
	calculator.execute(new MulCommand(6));
	calculator.execute(new DivCommand(2));
	calculator.undo();
	calculator.undo();
	log.add('currentValue：' + calculator.currentValue());
	log.show();
})();