import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(201).send('GET: users');
});

export default router;
