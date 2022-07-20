const http = require('http');
// const http2 = require('http2');
const fs = require('fs');
const server = http.createServer((req, res) => {
	console.log('incoming...');

	const url = req.url;
	if (url === '/') {
		res.setHeader('Content-Type', 'text/html');
		fs.createReadStream('./html/index.html').pipe(res);
	} else if (url === '/hi') {
		res.write('hi');
	} else {
		res.write('not found');
	}
});

server.listen(8080);
