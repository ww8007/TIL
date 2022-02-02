# 목차

- [2. 함수형으로 전환하기](#2-%ED%95%A8%EC%88%98%ED%98%95%EC%9C%BC%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0)
  - [위 함수들을 함수형 프로그래밍으로 변경](#%EC%9C%84-%ED%95%A8%EC%88%98%EB%93%A4%EC%9D%84-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD)
  - [다향성](#%EB%8B%A4%ED%96%A5%EC%84%B1)
    - [응용형 함수의 장점](#%EC%9D%91%EC%9A%A9%ED%98%95-%ED%95%A8%EC%88%98%EC%9D%98-%EC%9E%A5%EC%A0%90)
  - [커링](#%EC%BB%A4%EB%A7%81)
  - [get 함수](#get-%ED%95%A8%EC%88%98)
  - [reduce 리듀서](#reduce-%EB%A6%AC%EB%93%80%EC%84%9C)
    - [slice rest 만들기](#slice-rest-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - [파이프라인, `_go`, `_pipe`, 화살표 함수](#%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-_go-_pipe-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98)
      - [go 함수](#go-%ED%95%A8%EC%88%98)
      - [응용 명령형 -> 리펙터링](#%EC%9D%91%EC%9A%A9-%EB%AA%85%EB%A0%B9%ED%98%95---%EB%A6%AC%ED%8E%99%ED%84%B0%EB%A7%81)
      - [부록 : 화살표 함수 사용](#%EB%B6%80%EB%A1%9D--%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9)
  - [다형성 높이기](#%EB%8B%A4%ED%98%95%EC%84%B1-%EB%86%92%EC%9D%B4%EA%B8%B0)
    - [`_keys` 만들기](#_keys-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - [`_each` 외부 다향성 높이기](#_each-%EC%99%B8%EB%B6%80-%EB%8B%A4%ED%96%A5%EC%84%B1-%EB%86%92%EC%9D%B4%EA%B8%B0)

# 2. 함수형으로 전환하기

```js
var users = [
	{ id: 1, name: 'ID', age: 36 },
	{ id: 2, name: 'ID', age: 32 },
	{ id: 3, name: 'ID', age: 32 },
	{ id: 4, name: 'ID', age: 27 },
	{ id: 5, name: 'ID', age: 25 },
	{ id: 6, name: 'ID', age: 26 },
	{ id: 7, name: 'ID', age: 31 },
	{ id: 8, name: 'ID', age: 23 },
];

// 명령형 코드

// 1. 30세 이상인 users를 거름
var temp_users = [];
for (var i =0; i< user.length; i++){
    if (users[i].age > = 30){
        temp_users.push(users[i]);
    }
}

console.log(temp_users);

// 2. 30세 이상인 users의 name을 수집
var names = [];
for (var i =0; i< temp_users.length; i++) {
    names.push(temp_users[i].name);
}

console.log(names);
```

```js
// 30세 미만인 user 거름
var temp_users = [];
for (var i =0; i< user.length; i++){
    if (users[i].age > = 30){
        temp_users.push(users[i]);
    }
}
```

## 위 함수들을 함수형 프로그래밍으로 변경

- 함수형 프로그래밍의 특징
- ┣ `변형된 새로운 값`을
- ┗ `return 하는 식`으로 코드가 구성됨

- `_filter` 같은 함수를
- ┗ `응용형`, `적용형` 함수라고 말함

```js
function _filter(users, predict) {
	// 원래 값을 변경하지 않고
	// 새로운 값을 반환
	var new_list = [];
	for (var i = 0; i < user.length; i++) {
		// 조건에 대한 함수를 설정
		// 바깥 함수에 위임
		if (predict(users[i])) {
			new_list.push(users[i]);
		}
	}
	return new_list; // 부수 효과를 없앰
}

console.log(
	_filter(users, function (user) {
		return user.age >= 30;
	})
);
console.log(
	_filter(users, function (user) {
		return user.age < 30;
	})
);

// 다른 동작도 가능
_filter(users, function (user) {
	return num % 2;
});
_filter(users, function (user) {
	return !(num % 2);
});
```

- `추상화의 단위`를 `함수`로 하는 것이
- ┗ `함수형 프로그래밍으로 대체`함

- 새로운 predict 함수를 넘겨주어
- ┣ 함수가 함수를 받아서
- ┣ 원하는 결과 값을 반환 하도록 설정하는 것이
- ┣ filter : 응용형 함수, → 응용형 프로그래밍

- `고차 함수`
- ┣ 1. 함수를 `인자로 받음`
- ┣ 2. `함수 return`
- ┗ 3. `함수 실행`

> 재활용성이 높음

    users → list 일반화 해도 무관함

## `_map` 함수

- mapper라는 함수를 받아서
- ┣ `무엇을 수집해서 넣을 것 인지`
- ┣ 대한 조건을 정하는 것이
- ┗ `_map 함수의 특징`

```js
// 데이터가 어떻게 생겼는지
// 즉 타입이 중요하지 않음
// 재사용성이 극대화 됨
function _map(list, mapper) {
	var new_list = [];
	for (var i = 0; i < list.length; i++) {
		new_list.push(mapper(list[i]));
	}
	return new_list;
}

var over_30 = _filter(users, function(user) {return user.age >=30;});

var names = _map(over_30, function(user) {return user.name};);

var under_30 = _filter(users, function(user) {return user.age < 30;})

var ages = _map(under_30, function(user) {
    return user.age;
})
console.log(ages);


console.log(_map(_filter(users, function(user) {return user.age >=30;}), function(user) {return user.name;}));
console.log(_map(_filter(users, function(user) {return user.age <30;}), function(user) {return user.name;}));
```

- 위와 같은 형식을 사용하면
- ┣ 중간에 대입이 없고
- ┗ 테스트가 쉬운 코드를 완성이 가능함

> 그러나 아직까지 map, filter에 대해 중복되는 코드가 있음

- `_map`, `_filter` 함수 새로 만들기

## `_each` 함수 - map, filter 중복 제거

```js
function _each(list, iter) {
	for (let i = 0; i < list.length; i++) {
		iter(list[i]);
	}
	// 받은 값을 그대로 return
	return list;
}
```

### `_each`를 통한 리펙터링

```js
function _map(list, mapper) {
	const new_list = [];
	_each(list, function (val) {
		new_list.push(mapper(val));
	});
	return new_list;
}

function _filter(list, predi) {
	const new_list = [];
	_each(list, function (val) {
		if (predi(val)) new_list.push(val);
	});
	return new_list;
}
```

## 다향성

- `map, filter, each`는 이미 존재하는 헬퍼 함수임
- ┗ 아래 예제와 같음

```js
// 이미 존재하는 헬퍼 함수임
console.log(
	[1, 2, 3].map(function (val) {
		return val * 2;
	})
);
console.log(
	[1, 2, 3].filter(function (val) {
		return val % 2;
	})
);
```

- 그렇다면 굳이 이렇게 만든 이유:
- ┣ JS의 `map, filter`는 `메서드`임
- ┣ 1. `순수 함수가 아니고`
- ┣ 2. `메서드` : `객체의 상태에 따라`
- ┗ `결과가 달라지게 됨`

> map, filter, `_map`, `_filter`

    메서드 : 해당 클래스에 정의
    ┣ 해당 클래스의 인스턴스에만
    ┗ 사용이 가능하다

- jQuery의 경우 ArrayLike 임
- ┗ Array라고 오해하는 경우가 많음

```js
// 아래와 같이 map을 사용이 불가능 하다.
console.log(
	document.querySelectorAll('*').map(function (node) {
		return node.nodeName;
	})
); //Error: is not a Array
console.log(
	_map(document.querySelectorAll('*').map(function (node) {
		return node.nodeName;
	})
); // 이렇게 가능함
```

- 만든 `_map`을 사용하게 되면
- ┣ 배열이 아니더라도 배열로 만들어줘서
- ┣ 값만 존재하더라도 사용이 가능함
- ┣ `고로 Key, Value 쌍으로 존재하면`
- ┗ `사용이 가능하게 됨`

### 함수가 먼저 나오는 프로그래밍

- `객체 지향에 비해서 유연성을 가짐`
- ┣ `객체`는 데이터가 먼저 있어야만
- ┗ 코드의 실행이 가능해짐

- `함수가 먼저 나오는 프로그래밍`
- ┣ `데이터가 나오기 전 함수가 존재`
- ┣ `함수형 프로그래밍` :
- ┣ 혼자 먼저 존재하기 때문에
- ┣ `데이터가 생기지 않더라도 함수가 존재`하여
- ┗ `평가 시점이 상대적으로 유연해짐`

> 메서드 보다 `다양성`, `실용성` 부분에서 유리

### 응용형 함수의 장점

- predi, iter, mapper 함수
- ┣ 함수의 두 번째 함수를 콜백 함수로 부르는 경향이 있음
- ┣ 콜백 함수 : `어떤 일들을 다 수행`하고
- ┣ `돌려 줄 때 라는 의미로 콜백 함수`로 말한다면

- predicate : `어떤 조건을 return` 하는 함수
- ┣ iter : `돌면서 반복적으로 실행`
- ┗ mapper : `돌면서 mapping 실행`

```js
// 두번 째 함수를 콜백 함수로 부르는 경향이 있음
// 콜백 함수 : 어떤 일을 다 하고 돌려줄 때
// 하지만 함수형 프로그래밍 에서는
// 보조 함수의 이름을 정해주는 것이 좋음
_map([1, 2, 3, 4], function (v) {
	return v + 10;
});
```

- 보조 함수
- ┣ 1. predict
- ┣ 2. iter
- ┗ 3. mapper

> 보조 함수의 이름

     보조 함수의 이름을
     ┣ 따로 지정해 주는 것이 좋음
     ┗ 콜백 함수와의 차이점

- 개발자가 두번 째 함수에 대한
- ┗ 편의성을 가질 수 있음

## 커링

- JS 에는 커링이 지원되지 않지만
- ┣ 1. 일급 함수가 지원되고
- ┣ 2. 평가 시점을 자유롭게 다룰 수 있다는 점에서
- ┗ 커링과 같은 기법을 얼마든지 구현이 가능함

- 함수와 인자를 다루는 기법
- ┣ 함수 `인자가 다 채워지면`
- ┗ `함수를 실행하는 기법`

```js
function _curry(fn) {
	return function (a) {
		return function (b) {
			return fn(a, b);
		};
	};
}
```

- 일반적으로 함수를 정의하지만
- ┣ 커링이 적용 되도록 만들어줌

```js
var add = function (a, b) {
	return a + b;
};

var add = _curry(function (a, b) {
	return a + b;
});

console.log(add(5, 10)); // 15;
var add_10 = add(10);
var add5 = add(5);
console.log(add_10(5));
console.log(add(5)(3));
console.log(add5(3));
```

- 고로 `첫 생성된 함수`를
- ┣ `맨 마지막에 실행` 시키고
- ┣ 받는 인자들을 기억하여서
- ┗ 이를 `함수 계산에 이용하게 됨`

- 본체 함수를 값으로 들고 있다가
- ┣ 원하는 시점까지 기다리고
- ┣ 1. `함수가 함수를 대신 실행`
- ┣ 2. `함수가 함수를 return` 하는 것이
- ┗ `함수형 프로그래밍임`

```js
// 지금은 이 코드가 동작하면
// 함수를 return 하게 됨
console.log(add(1, 2));

function _curry(fn) {
	return function (a, b) {
		if (arguments.length == 2) return fn(a, b);
		return function (b) {
			return fn(a, b);
		};
	};
}
// 위와 같이 설정하면
// 인자가 두개 들어오면 즉시 평가 하도록
// 설정이 가능함

// 삼항 연산자를 통한 리펙터링
function _curry(fn) {
	return function (a, b) {
		return arguments.length == 2
			? fn(a, b)
			: function (b) {
					return fn(a, b);
			  };
	};
}
// 두번째의 경우 클로저로
// 인자를 기억하는 클로저 함수가 되어
// 두번째 인자가 들어오는 경우
// 실행되는 함수로 동작함
```

> 커리

    인자가 모두 들어올 때 까지
    ┣ 원하는 함수를 실행 시키지 않고
    ┗ 클로저 형식으로 동작함

```js
var sub = _curry(function (a, b) {
	return a - b;
});
console.log(sub(10, 5));
// 문제점
// 5 빼기 10이 되어야
// 구조상으로 맞음
var sub10 = sub(10);
console.log(sub10(5));
```

- 고로 curryr 이라는 반대 함수가 존재

```js
function _curryr(fn) {
	return function (a, b) {
		return argument.length === 2
			? fn(a, b)
			: function (b) {
					return fn(b, a);
			  };
	};
}
var sub10 = sub(10);
console.log(sub10(5));
```

## get 함수

- 안전하게 get 해오는 함수
- ┗ 오류 형식에 대한 안전장치를 제공해줌

```js
// obj가 null 인 경우 안전하게 오류 처리
function _get(obj, key) {
	return obj === null ? undefined : obj[key];
}
var users1 = users[0];
console.log(_get(users1, 'name'));

console.log(users[10].name); // Cannot read undefined property
console.log(_get(users[10].name)); // undefined
```

- curry를 이용한 리펙터링

```js
var _get = _curryr(function (obj, key) {
	return obj === null ? undefined : obj[key];
});

// 이름을 맨 앞으로 꺼내서
// 함수를 생성할 수 있음

console.log(_get('name')(users1));

var get_name = _get('name');

console.log(get_name(user1));
console.log(get_name(user[3]));
console.log(get_name(user[4]));

// 아래와 같이 리펙터링이 가능함
console.log(
	_map(
		_filter(users, function (user) {
			return user.age >= 30;
		}),
		_get('name')
		// function(user) { return user.name;}
	)
);
```

## reduce 리듀서

```js
function _reduce(list, iter, memo) {
	// iter(iter(iter(iter(0, 1), 2), 3), 4);
    if (arguments.length === 2) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function(val)) {
        memo = iter(memo, val);
    }
    return memo;
}

console.log(_reduce([1, 2, 3], add, 0)); // 6
console.log(_reduce[1, 2, 3, 4], add, 0); // 10
// 6

// 보통 다른 자료구조를 만들 때 많이 사용함

// 아래와 같이 동작하게 됨
memo = add(0, 1);
memo = add(memo, 2);
memo = add(memo, 3);
return memo;

add(add(add(0, 1), 2), 3);
```

- slice 사용법

```js
var slice = Array.prototype.slice;
var a = { 0: 1, 1: 20, 2: 30, length: 3 };
slice.call(a, 2);
// 이제 ArrayLike 객체와 와도 사용이 가능함
```

### slice rest 만들기

```js
var slice = Array.prototype.slice;
function _rest(list, num) {
	return slice.call(list, num || 1);
}
```

### 파이프라인, `_go`, `_pipe`, 화살표 함수

- 두개의 함수를 연속적으로 실행 시켜줌

- pipe : reduce 특화 함수
- ┗ reduce 포괄적 함수

```js
function _pipe() {
	var fns = arguments;
	return function (arg) {
		return _reduce(
			fns,
			function (arg, fn) {
				return fn(arg);
			},
			arg
		);
	};
}
// 위와 같이 하면 모든 함수를 돌면서
// arg에 그 전 함수를 기억하여
// 연속적으로 실행이 가능해짐

var f1 = _pipe(
	function (a) {
		return a + 1;
	},
	function (a) {
		return a + 2;
	},
	function (a) {
		return a + a;
	}
);
console.log(log(f1(1)));
```

#### go 함수

- go : 파이프 함수 이지만
- ┣ 즉시 실행되는 함수
- ┣ pipe : 함수를 return

```js
// apply?
function _go(arg) {
	var fns = _rest(arguments); // ArrayLike -> fns 하나 제거
	_pipe.apply(null, fns)(arg);
}

_go(
	function (a) {
		return a + 1;
	},
	function (a) {
		return a + 2;
	},
	function (a) {
		return a + a;
	},
	console.log
);
```

#### 응용 명령형 -> 리펙터링

```js
console.log(
	_map(
		_filter(users, function (user) {
			return user.age < 30;
		}),
		_get('age')
	)
);
// 위의 코드는 안쪽에서 바깥쪽으로 탈출하기 때문에
// 가독성이 떨어짐

_go(
	users,
	function (users) {
		return _filter(users, function (user) {
			return user.age >= 30;
		});
	}, // filter 된 users 전달
	function (users) {
		return _map(users, _get('name'));
	}, // map 돌아 name 찾아진 users 전달
	console.log // console.log로 보여줌
);
```

- 이를 더 간단하게 표현이 가능함
- curryr을 사용하면 좀 더 쉽게 사용 가능

```js
var _map = _curryr(_map),
	_filter = _curryr(_filter);

console.log(_map([1, 2, 3], function(val) {return val * 2}); // 이렇게 val을 인자로 받아서
// 처리하는 함수를

// curryr을 적용하면 왼쪽에 함수를 적용이 가능
console.log(_map(function(val) {return val * 2;})([1, 2, 3]));

_go(users, _filter(function(user) { return user.age >= 30;}), _map(_get('name')), console.log);
_go(users, function(users) {return _filter(users, function(user) {return user.age < 30})}) // 아래와 같이 간단하게 표현이 가능하다.
// 화살표 함수로 표현
_go(users, _filter(user => user.age < 30), _map(_get('age')), console.log);
// 더 간단하게 표현이 가능함
// map의 경우 더 이상의 리페겉링이 필요가 없음
```

- 정리
- ┣ 1. `_filter`에 `curryr을 적용`해
- ┣ `함수가 하나만 들어오면 함수를 return` 하도록 설정
- ┣ 2. `_go` 함수 : `파이프 라인`으로
- ┗ `함수를 연속적으로 실행함`

```js
// 아래와 같이 간단하고
// 부수효과가 없는 함수형 프로그래밍으로 설정

_go(
	users,
	_filter((user) => user.age <= 30),
	_map(_get('name')),
	console.log
);
```

#### 부록 : 화살표 함수 사용

```js
var a = function (user) {
	return user.age >= 30;
};
var a = (user) => user.age >= 30;

var add = function (a, b) {
	return a + b;
};
var add = (a, b) => a + b;
var add = (a, b) => {
    //
    return a + b;
};

// 객체를 만들면서 return
var add = (a, b) => ({
    val: a + b;
}); // 이렇게 사용해야 함
// () 괄호를 안치게 되면
// {} 중괄호가 함수의 괄호가 되므로
// 객체로 동작할 수 없음
```

## 다형성 높이기

- 함수형 프로그래밍
- ┣ `예외적인 값이 들어오면`
- ┗ 에러가 나지 않도록 처리 하는 것이 특징

```js
// _get 함수가 오류 체킹 중
function _get(obj, key) {
	return obj === null ? undefined : obj[key];
}

// length 함수를 참조 하는 부분을
// get을 통해서 참조 하도록 함
var _length = _get('length');

function _each(list, iter) {
    for (var i =0; len= _length(list);  i< len; i++) {
        iter(list[i]);
    }
    return list;
}
```

- 예외 처리를 해주는 것이 관건
- ┣ `데이터 형을 체크` 하거나
- ┣ `try catch문`을 사용하지 않고
- ┗ `typeof를 체킹 하지 않아도 됨`

```js
_go(
	null,
	_filter(function (v) {
		return v % 2;
	}),
	_map(function (v) {
		return v;
	}),
	console.log
);
```

> 불안하다고 생각이 가능

    node.js -> sequelize 프레임 워크
    ┣ 내부 코드 또한 lodash, underscore 사용 중
    ┣ 안전하고 core에 _를 둘 정도로
    ┗ 실용적이고 데이터를 다루기 좋은 방법임

- orm 형 체크를 안하고
- ┣ 흘려보내는 방식을 사용 한다는 것이
- ┗ 이를 입증 해준다고 볼 수 있음

### `_keys` 만들기

```js
console.log(_keys({ name: 'Id', age: 33 }));
console.log(_keys([1, 2, 3, 4]));
console.log(_keys(null)); // 이것이 오류가 남

function _is_object(obj) {
	return typeof ob === 'object' && !!obj; // 타입 체킹을 해줌
}

function _keys(obj) {
	return _is_object(obj) ? Object.keys(obj) : [];
}
```

- 어떤 값이 들어 와도
- ┣ 오류가 나서 멈추지 않도록
- ┣ 해결이 가능함

### `_each` 외부 다향성 높이기

```js
_each(
	{
		13: 'ID',
		19: 'HD',
		29: 'YD',
	},
	function (name) {
		console.log(name);
	}
); // 이 함수는 지금 length가 없기 때문에
// 동작을 할 수 없음
// 이를 each를 발전 시키도록 설정 _

function _each(list, iter) {
    var keys = _keys(list);
    // keys.length 를 사용 하여 오류 처리
    for (var i =0; len= keys.length;  i< len; i++) {
        // i 번째 인덱스를 사용 하도록 설정
        iter(list[keys[i]]);
    }
    return list;
}

// 또한 _map, _filter에 대해서도
// 사용이 가능하도록 함
console.log(_map({13: 'ID', '17': 'HD'}, function(name) {
    return name.toLowerCase();
}))
```

```js
_go(
	{
		13: 'ID',
		19: 'HD',
		29: 'YD',
	},
	_map(function (name) {
		return name.toLowerCase();
	}),
	console.log
);
```

> 정리

    어떠한 데이터가 들어오든
    ┣ 처리가 가능 하도록 고차 함수를 설정
    ┣ 모든 상황에서도
    ┣ 데이터 처리를 가능 하도록
    ┗ 설정하는 것이 특징이다

- 데이터에 따라서 보조 함수를
- ┣ 설정이 가능함
- ┣ 다향성과 유연성이 높아지기 때문에
- ┗ 좀 더 효과적인 프로그래밍이 가능
