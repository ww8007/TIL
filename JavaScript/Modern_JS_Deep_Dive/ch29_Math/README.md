# 29. Math

- `표준 빌트인 객체인 Math` : 수학적인 상수와
- ┣ 함수를 위한 `프로퍼티와 메서드를 제공`
- ┣ Math는 생성자 함수가 아님
- ┗ 고로 → 정적 프로퍼티와 정적 메서드만을 제공

## 목차

- [29. Math](#29-math)
  - [목차](#목차)
  - [29.1 Math 프로퍼티](#291-math-프로퍼티)
    - [29.1.1 Math.PI](#2911-mathpi)
  - [29.2 Math 메서드](#292-math-메서드)
    - [29.2.1 Math.abs](#2921-mathabs)
    - [29.2.2 Math.round](#2922-mathround)
    - [29.2.3 Math.ceil](#2923-mathceil)
    - [29.2.4 Math.floor](#2924-mathfloor)
    - [29.2.5 Math.sqrt](#2925-mathsqrt)
    - [29.2.6 Math.random](#2926-mathrandom)
    - [Math.pow](#mathpow)
    - [Math.max](#mathmax)
    - [Math.min](#mathmin)

## 29.1 Math 프로퍼티

### 29.1.1 Math.PI

- 원주율 PI 값을 반환함

```js
MATH.PI; // 3.1415926
```

## 29.2 Math 메서드

### 29.2.1 Math.abs

- `Math.bas 메서드` :
- ┣ 인수로 전달된 숫자의 `절대값(absolute value)를 반환`
- ┗ 절대값은 반드시 `0 또는 양수여야 함`

### 29.2.2 Math.round

- Math.round 메서드 : 인수로 전달된 숫자의 소수점
- ┗ `이하를 반올림한 정보를 반환함`

```js
Math.round(1.4); // 1
Math.round(1.6); // 1
Math.round(-1.4); // -1
Math.round(-1.4); // -2
Math.round(1); // 1
Math.round(); // NAN
```

### 29.2.3 Math.ceil

- Math.ceil 메서드 : 인수로 전달된 숫자의
- ┣ `소수점 이하를 올림한 정수를 반환함`
- ┣ 소수점 이하를 올림하면
- ┗ 더 큰 정수가 됨

```js
Math.ceil(1.2); // 2
Math.ceil(-1.4); // -1
```

### 29.2.4 Math.floor

- Math.floor 메서드 : 인수로 전달된 숫자의
- ┣ 소`수점 이하를 내림한 정수를 반환함`
  ┗ 소수점 이하를 내림하면 더 작은 정수가 됨

```js
Math.floor(1.9); //1
Math.floor(-1.9); //-2
```

### 29.2.5 Math.sqrt

- Math.sqrt 메서드 : 인수로 전달된
- ┗ 숫자의 제곱근을 반환함

```js
Math.sqrt(9); //3
Math.sqrt(-9); // NaN
```

### 29.2.6 Math.random

- Math.random 메서드 : 임의의 난수를 반환
- ┣ Math.random 메서드가 반환한 난수 :
- ┣ 0에서 1미만의 실수
- ┗ 즉 : 0은 포함되지만 1은 포함 X

```js
Math.random(); // 0 에서 1 미만의 랜덤실수

// 1 에서 10 랜덤 정수 취득
// Math.random 을 통해서 0에서 1 미만의 랜덤 실수
// 10을 곱해서 0 부터 10 미만 까지 랜덤 실수
// 1을 더해서 1 부터 10까지 랜덤 실수
// Math.floor를 사용해서 소수점 이하 때어내고 랜덤 정수

const random = Math.floor(Math.random() * 10 + 1);
console.log(random);
```

### Math.pow

- Math.pow 메서드 :
- ┣ 첫 번째 인수로 `밑(base)`
- ┣ 두 번째 인수로 `지수 exponent로 거듭제곱`한
- ┗ `결과를 반환함`

```js
Math.pow(2, 8); // 256
Math.pow(2, -1); // 0.5
Math.pow(2); // NaN
```

> Math.pow 대신 ES7의 지수 연산자가 가독성이 더 좋음

```js
// ES7 지수 연산자
2 ** (2 ** 2); // 16
Math.pow(Math.pow(2, 2), 2); // 16
```

### Math.max

- Math.max 메서드 :
- ┣ 전달받은 인수 중에서 `가장 큰 수를 반환`
- ┗ 인수가 `전달되지 않으면` : `-Infinity를 반환`

```js
Math.max(1); // 1
Math.max(1, 2); // 2
Math.max(1, 2, 3); // 3
Math.max(); // -Infinity
```

- 배열을 인수로 전달받아 배열 요소 중에서 최대값
- ┣ `Function.prototype.apply` 메서드 또는 (22.2.4)
- ┗ `스프레드 문법`을 사용해야 함

```js
// 배열 요소 중에서 최대값 취득
Math.max.apply(null, [1, 2, 3]); // 3

// ES6 스프레드 분법
Math.max(...[1, 2, 3]); // 3
```

### Math.min

- Math.min 메서드 :
- ┣ 전달받은 인수 중에서 `가장 작은 수를 반환`
- ┗ 인수가 `전달되지 않으면` : `Infinity를 반환`

```js
Math.min(1); // 1
Math.min(1, 2); // 2
Math.min(1, 2, 3); // 3
Math.min(); // -Infinity
```

- 배열을 인수로 전달받아 배열 요소 중에서 최소값
- ┣ `Function.prototype.apply` 메서드 또는 (22.2.4)
- ┗ `스프레드 문법`을 사용해야 함

```js
// 배열 요소 중에서 최소값 취득
Math.min.apply(null, [1, 2, 3]); // 1

// ES6 스프레드 분법
Math.min(...[1, 2, 3]); // 1
```
