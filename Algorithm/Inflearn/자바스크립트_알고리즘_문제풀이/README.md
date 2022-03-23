#

## 1,2차원 배열탐색

### Array.from

- 콜백 함수를 이용한 n 까지 1

```js
let answer = Array.from({ length: n }, () => 1);
```

## 문자열 탐색

- 1. split을 통해 문자열로 자르고
- 2. reverse를 통해 뒤집고
- 3. join을 이용해서 다시 배열로 합치기

```js
input.split('').reverse().join('');
const solution2 = (input) => {
	let ans = 'YES';
	input = input.toLowerCase();
	if (input.split('').reverse().join('') !== input) return 'NO';
	return ans;
};
```

### 정규 표현식

```js
// ^ : 부정의 의미
// a 부터 z 까지 /g 전역에서
// 특수문자를 제거함
s = s.toLowerCase().replace(/[^a-z]/g, '');
```

### parseInt 사용 안하기

```js
ans = ans * 10 + Number(item);
ans = a.replace(/[^1-9]/g, '');
```

## 브루트포스

### 소수 구하기

> 뒤집어서 다시 숫자로 변환

```js
let reverse = item.toString().split('').reverse().join('');
```

- sqrt : 제곱근을 이용해서
- o √N 의 시간 복잡도를 가지게 됨

```js
const isPrime = (num) => {
	if (num === 1) return false;
	for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
		if (!(num % i)) return false;
	}
	return true;
};
```

### K번째 큰 수

- Set의 자료구조 이용

```js
let tmp = new Set();
tmp.add(card[i] + card[j] + card[k]);
let ans = Array.from(tmp).sort((a, b) => b - a);
```
