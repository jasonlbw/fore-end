(function () {
	var Singleton = (function () {
		var instance = null;
		function createInstance (type) {
			return factory.create(type);
		}
		return {
			getInstance: function (type) {
				if(!instance) {
					instance = createInstance(type);
				}
				return instance;
			}
		}
	})();

	var factory = (function () {
		var instanceVendor = {
			'foo': function () {
				return new Foo();
			},
			'zoo': function () {
				return new Zoo();
			}
		}
		return {
			create: function (type) {
				return instanceVendor[type]();
			}
		}
	})();

	function Foo () {
		this.msg = 'foo';
		this.show = function () {
			return this.msg;
		}
	}
	function Zoo () {
		this.msg = 'zoo';
		this.show = function () {
			return this.msg;
		}
	}
	function SingleClient () {
		this.run = function () {
			var foo = Singleton.getInstance('foo').show();
			console.log(foo);
			var zoo = Singleton.getInstance('zoo').show();
			console.log(zoo);
		}
	}
	var client = new SingleClient();
	client.run();
})();