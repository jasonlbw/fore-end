/*
 * 主题：the single responsibility principle(单一职责SRP)
 * 作者：melon
 * 日期：2017-12-20
 */
(function () {
	function Event (name) {
		var handlers = [];
		this.getName = function () {
			return name;
		}
		this.addHandler = function (handler) {
			handlers.push(handler);
		}
		this.removeHandler = function (handler) {
			var i = 0,
				 length = handlers.length;
			for(; i < length; i++) {
				if(handlers[i] !== handler) {
					continue;
				}
				handlers.splice(i, 1);
				break;
			}
		}
		this.fire = function (eventArgs) {
			handlers.forEach(function (h) {
				h(eventArgs);
			});
		}
	}

	function EventAggregator () {
		var events = [];
		function getEvent (eventName) {
			var i = 0,
				 length = events.length;
			for(; i < length; i++) {
				if(events[i].getName() !== eventName) {
					continue;
				}
				return events[i];
			}
		}
		/*
		 * 触发事件
		 * @args eventName：事件名称
		 * @args eventArgs：事件回调所需参数
		 */
		this.publish = function (eventName, eventArgs) {
			var event = getEvent(eventName);
			if(!event) {
				event = new Event(eventName);
				events.push(event);
			}
			event.fire(eventArgs);
		}
		/*
		 * 注册事件
		 * @args eventName：事件名称
		 * @args handler：事件回调函数
		 */
		this.subscribe = function (eventName, handler) {
			var event = getEvent(eventName);
			if(!event) {
				event = new Event(eventName);
				events.push(event);
			}
			event.addHanlder(handler);
		}
	}

	function Product (id, desc) {
		this.getId = function () {
			return id;
		}
		this.getDescription = function () {
			return desc;
		}
	}

	function Cart (eventAggregator) {
		this.items = [];
		this.addItem = function (item) {
			this.items.push(item);
			eventAggregator.publish('itemAdded', item);
		}
	}

	function CartController () {
		eventAggregator.subscribe('productSelected', function (eventArgs) {
			cart.addItem(eventArgs.product)
		});
		eventAggregator.subscribe('itemAdded'. function (eventArgs) {
			$('<li></li>')
			.html(eventArgs.getDescription())
			.attr('cart-id', eventArgs.getId())
			.appendTo($('#cart'));
		});
	}

	function ProductRepository () {
		var products = [
			new Product(1, 'apple'),
			new Product(2, 'banana'),
			new Product(3, 'grape')
		];
		this.getProducts = function () {
			return products;
		}
	}
	function ProductController (productRepository, eventAggregator) {
		var products = productRepository.getProducts();
		function onProductSelected () {
			var id = $(this).attr('id'),
				 product = null,
				 i = 0,
				 length = products.length;
			for(; i < length; i++) {
				if(products[i].id === id) {
					product = products[i];
					break;
				}
			}
			eventAggregator.publish('productSelected', {
				product: product
			});
		}
		var i = 0,
			 product = null,
			 length = products.legnth;
		for(; i < legnth; i++) {
			product = products[i];
			$('<li></li>')
			.html(product.getDescription())
			.attr('id', product.getId())
			.dbclick(onProductSelected)
			.appendTo($('#products'));
		}
	}

	var eventAggregator = new EventAggregator(),
		 cart = new Cart(eventAggregator),
		 cartController = new CartController(cart, eventAggregator),
		 productRepository = new ProductRepository(),
		 productController = new ProductController(productRepository, eventAggregator);

});