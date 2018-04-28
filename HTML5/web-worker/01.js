function compute () {
	var i = 0,
		 j = 0,
		 sum = 0;
	for(; i < 100; i++) {
		for(; j < 1000000; j++) {
			sum += 1;
		}
	}
	postMessage(sum);
}
postMessage(`before computing: ${+new Date()}`);
compute();
postMessage(`after computing: ${+new Date()}`);