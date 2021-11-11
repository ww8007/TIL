# 37. Set과 Map

## 목차

- [37. Set과 Map](#37-set%EA%B3%BC-map)
  - [37.1 Set](#371-set)
    - [37.1.1 Set 객체의 생성](#3711-set-%EA%B0%9D%EC%B2%B4%EC%9D%98-%EC%83%9D%EC%84%B1)
    - [37.1.2 요소 개수 확인](#3712-%EC%9A%94%EC%86%8C-%EA%B0%9C%EC%88%98-%ED%99%95%EC%9D%B8)
    - [37.1.3 요소 추가](#3713-%EC%9A%94%EC%86%8C-%EC%B6%94%EA%B0%80)
    - [37.1.4 요소 존재 여부 확인](#3714-%EC%9A%94%EC%86%8C-%EC%A1%B4%EC%9E%AC-%EC%97%AC%EB%B6%80-%ED%99%95%EC%9D%B8)
    - [37.1.5 요소 삭제](#3715-%EC%9A%94%EC%86%8C-%EC%82%AD%EC%A0%9C)
    - [37.1.6 요소 일괄 삭제](#3716-%EC%9A%94%EC%86%8C-%EC%9D%BC%EA%B4%84-%EC%82%AD%EC%A0%9C)
    - [37.1.7 요소 순회](#3717-%EC%9A%94%EC%86%8C-%EC%88%9C%ED%9A%8C)
    - [37.1.8 집합 연산](#3718-%EC%A7%91%ED%95%A9-%EC%97%B0%EC%82%B0)
      - [교집합](#%EA%B5%90%EC%A7%91%ED%95%A9)
      - [합집합](#%ED%95%A9%EC%A7%91%ED%95%A9)
      - [차집합](#%EC%B0%A8%EC%A7%91%ED%95%A9)
      - [부분 집합과 상위 집합](#%EB%B6%80%EB%B6%84-%EC%A7%91%ED%95%A9%EA%B3%BC-%EC%83%81%EC%9C%84-%EC%A7%91%ED%95%A9)
  - [37.2 Map](#372-map)
    - [37.2.1 Map 객체의 생성](#3721-map-%EA%B0%9D%EC%B2%B4%EC%9D%98-%EC%83%9D%EC%84%B1)
    - [37.2.2 요소 개수 확인](#3722-%EC%9A%94%EC%86%8C-%EA%B0%9C%EC%88%98-%ED%99%95%EC%9D%B8)
    - [37.2.3 요소 추가](#3723-%EC%9A%94%EC%86%8C-%EC%B6%94%EA%B0%80)
    - [37.2.4 요소 취득](#3724-%EC%9A%94%EC%86%8C-%EC%B7%A8%EB%93%9D)
    - [37.2.5 요소 존재 여부 확인](#3725-%EC%9A%94%EC%86%8C-%EC%A1%B4%EC%9E%AC-%EC%97%AC%EB%B6%80-%ED%99%95%EC%9D%B8)
    - [37.2.6 요소 삭제](#3726-%EC%9A%94%EC%86%8C-%EC%82%AD%EC%A0%9C)
    - [37.2.7 요소 일괄 삭제](#3727-%EC%9A%94%EC%86%8C-%EC%9D%BC%EA%B4%84-%EC%82%AD%EC%A0%9C)
    - [37.2.8 요소 순회](#3728-%EC%9A%94%EC%86%8C-%EC%88%9C%ED%9A%8C)

## 37.1 Set

- Set 객체 : `중복되지 않는 유일한 값들의 집합(set)`
- ┣ 배열과 유사하지만
- ┗ 다음과 같은 차이점이 존재함

| 구분                           | 배열 | Set 객체 |
| ------------------------------ | ---- | -------- |
| 동일한 값을 중복하여 포함 가능 | O    | X        |
| 요소 순서에 의미가 있음        | O    | X        |
| 인덱스로 요소에 접근 가능      | O    | X        |

- 이러한 Set 객체의 특성 :
- ┣ 수학적 집합의 특성과 일치함
- ┣ Set : 수학적 집합을 구현하기 위한 자료구조임
- ┗ Set을 통해 `교집합, 합집합, 여집합 등을 구현 가능함`

### 37.1.1 Set 객체의 생성

- Set 객체 : Set 생성자 함수로 생성함
- ┣ Set 생성자 함수에 `인수를 전달하지 않으면`
- ┗ `빈 Set 객체가 생성됨`

```js
const set = new Set();
console.log(set); // Set(0) {}
```

- Set 생성자 함수 :
- ┣ `이터러블을 인수로 전달받아`
- ┣ `Set 객체를 생성함`
- ┣ 이때 이터러블의 중복된 값은
- ┗ `Set 객체에 요소로 저장되지 않음`

```js
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {'h', 'e', 'l', 'o'}
```

- 중복을 허용하지 않는 Set 객체의 특성을 사용하여
- ┗ `배열에서 중복된 요소를 제거가 가능함`

```js
// 배열의 중복 요소 제거
const uniq = (array) => array.filter((v, i, set) => self, indexOf(v) === i);

// Set을 사용한 배열의 중복 요소 제거
const uniq = (array) => [...new Set(array)];
console.log(uniq[(2, 1, 2, 3, 4, 3, 4)]); // [2, 1, 3, 4]
```

### 37.1.2 요소 개수 확인

- Set 객체의 `요소 개수`를 확인할 때 :
- ┗ `Set.prototype.size 프로퍼티를 사용함`

```js
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

- size 프로퍼티 : setter 함수없이
- ┣ getter 함수만 존재하는 → `접근자 프로퍼티임`
- ┣ 따라서 size 프로퍼티에 숫자를 할당하여
- ┗ `Set 객체의 요소 개수 변경이 불가능함`

```js
const set = new Set([1, 2, 3]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: f}

set.size = 10; // 무시됨
console.log(set.size); // 3
```

### 37.1.3 요소 추가

- Set 객체에 요소를 추가할 때
- ┗ `Set.prototype.add 메서드를 사용함`

```js
const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}
```

- add 메서드 : 새로운 요소가 추가된
- ┣ Set 객체를 반환함
- ┣ 따라서 : add 메서드를 호출한 후에
- ┣ `add 메서드를 연속적으로 호출`
- ┗ `(method chaining)`할 수 있음

```js
const set = new Set();

set.add(1).add(2);
console.log(set); // Set(2) {1, 2}
```

- Set 객체에 중복된 요소의 추가는 허용되지 않음
- ┗ 이때 에러는 발생되지 않고 무시됨

- `일치 비교 연산자 ===` 을 사용하면
- ┣ `NaN과 NaN을 다르다고 평가함`
- ┣ 하지만 Set 객체는 NaN과 NaN을 같다고
- ┣ `평가하여 중복 추가를 허용하지 않음`
- ┣ `+0과 -0`도 동일하게 일치 비교 연산자 ===을
- ┗ 같다고 평가하여 중복 추가를 허용하지 않음

```js
const set = new Set();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

// NaN과 NaN을 같다고 평가하여
// 중복 추가를 허용하지 않음
set.add(NaN).add(NaN);
```

- Set 객체 : 객체나 배열과 같이
- ┗ `JS의 모든 값을 요소로 지정이 가능함`

```js
const set = new Set();

set
	.add(1)
	.add('a')
	.add(true)
	.add(undefined)
	.add(null)
	.add({})
	.add([])
	.add(() => {});
```

### 37.1.4 요소 존재 여부 확인

- Set 객체에 특정 요소가 존재하는
- ┣ 확인하려면 → `Set.prototype.has 메서드 사용`
- ┣ has 메서드 : `특정 요소의 존재 여부를 나타내는`
- ┗ `불리언 값을 반환함`

```js
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

### 37.1.5 요소 삭제

- Set 객체의 특정 요소를 삭제하려면
- ┣ `Set.prototype.delete 메서드를 사용함`
- ┣ `delete 메서드` : 삭제 성공 여부를 나타내는
- ┗ `불리언 값을 반환함`

- `delete 메서드` : 인덱스가 아닌
- ┣ `삭제하려는 요소 값을 인수로 전달해야 함`
- ┣ Set 객체 : 순서에 의미가 없음
- ┗ `배열과 같이 인덱스를 갖지 않음`

```js
const set = new Set([1, 2, 3]);

// 요소 2를 삭제함
set.delete(2);
console.log(set); // Set(2) {1, 3}

// 요소 1을 삭제함
set.delete(1);
console.log(set); // Set(1) {3}
```

- 만약 `존재하지 않는 Set 요소를 삭제하면`
- ┗ `에러 없이 무시됨`

> delete 메서드

    add 메서드와 다르게
    ┣ 결과값으로 불리언 값을 반환함
    ┣ 고로 method chaining 불가
    ┗ 연속적인 호출이 불가함

### 37.1.6 요소 일괄 삭제

- Set 객체의 `모든 요소를 일괄 삭제하려면`
- ┣ `Set.prototype.clear 메서드 사용`
- ┗ clear 메서드 : `언제나 undefined 반환함`

```js
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```

### 37.1.7 요소 순회

- Set 객체의 요소를 순회하려면
- ┣ `Set.prototype.forEach` 메서드를 사용함
- ┣ `Set.prototype.forEach` 메서드 :
- ┣ `Array.prototype.forEach` 메서드와 유사하게
- ┣ 콜백 함수와 foEach 메서드의 콜백 함수 내부에서
- ┣ `this로 사용될 객체(옵션)를 인수로 전달함`

- ┣ 이때 콜백 함수 : 다음과 같이 3개의 인수 전달받음
- ┣ 1. `현재 순회 중인 요소 값`
- ┣ 2. `현재 순회 중인 요소 값`
- ┗ 3. 현재 순회 중인 `Set 객체 자체`

- 첫 번째 인수와 두 번째 인수는 값은 값임
- ┣ 이러한 구조를 가진 이유 :
- ┣ `Array.prototype.forEach 메서드와`
- ┣ `인터페이스를 통일하기 위함임(다른 의미 없음)`
- ┣ Array.prototype.forEach 메서드의 콜백 함수 :
- ┣ `두 번째 인수로 현재 순회 중인 요소의 인덱스를 전달 받음`
- ┣ 하지만 `Set 객체 : 순서에 의미가 없기에`
- ┗ `배열과 같이 인덱스를 가지지 않음`

```js
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));

//
// 1 1 Set(3) {1, 2, 3}
// 2 2 Set(3) {1, 2, 3}
// 3 3 Set(3) {1, 2, 3}
//
```

- Set 객체 : `이터러블임`
- ┣ 따라서 `for...of 문으로 순회가 가능함`
- ┗ `스프레드 문법과 배열 디스트럭처링 대상도 가능함`

```js
const set = new Set([1, 2, 3]);

// Set 객체 : Set.prototype의
// Symbol.iterator 메서드를 상속받는 이터러블임
console.log(Symbol.iterator in set); // true

// 이러터블인 Set 객체 : for...of 문으로 순회 가능함
for (const value of set) {
	console.log(value); // 1 2 3
}

// 이터러블인 Set 객체 :
// 스프레드 문법의 대상이 될 수 있음
console.log([...set]); // [1, 2, 3]

// 이터러블인 Set 객체 :
// 배열 디스트럭처링 할당의 대상이 될 수 있음
const [a, ...rest] = set;
console.log(a, rest); // 1, [2, 3]
```

- Set 객체 : 요소의 순서에 의미를 갖지 않지만
- ┣ Set 객체를 순회하는 순서 : `요소가 추가된`
- ┣ `순서를 따르고 있음`
- ┣ 이는 ECMAScript 사양에 규정되어 있지 않지만
- ┗ `다른 이터러블의 순회와 호환성을 유지하기 위해서임`

### 37.1.8 집합 연산

- Set 객체 : `수학적 집합을 구현하기 위한`
- ┣ 자료구조임
- ┣ 따라서 : Set 객체를 통한
- ┣ 1. `교집합`
- ┣ 2. `합집합`
- ┣ 3. `차집합` 등을 구현이 가능함
- ┗ 집합 연산을 수행하는 프로토타입 메서드 구현

#### 교집합

- 교집합 : 집합 A 와 B의 공통 요소로 구성됨

```js
Set.prototype.intersection = function (set) {
	const result = new Set();

	for (const value of set) {
		// 2개의 set 요소가 공통되는 요소이면
		// 교집합의 대상임
		if (this.has(value)) result.add(value);
	}
	return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// SetA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
```

- 또는 다음과 같은 방법으로도 가능함

```js
Set.prototype.intersection = function (set) {
	return new Set([...this].filter((v) => set.has(v)));
};
```

#### 합집합

- 합집합 : 집합 A와 집합 B의 중복 없는 모든 요소로 구성됨

```js
Set.prototype.union = function (set) {
	// this(Set) 객체를 복사
	const result = new Set(this);

	for (const value of set) {
		// 합집합 : 2개의 Set 객체의 모든 요소로
		// 구성된 집합임, 중복 요소 포함 X
		result.add(value);
	}

	return result;
};
```

- 또는 다음과 같은 방법으로도 구현이 가능함

```js
Set.prototype.union = function (set) {
	return new Set([...this, ...set]);
};
```

#### 차집합

- 차집합 : 집합 A에는 존재하지만 집합 B에는 존재하지 않는 요소

```js
Set.prototype.difference = function (set) {
	// this (Set 객체)를 복사
	const result = new Set(this);

	for (const value of set) {
		// 차집합 : 어느 한쪽 집합에는 존재하지만
		// 다른 한쪽 집합에는 존재하지 않는
		// 요소로 구성된 집합임
		result.delete(value);
	}

	return result;
};
```

- 또는 다음과 같은 방법으로 구현 가능함

```js
Set.prototype.difference = function (set) {
	return new Set([...this].filter((v) => !set.has(v)));
};
```

#### 부분 집합과 상위 집합

- 집합 A가 집합 B에 포함되는 경우
- ┣ 집합 A → 집합 B의 `부분집합(subset)`
- ┗ 집합 B : 집합 A의 `상위 집합 superset임`

```js
// this가 subset의 상위 집합인지 확인함
Set.prototype.isSuperset = function (subset) {
	for (const value of subset) {
		// superset의 모든 요소가
		// subset의 모든 요소를 포함하는지 확인
		if (!this.has(value)) return false;
	}

	return true;
};
```

- 또는 다음과 같은 방법도 가능함

```js
// this가 subset의 상위 집합인지 확인함
Set.prototype.isSuperset = function (subset) {
	const supersetArr = [...this];
	return [...subset].every((v) => supersetArr.includes(v));
};
```

## 37.2 Map

- Map 객체 : `키와 값의 쌍으로 이루어진 컬렉션`
- ┣ Map 객체는 객체와 유사 하지만
- ┗ 다음과 같은 차이가 있음

| 구분                   | 객체                      | Map 객체              |
| ---------------------- | ------------------------- | --------------------- |
| 키로 사용할 수 잇는 값 | 문자열 또는 심벌 값       | 객체를 포함한 모든 값 |
| 이터러블               | X                         | O                     |
| 요소 개수 확인         | `Object.keys(obj).length` | `map.size`            |

### 37.2.1 Map 객체의 생성

- Map 객체 : Map 생성자 함수로 생성함
- ┣ `Map 생성자 함수에 인수를 전달하지 않으면`
- ┗ `빈 Map 객체가 생성됨`

```js
const map = new Map();
console.log(map); // Map(0) {}
```

- Map 생성자 함수 : `이터러블을 인수로 전달받아`
- ┣ Map 객체를 생성함
- ┣ 이때 인수로 전달되는 이터러블 :
- ┗ `키와 값의 쌍으로 이루어진 요소로 구성되어야 함`

```js
const map1 = new Map([
	['key1', 'value1'],
	['key2', 'value2'],
]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" : "value2"}

const map2 = new Map([1, 2]); // TypeError
```

- Map 생성자 함수의 인수로 전달한
- ┣ 이터러블에 중복된 키를 갖는 요소가 있으면
- ┣ 덮어씌워짐
- ┗ 고로 : `중복된 키를 갖는 요소가 존재 불가함`

### 37.2.2 요소 개수 확인

- Map 객체의 `요소 개수`를 확인할 때
- ┗ `Map.prototype.size 프로퍼티를 사용함`

```js
const { size } = new Map([
	['key1', 'value1'],
	['key2', 'value2'],
]);
console.log(size); //2
```

- size 프로퍼티 : setter 함수없이
- ┣ `getter 함수만 존재하는`
- ┣ `접근자 프로퍼티임`
- ┗ `따라서 할당하여 요소를 변경 불가`

### 37.2.3 요소 추가

- Map 객체에 요소를 추가할 때 :
- ┗ `Map.prototype.set 메서드를 사용`

```js
const map = new Map();
console.log(map); // Map(0) {}

map.set('key1', 'value1');
console.log(map); // Map(1) {"key1" => "value1"}
```

- set 메서드 : 새로운 요소가 추가된
- ┣ `Map 객체를 반환함`
- ┣ 고로 `method chaining 사용 가능`
- ┗ 연속적으로 호출이 가능함

```js
const map = new Map();

map.set('key1', 'value1').set('key2', 'value2');
```

> Map도 Set가 동일함

    1. 중복된 요소를 갖지 않음
    ┣ 중복된 키 값 덮어씌워짐
    2. 일치 비교 연산자 ===
    ┣ NaN, +0, -0의 경우도
    ┣ 같다고 평가하여
    ┗ 중복 추가를 허용하지 않음

- 객체 : 문자열 또는 심벌 값만 키로 사용 가능
- ┣ 하지만 Map 객체의 경우 키 타입에 제한이 없음
- ┣ 따라서 → `객체를 포함한 모든 값을 키로 사용 가능`
- ┗ `이는 Map 객체와 일반 객체의 가장 큰 차이점`

```js
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

// 객체도 키로 사용가능함
map.set(lee, 'developer');
map.set(kim, 'designer');

console.log(map);
// Map(2) {{name: "Lee"} => "developer"}, {{name: "kim"}=> "designer"}
```

### 37.2.4 요소 취득

- Map 객체에서 특정 요소를 취득하려면
- ┣ Map.prototype.get 메서드를 사용함
- ┣ `get 메서드의 인수로 키를 전달하면`
- ┣ `Map 객체에서 인수로 전달한 키를 갖는 값을 반환함`
- ┗ 존재 X → `undefined 반환함`

```js
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```

### 37.2.5 요소 존재 여부 확인

- Map 객체에 특정 요소가 존재하는지
- ┣ 확인하려면
- ┣ `Map.prototype.has 메서드`를 사용함
- ┣ `has 메서드 : 특정 요소의 존재 여부를`
- ┗ `불리언 값으로 반환함`

```js
console.log(map.has(lee)); // true
console.log(map.has('key')); // false
```

### 37.2.6 요소 삭제

- Map 객체의 요소를 삭제하려면
- ┣ `Map.prototype.delete 메서드`를 사용함
- ┣ delete 메서드 : 삭제 성공 여부를 나타내는
- ┗ `불리언 값을 반환함`

```js
map.delete(kim);
```

- 만약 존재하지 않는 키로
- ┣ Map 객체의 요소를 삭제하려 하면
- ┗ `에러 없이 무시됨`

```js
const map = new Map([['key1', 'value1']]);

// 존재하지 않는 키 'key2'로 요소를 삭제하려 하면
// 에러 없이 무시됨
map.delete('key2');
```

> delete 메서드 : 불리언 값 반환

    고로 : set 메서드와 다르게
    ┗ method chaining 불가함

### 37.2.7 요소 일괄 삭제

- Map 객체의 요소를 일괄 삭제하려면
- ┣ `Map.prototype.clear 메서드를 사용함`
- ┗ clear 메서드 : `언제나 undefined 반환함`

```js
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};

const map = new Map([[lee: 'developer'], [kim: 'designer']]);

map.clear();
console.log(map); // Map(0) {}
```

### 37.2.8 요소 순회

- Map 객체의 요소를 순회하려면
- ┣` Map.prototype.forEach 메서드를 사용함`
- ┣ Array.prototype.forEach 메서드와 비슷함
- ┣ 3개의 인수를 전달받음
- ┣ 1. `현재 순회 중인 요소값`
- ┣ 2. `현재 순회 중인 요소키`
- ┗ 3. `현재 순회 중인 Map 자체`

```js
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};

const map = new Map([[lee: 'developer'], [kim: 'designer']]);

map.forEach((v,k, map) => console.log(v, k, map));
```

- Map 객체 : 이터러블
- ┣ `for...of 문으로 순회 가능`
- ┣ `스프레드 문법` 사용 가능
- ┗ `디스트럭처링` 대상 가능

```js
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};

const map = new Map([[lee: 'developer'], [kim: 'designer']]);

// Map 객체 : Map.prototype의
// Symbol.iterator 메서드를 상속받는
// 이터러블임
console.log(Symbol.iterator in map); // true

// 이터러블인 Map 객체 :
// for...of 문을 사용 가능함
for (const entry of map) {
    console.log(entry); //[{name: "Lee"}, "developer"] [{name: "Kim"}, "designer"]
}

// 이터러블인 Map 객체 :
// 스프레드 문법의 대상이 될 수 있음
console.log([...map]);

// 이터러블인 Map 객체 :
// 배열 디스트럭처링 할당의 대상이 될 수 있음
const [a, b] = map;
console.log(a,b);
```

- Map 객체 : `이터러블이면서 동시에`
- ┗ `이터레이터인 객체를 반환하는 메서드`를 제공함

| Map 메서드            | 설명                                                                              |
| --------------------- | --------------------------------------------------------------------------------- |
| Map.prototype.keys    | Map 객체에서 요소키를 갖는 이터러블이면서 <br/> 동시에 이터레이터인 객체를 반환함 |
| Map.prototype.values  | Map 객체에서 요소키를 갖는 이터러블이면서 <br/> 동시에 이터레이터인 객체를 반환함 |
| Map.prototype.entries | Map 객체에서 요소키를 갖는 이터러블이면서 <br/> 동시에 이터레이터인 객체를 반환함 |

```js
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};

const map = new Map([[lee: 'developer'], [kim: 'designer']]);

// Map.prototype.keys는 Map 객체에서
// 요소키를 값으로 갖는 이터레이터를 반환함
for (const key of map.keys()) {
    console.log(key); // {name: "Lee"} {name: "Kim"}
}

// Map.prototype.values는 Map 객체에서
// 요소키를 값으로 갖는 이터레이터를 반환함
for (const value of map.values()) {
    console.log(value); // developer designer
}

// Map.prototype.entries는 Map 객체에서
// 요소키를 값으로 갖는 이터레이터를 반환함
for (const entry of map.entries()) {
    console.log(entry); // 요소 전체
}
```

- Map 객체 : 요소 순서에 의미를 갖지 않지만
- ┣ `객체를 순회하는 순서 : 요소가 추가된 순서를 따름`
- ┣ ECMAScript 사양에 규정되어 있지 않지만
- ┗ `이터러블의 순회와 호환성을 유지하기 위함`
