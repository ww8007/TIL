# 7. 프런트에서 함수형 이터러블 동시성 프로그래밍

## 템플릿 리터럴

```js
const a = 10;
const b = 5;
console.log(`${a} + ${b} = ${a + b}`);
```

## 이미지 목록 그리기

- 준비된 json 코드를 가지고 함

> 템플릿 리터럴을 이용한 문자열 합치기

```js
const string = (iter) => _.reduce((a, b) => `${a}${b}`, iter);

// 아래도 가능하지만
// 명확하게 문자열 합치기라는
// 이를 표현해주기 위해서 위 같이 사용하게됨
const string = (iter) => _.reduce((a, b) => a + b, iter);
```

> 헬퍼 함수 만들기

- flatMap의 경우
- ┣ Map을 먼저 하고
- ┣ flat을 실행 시켜 주듯
- ┣ 똑같이 설정해 주면 됨

```js
_.strMap = _.curry(_.pipe(L.map, string));
```

> 여기서 element로 만들어줘야 함

```js
const $ = {};
$.el = (html) => {
	const wrap = document.createElement('div');
	wrap.innerHTML = html;
	return wrap.children[0];
};
_.go(
	Images.fetch(),
	Images.tmpl,
	$.el,
	(el) => document.querySelector('body').appendChild(el),
	console.log
);
```

> 이를 좀 더 함수형 적으로 다룰 수 있음

```js
// before
const wrap = document.createElement('div');
// after
const $ = {};
$.el = (html) => {
	const wrap = document.createElement('div');
	wrap.innerHTML = html;
	return wrap.children[0];
};
```

```js
// before
(el) => document.querySelector('body').appendChild(el),
	// after
	($.append = (parent, child) => parent.appendChild(child));

// append
$.qs = (sel, parent) => document.querySelector(sel, parent);
// 받는 인자와 전달 인자가 같은 경우 다음과 같이 바인딩 가능
$.qs = document.querySelector.bind(document);
```

## 이미지 삭제

> 하나만 검색

```js
$.qs = (sel, parent = document) => parent.querySelector(sel);
$.qsa = (sel, parent = document) => parent.querySelectorAll(sel);
```

> body 태그 하나만 찾기

```js
_.go(
	Images.fetch(),
	Images.tmpl,
	$.el,
	(el) => $.append($.qs('body'), el),
	(el) => $.qsa('image', el),
	console.log
);
```

> 커링 적용

- 인자가 가변인 경우
- 인자가 2개인 경우
- ┣ 인자를 2개 사용 하도록 적용

```js
// 인자 2개
$.qs = (sel, parent = document) => parent.querySelector(sel);
$.qsa = (sel, parent = document) => parent.querySelectorAll(sel);

// 인자 무조건 하나
$.find = _.curry($.qs);
$.findAll = _.curry($.qsa);
```

> NodeList

- Array는 아니만
- ┣ ArrayLike 이기 때문에
- ┣ 이터러블로 사용이 가능함

> tap

- 안에서 무슨 동작을 하든
- 위에서 내려오는 것을 넘겨서 전달

## 이미지 동시성 다루기

> 하나씩 다루기

```js
_.tap(
    L.map(img => new Promise(resolve) => {
    img.onLoad = () => resolve(img);
    img.src = img.getAttribute('lazy-src');
}),
_.each($.addClass('fade-in'))
)
```

> 모두 한꺼번에 표시

```js
_.tap(
    L.map(img => new Promise(resolve) => {
    img.onLoad = () => resolve(img);
    img.src = img.getAttribute('lazy-src');
}),
C.takeAll,
_.each($.addClass('fade-in'))
)
```

- Promise의 평가 시점 미루기

```js
const L = (img) => (_) =>
	new Promise((resolve) => {
		img.onload = () => resolve(img);
	});
```

> 동시 평가 개념

```js
Images.loader = (limit) =>
	_.tap(
		$.findAll('img'),
		L.map(
			(img) => (_) =>
				new Promise((resolve) => {
					img.onload = () => resolve(img);
					img.src = img.getAttribute('lazy-src');
				})
		),
		C.takeAllWithLimit(limit),
		_.each(_.each($.addClass('fade-in')))
	);
_.groupBySize = _.curry((size, iter) => {
	let r = L.range(Infinity);
	return _.groupBy((_) => Math.floor(r.next().value / size), iter);
});

C.takeAllWithLimit = _.curry((limit = Infinity, iter) =>
	_.go(
		iter,
		_.groupBySize(limit),
		L.values,
		L.map(L.map((f) => f())),
		L.map(C.takeAll)
	)
);
```

## 고차 함수를 더 작게 나누어 재사용성 높이기 - 데이터형 없애기

- 고차 함수 : 데이터 형이 없음
- ┣ 데이터 형이 없어질 수 록 추상화 레벨이 높아짐
- ┣
