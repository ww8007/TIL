import express from 'express';

const app = express();

app.use(express.json());

app.post('/', (req, res, next) => {
	console.log(req.body);
	res.send('hi');
});

app.listen(8080);
