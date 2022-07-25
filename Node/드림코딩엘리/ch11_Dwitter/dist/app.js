import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import tweetRoute from './router/post.js';
import morgan from 'morgan';
const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body
app.use(cors({
    origin: 'http://192.168.0.1:3000',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use('/tweets', tweetRoute);
// 매번 작성이 귀찮음
app.use((req, res, next) => {
    res.sendStatus(404);
});
// 꼭 해줘야 함
app.use((error, req, res) => {
    console.error(error);
    res.sendStatus(500);
});
app.listen(80);
