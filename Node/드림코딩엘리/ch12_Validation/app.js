import express from 'express';

const app = express();

app.use(express.json());

app.post('/users', (req, res, next) => {
	console.log(req.body);
    if (req.body.email..  ) {

    }
	res.sendStatus(201);
});

app.get('/:email', (req, res, next) => {
	res.send('email');
});

app.listen(8080);
