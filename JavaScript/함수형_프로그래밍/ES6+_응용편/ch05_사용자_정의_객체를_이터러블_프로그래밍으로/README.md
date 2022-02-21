# 5. 사용자 정의 객체를 이터러블 프로그래밍으로

## 목차

- [5. 사용자 정의 객체를 이터러블 프로그래밍으로](#5-사용자-정의-객체를-이터러블-프로그래밍으로)
  - [목차](#목차)
  - [Map, Set](#map-set)
  - [Model, Collection](#model-collection)
    - [Product, Products 메서드를 함수형으로 구현하기](#product-products-메서드를-함수형으로-구현하기)

## Map, Set

- 사실상 사용자 정의 객체와 다를바 없음

```js
let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);
// console.log([...m.entries()]);
// console.log([...m.keys()]);
// console.log([...m.values()]);

_.go(
	m,
	L.filter(([k, v]) => v % 2),
	_.takeAll,
	(entries) => new Map(entries),
	console.log
);
```

> Set도 동일함

```js
let s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;
console.log(_.reduce(add, s));
```

## Model, Collection

- 객체지향 프로그래밍을 하더라도
- ┣ 이터러블 프로그래밍이 가능함

- JS가 있고
- ┣ `Document.querySelector`
- ┣ `Node file` 같은
- ┣ `객체 지향`으로 만들어진
- ┣ 값들을 `이터러블로 다룰 수 있음`

- `이터러블 패러다임`이
- ┣ `객체지향 프로그래밍을 대체 하는 것은 아님`
- ┣ class 안의 메서드가 있을 수 있음
- ┣ `메서드 내부에 구현되는 코드`를
- ┣ `함수형으로 작성`이 가능함
- ┣ `큰 패러다임은 객체지향을 따라 가지만`
- ┣ 안에 적는 `세부 내용들은 이터러블 프로그래밍`
- ┣ `return 값이 이터러블`이면 사용 가능

> 함수형은 언어 자체를 대체 하는 것

- `for`, `if`, `i++`을 대체하는 것이라고 생각하면 좋음

```js
class Model {
	constructor(attrs = {}) {
		this._attrs = attrs;
	}
	get(k) {
		return this._attrs[k];
	}
	set() {
		this._attrs[k] = v;
		return this;
	}
}

class Collection {
	constructor(models = []) {
		this._models = models;
	}
	at(idx) {
		return this._models[idx];
	}
	add(model) {
		this._models.push(model);
		return this;
	}
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));
console.log(coll.at(2).get('name'));
```

> 지금은 collection을 돌며 확인이 힘듬

```js
// 좋은 코드는 아님
// 이터러블을 지원하도록 작성하는게 더 좋음
_.go(
	L.range(3),
	L.map((i) => coll.at(i)),
	L.map((m) => m.get('name')),
	_.each(console.log)
);
```

> Collection Class가 이터러블을 지원하도록 작성

- 자신을 대표하는 동작을
- ┣ `[Symbol.iterator]()`를
- ┣ 통해서 작성해주는 것이 좋음

```js
class Collection {
	constructor(models = []) {
		this._models = models;
	}
	at(idx) {
		return this._models[idx];
	}
	add(model) {
		this._models.push(model);
		return this;
	}
	// 가장 중요한 부분
	// 주석 부분은 모두 같은 코드임
	*[Symbol.iterator]() {
		// for (const model of this._models) {
		// 	yield model;
		// }
		yield* this._models;
	}
	[Symbol.iterator]() {
		return this._models[Symbol.iterator]();
	}
}
```

### Product, Products 메서드를 함수형으로 구현하기

- Collection 자체가
- ┣ 이터러블을 반환하기 때문에
- ┣ 아래와 같이 컬렉션 중심의
- ┣ 프로그래밍이 가능해짐

```js
class Product extends Model {}

class Products extends Collection {
	totalPrice() {
		return _.go(
			this,
			L.map((p) => p.get('price')),
			_.reduce((a, b) => a + b)
		);
	}
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());
```

> 결론

    ┣ 1. 사용자 정의 객체를
    ┣ 어떻게 이터러블화
    ┣ 2. 메서드를 이터러블 함수의
    ┣ 조합으로 구현을 해 나가는 것

> 사용자 정의 함수를 만들어서 설정

```js
const addAll = _.reduce(add);

class Products extends Collection {
	getPrices() {
		return L.map((p) => p.get('price', this));
	}
	totalPrice() {
		return addAll(this.getPrices());
	}
}
```
