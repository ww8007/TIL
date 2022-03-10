## 최소값 구하기

```js
let ans = Math.min(...arr);
let ans = Math.min.apply(null, arr);
// null : 객체
return ans;
```

## 최소값 초기화

```js
// 다음과 같이 초기화 시켜주는 것이 좋음
let min = Number.MAX_SAFE_INTEGER;
```

## Arr.spice

- index를 기준으로 하기 때문에
- ┣ 첫 번째 삭제 기준 인덱스 보다
- ┣ 후에 값이 있는 경우의 인덱스를
- ┣ 삭제 해버리면 원하는 값이 아님
- ┣ 고로 뒤에 부터 삭제

## 정규 표현식

> A를 #으로 변경

```js
ans.replace(/A/g, '#');
```

## 아스키 코드로 변형

```js
let num = x.charCodeAt();
```
