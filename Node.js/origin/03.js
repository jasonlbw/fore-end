var http = require('http');
function compute () {
	console.log('开始计算');
	process.nextTick(compute);
}
http.createServer(function () {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World');
}).listen(3000);
compute();