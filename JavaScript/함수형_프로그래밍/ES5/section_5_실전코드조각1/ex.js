import _ from 'partial-js';
// import _ from 'underscore';

var users = [
	{ id: 101, name: 'ID' },
	{ id: 102, name: 'BJ' },
	{ id: 103, name: 'PJ' },
	{ id: 104, name: 'HA' },
	{ id: 105, name: 'JE' },
	{ id: 106, name: 'JI' },
];

var posts = [
	{ id: 201, body: '내용1', user_id: 101 },
	{ id: 202, body: '내용2', user_id: 102 },
	{ id: 203, body: '내용3', user_id: 103 },
	{ id: 204, body: '내용4', user_id: 102 },
	{ id: 205, body: '내용5', user_id: 101 },
];

var comments = [
	{ id: 301, body: '댓글1', user_id: 105, post_id: 201 },
	{ id: 302, body: '댓글2', user_id: 104, post_id: 201 },
	{ id: 303, body: '댓글3', user_id: 104, post_id: 202 },
	{ id: 304, body: '댓글4', user_id: 105, post_id: 203 },
	{ id: 305, body: '댓글5', user_id: 106, post_id: 203 },
	{ id: 306, body: '댓글6', user_id: 106, post_id: 204 },
	{ id: 307, body: '댓글7', user_id: 102, post_id: 205 },
	{ id: 308, body: '댓글8', user_id: 103, post_id: 204 },
	{ id: 309, body: '댓글9', user_id: 103, post_id: 202 },
	{ id: 319, body: '댓글10', user_id: 105, post_id: 201 },
];

//////////////////////////////////////////////////////////
// 중복 코드 제거

_.go(
	_.filter(posts, (post) => post.user_id === 101),
	function (posts) {
		return _.filter(comments, (comment) =>
			_.find(posts, (post) => post.id === comment.post_id)
		);
	}
);

// 지금의 경우 post.id만 필요하기 때문에
// 이를 map을 이용해서 변경 후 사용
_.go(
	_.filter(posts, (post) => post.user_id === 101),
	_.map((post) => post.id)
);

// 이제 contains 사용
// contains : 포함하는지 확인
_.go(
	_.filter(posts, (post) => post.user_id === 101),
	_.map((post) => post.id),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	}
);

// 이를 key 값을 찾아내는 _pluck를 사용이 가능함
_.go(
	_.filter(posts, (post) => post.user_id === 101),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	}
);

/// _where를 통한 리팩터링
_.go(_.where(posts, { user_id: 101 }), _.pluck('id'), function (post_ids) {
	return _.filter(comments, (comment) => _.contains(post_ids, comment.post_id));
});

//////////////////////////////////////////////////////
// 특정인의 posts에 comments를 단 친구의 이름을 찾기

_.go(
	_.where(posts, { user_id: 101 }),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.uniq
);

//////////////////////////////////////////////////////
// 중복 코드 제거
function posts_by(attr) {
	return _.where(posts, attr);
}

_.go(
	{ user_id: 101 },
	posts_by,
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.uniq
);

// 코멘트 꺼내기 함수
const comments_by_posts = _.pipe(_.pluck('id'), function (post_ids) {
	return _.filter(comments, (comment) => _.contains(post_ids, comment.post_id));
});

_.go(
	{ user_id: 101 },
	posts_by,
	comments_by_posts,
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.uniq,
	console.log
);

//////////////////////////////////////////////////////
// 특정인의 posts에 comments를 단 친구들 정보

_.go(
	{ user_id: 101 },
	posts_by,
	comments_by_posts,
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.count_by,
	console.log
);

// 이를 함수화 시키기

const f1 = _.pipe(posts_by, comments_by_posts);
console.log(f1({ user_id: 101 }));
const f2 = _.pipe(f1, user_names_by_comment, _.uniq);

function user_names_by_comment() {
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name);
}

console.log(f2({ user_id: 101 }));
