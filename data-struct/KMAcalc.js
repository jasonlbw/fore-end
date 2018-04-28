function getNext (tt) {
	debugger;
	var i = 1,
		 j = 0,
		 next = [];
	next[1] = 0;
	while(i < parseInt(tt[0])) {
		if(j === 0 || tt[i] === tt[j]) {
			++i;
			++j;
			next[i] = j;
		} else {
			j = next[j];
		}
	}
	return next;
}
var ss = '6abcdex';
var next = getNext(ss);