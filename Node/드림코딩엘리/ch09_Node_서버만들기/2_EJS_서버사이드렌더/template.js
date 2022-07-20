const http = require('http');
const fs = require('fs');

let ejs = require('ejs');

const name = 'Jang';

const courses = [
	{ name: 'html ' },
	{ name: 'js ' },
	{ name: 'css ' },
	{ name: 'node ' }
];
const sever = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html');
	const url = req.url;
	if (url === '/') {
		ejs
			.renderFile('./template/index.ejs', { name })
			.then((data) => res.end(data));
	} else if (url === '/courses') {
		ejs
			.renderFile('./template/courses.ejs', { courses })
			.then((data) => res.end(data));
	} else {
		ejs
			.renderFile('./template/not_found.ejs', { name })
			.then((data) => res.end(data));
	}
});

sever.listen('8080');
