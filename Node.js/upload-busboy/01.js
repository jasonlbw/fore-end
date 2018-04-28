const http = require('http')
const inspect = require('util').inspect
const Busboy = require('busboy')

http.createServer(function (req, res) {
	if(req.method === 'POST') {
		let busboy = new Busboy({ headers: req.headers })
		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			console.log(`File [${fieldname}],filename:${filename},encoding:${encoding},mimetype:${mimetype}`)
			file.on('data', function (data) {
				console.log(`File[${fieldname}] got ${data.length} bytes`)
			})
			file.on('end', function () {
				console.log(`File[fieldname] Finished`)
			})
		})
		busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log(`Field[${fieldname}],value:${inspect(val)},fieldnameTruncated:${fieldnameTruncated},valTruncated:${valTruncated},encoding:${encoding},mimetype:${mimetype}`)
		})
		busboy.on('finish', function () {
			console.log('Done parsing form')
			res.writeHead(303, { Connection: 'close', Location: '/' })
			res.end()
		})
		req.pipe(busboy)
	} else if (req.method === 'GET') {
		res.writeHead(200, { Connection: 'close' })
		let html = `
		<html>
			<head>
				<meta charset="utf-8" />
			</head>
			<body>
				<form method="POST" enctype="multipart/form-data">
					<input type="text" name="melon" /><br />
					<input type="file" name="attach" /><br />
					<input type="submit" value="提交" />
				</form>
			</body>
		</html>`
		res.end(html)
	}
}).listen(8000, function () {
	console.log('Linstening for request')
})