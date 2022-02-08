# 실전 코드 조각

- 데이터

```js
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
```

## 특정인의 posts의 모든 comments 거르기

```js
_.go(
	_.filter(posts, function (post) {
		return post.user_id === 101;
	}),
	function (posts) {
		return _.filter(comments, function (comment) {
			return _.find(posts, function (post) {
				return post.id === comment.post_id;
			});
		});
	},
	console.log
);

_.go(
	_filter(posts, (post) => post.user_id === 101),
	(posts) => {
		_filter((comments) => {
			_.find(posts, (post) => post.id === comment.post_id);
		});
	}
);
```

### `_contains` : 포함 확인을 통한 리팩터링

- 지금의 `_find` 처럼 모든 문을 도는 것 보다
- ┗ `더 간결하게 코드 작성이 가능함`

- 지금은 `post.id`로 꺼내서 비교 중이기 때문에
- ┣ 이를 `id로 먼저 바꾸고` 나서 `비교`를 하는 것으로
- ┗ `map을 사용`

- `contains` : 포함 되어 있는지 확인 가능

```js
_.go(
	_.filter(posts, (post) => post.user_id === 101),
	_.map((post) => post.id),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	console.log
);
```

### `_map`을 `_pluck`를 통한 리펙터링

- `_pluck` : key 값을 통해서 id를 찾기

```js
_.go(
	_.filter(posts, (post) => post.user_id === 101),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	console.log
);
```

### `_where` 함수를 이용한 filter 리펙터링

- `_where` : 일반 `JS Object`로 값을 추출가능

```js
_.go(
	_.where(posts, { user_id: 101 }),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, function (comment) {
			return _.contains(post_ids, comment.post_id);
		});
	},
	console.log
);
```

## 특정인의 posts에 comments를 단 친구의 이름을 찾기

- 위의 코드와 동일 하지만
- ┣ `map과 find를 통해서 name을 찾는`
- ┗ `함수를 다음과 같이 추가시켜 주면 됨`

```js
_.go(
	_.where(posts, { user_id: 101 }),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	console.log
);
// 문제점
// 동일 인물이 두 번 출력됨
// _.uniq를 사용해서 이 문제를 해결
```

> 문제점

    중복 출력 되므로
    _uniq를 통해서 이를 해결

### 중복 코드 제거

- 특정 조건을 이용해서 빼내는 함수가 중복
- ┣ 고로 이를 `posts_by` 함수를 만들어서 리팩터링

```js
function posts_by(attr) {
	return _where(posts, attr);
}

_.go(
	posts_by({ user_id: 101 }),
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.uniq,
	console.log
);
// 커링R을 사용할 수 있기 때문에 안의 객체가
// 다음과 같이 빠질 수 있음
_.go(
	{ user_id: 101 }
	posts_by,
	_.pluck('id'),
	function (post_ids) {
		return _.filter(comments, (comment) =>
			_.contains(post_ids, comment.post_id)
		);
	},
	_.map((comment) => _.find(users, (user) => user.id === comment.user_id).name),
	_.uniq,
	console.log
);
```

## 특정인의 posts에 comments를 단 친구들 정보

- 단지 `_uniq`를 빼고
- ┣ 이를 `_count_by`를 이용해서 카운트를 세주면 됨
