import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));

app.use(
	cors({
		origin: ['http://127.0.0.1:5500'],
		optionsSuccessStatus: 200,
		credentials: true // Access-Control-Credentials: true
	})
);

app.get('/', (req, res) => {
	console.log('hi');
	res.send('Welcome!');
});

app.listen(8080);
