import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';
const app = express();

app.use(express.json()); // REST API, Body
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body
app.use(
	express.static('public', {
		dotfiles: 'ignore',
		etag: false,
		index: false,
		maxAge: '1d',
		redirect: false,
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now());
		}
	})
);

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
