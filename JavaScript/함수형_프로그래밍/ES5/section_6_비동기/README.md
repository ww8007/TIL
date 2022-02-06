# 비동기

- 결과가 Promise 객체로 return
- ┣ 결과가 다음처럼 기다림

```js
function square(a) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(a * a);
		}, 500);
	});
}

square(10).then((res) => console.log(res));
```

> 비동기는 평가순서가 보장되지 않음

- `해결법`
- ┣ `.then`으로 계속 엮을 수 있음

## `_go`를 이용한 비동기 처리

- 아래와 같이 함수와 같이
- ┣ go를 사용해서 사용이 가능함
- ┣ go에 담을 함수 목록이
- ┣ `Promise`나 `일반 함수` 이더라도 아무런 차이점이 없음

```js
_go(square(10), square, square, square, console.log);
```

## Promise만으로 처리가 어려운 비동기

```js
new Promise(function (resolve) {
	(function recur() {
		if (list.length === res.length) return resolve(res);
		square(list[res.length]).then(function (val) {
			res.push(val);
			recur(res);
		});
	})([]);
}).then(function (res) {
	console.log;
});
```

- 위와 같은 코드는 `명령형 프로그래밍`임
- ┣ 함수형 프로그래밍을 이용하면 좀 더 쉽게 처리 가능
- ┣ 여러번 실행 하는 것도 문제가 없음

```js
_.go(list, _.map(square), _.map(square), console.log);
```
