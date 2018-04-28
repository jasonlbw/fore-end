(function () {
	var drag = function (options) {
		// 可拖动元素数组
		this.dragDoms = options.dragDoms || [];
		// 可拖动的方向：x/y/all
		this.direction = options.direction || 'all';
		// 可拖动范围
		this.root = options.root || document;
		// 可拖动手柄类名
		this.handler = options.handler || '';
	}

	drag.prototype = {

	};


	function down (target) {
		// 元素先脱离文档流，记录鼠标和元素的位置
		target.setStyle({
			position: 'absolute',
			z-index: 1000,
			cursor: 'move'
		});
	}

	function move (target) {
		// 元素的位置

	}

	function up (target) {

	}


})();

(function (window) {
	var melon = {
		getElementPos: function (el) {
			var _x = 0,
				 _y = 0;
			do {
				_x += el.offsetLeft;
				_y += el.offsetTop;
			} while (el.offsetParent);
			return {
				x: _x,
				y: _y
			};
		},
		getMousePos: function (e) {
			
		}
	}

})(window);