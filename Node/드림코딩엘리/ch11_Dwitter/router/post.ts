import express from 'express';
import 'express-async-errors';
const router = express.Router();

interface Twit {
	id: string; // 트윗 아이디
	text: string; // 트윗 텍스트
	createdAt: number; // 트윗 생성 날짜
	name: string; // 사용자 이름
	username: string; // 사용자 닉네임 (아이디)
	url?: string; // 사용자 프로파일 사진 URL
}

let twitters: Twit[] = [
	{
		id: '1',
		text: '안녕하세요',
		createdAt: Date.now(),
		name: '장동현',
		username: 'ww8007',
		url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg'
	},
	{
		id: '2',
		text: '안뇽',
		createdAt: Date.now(),
		name: '장동민',
		username: 'ww2007',
		url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg'
	}
];

router.use((req, res, next) => {
	console.log('middleware for posts');
	next();
});

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, rej) => {
	if (req.query.username) {
		return res
			.status(200)
			.json(twitters.find((t) => t.username === req.query.username));
	}
	res.status(200).json(twitters);
});

// GET /tweets/:id
router.get('/:id', (req, res, rej) => {
	const find = twitters.find((t) => t.id === req.params.id);
	if (find) res.status(200).json(find);
	if (!find)
		res.status(404).json({ message: `Tweet ${req.params.id} not found` });
});

// POST /tweets
router.post('/', (req, res, rej) => {
	const { text, name, username } = req.body;
	const tweet: Twit = {
		id: Date.now().toString(),
		text,
		createdAt: Date.now(),
		name,
		username
	};
	twitters = [tweet, ...twitters];
	res.status(201).json(twitters);
});

// PUT /tweets/:id
router.put('/:id', (req, res) => {
	const find = twitters.find((t) => t.id === req.params.id);
	if (find) find.text = req.body.text;
	find
		? res.status(208).json(find)
		: res.status(404).json({ message: `Tweet ${req.params.id} not found` });
});

router.delete('/:id', (req, res) => {
	twitters = twitters.filter((t) => t.id !== req.params.id);
	res.sendStatus(204);
});

export default router;
