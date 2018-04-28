(function () {
	function GeoCoder () {
		this.getLatLng = function (address) {
			if(address === 'Amsterdam') {
				return '52.3700° N, 4.8900° E';
			} else if(address === 'London') {
				return '52.5171° N, 0.1062° E';
			} else if(address === 'Paris') {
				return '48.8742° N, 2.3470° E';
			} else if(address === 'Berlin') {
				return '52.5233° N, 13.4127° E';
			} else {
				return 'none';
			}
		}
	}
	function GeoProxy () {
		var geocoder = new GeoCoder();
		var geocache = {};
		this.getLatLng = function (address) {
			if(!geocache[address]) {
				geocache[address] = geocoder.getLatLng(address);
				log.add(`${address} not use cache`);
			}
			log.add(`${address}：${geocache[address]}`);
			return geocache[address];
		}
	}
	var log = (function () {
		var msg = '';
		return {
			add: function(log) {
				msg += log + '\r\n';
			},
			show: function () {
				console.log(msg);
				msg = '';
			}
		}
	})();
	function run () {
		var geo = new GeoProxy();
		geo.getLatLng('Paris');
		geo.getLatLng('London');
		geo.getLatLng('London');
		geo.getLatLng('London');
		geo.getLatLng('London');
		geo.getLatLng('Amsterdam');
		geo.getLatLng('Paris');
		geo.getLatLng('Paris');
		geo.getLatLng('Berlin');
		geo.getLatLng('London');
		log.show();
	}
	run();
})();