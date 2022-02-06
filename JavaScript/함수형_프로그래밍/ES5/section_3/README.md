# ch03 컬렉션 중심 프로그래밍

- 크게 4가지 유형으로 바라볼 수 있음
- ┣ 1. 수집하기 - `map`, `values`, `pluck`
- ┣ 2. 거르기 - `filter`, `reject`, `compact`, `without`
- ┣ 3. 찾아내기 - `find`, `some`, `every`
- ┣ 4. 접기 - `reduce`, `min`, `max`, `group_by`, `count_by`
- ┣ 앞에 있을 수록 추상화 레벨이 높음
- ┗ 앞의 특화 함수로 다른 함수들을 만들 수 있다는 것이 특징

- `map`, `filter`, `find`, `reduce`와 같은
- ┣ 고차 함수를 가지고
- ┣ 다른 함수를 만들어냄

- `특화 함수(reduce)를 가지고` 다른 함수를
- ┗ 만들어내는 것이 이 장의 목표

## 수집하기 map

### `_values` : 값만 추출하기

> 기본적인 values 함수 만들기

```js
function _values(data) {
    return _map(data, (val) => return val);
}
```

### `_identity` : 그대로 전달

> 인자 값을 그대로 전달해주는 `_identity` 생성

- 하는 일이 없어 보이지만
- ┣ `map` 에서 사용하는 `mapper 함수`의
- ┣ 역할을 대신할 수 있음

```js
function _identity(val) {
	return val;
}

// 기본적 사용법
const a = 10;
console.log(_identity(a));

// values에 적용하기
function _values(data) {
	return _map(data, _identity);
}
```

> curryr을 이용한 리펙토링

- 더욱 쉽게 리펙토링 가능
- `curryr`의 성격인 `인자가 하나만 들어오면`
- ┣ `함수를 return` 하도록 설정 하였기 때문에
- ┗ 아래와 같은 코드를 작성이 가능하다

```js
var _map = curryr(_map);
var values = _map(_identity); // 데이터를 받을 준비를 함
console.log(_map(_identity)(users[0]));
```

### `_pluck` : 원하는 키로 데이터만 추출

- 두 번째 인자로 받는 `key를 통해`
- ┣ 원하는 데이터만 추출 하도록 가능

```js
function _pluck(data, key) {
	return _map(data, function (obj) {
		return obj[key];
	});
}

const _pluck => (data, key) => {
	return _map(data, (obj) => obj[key]);
}

_pluck(users, 'age');
```

- `_pluck`의 `map 두번째 인자`로
- ┣ 이미 만들었던 `_get` 함수를 사용할 수 있음

```js
// get
var _get = _curryr(function (obj, key) {
	return obj == null ? undefined : obj[key];
});
// pluck
function _pluck(data, key) {
	return _map(data, _get(key));
}
```

## 거르기 filter 함수

### reject

- filter를 반대로 동작 시키는 개념
- ┣ true 평가 항목을 제외 하는 것
- ┗ reject를 반대 동작 한다는 의미로 생각하면 됨

### filter 복습

```js
function _filter(list, predi) {
	var new_list = [];
	_each(list, function (val) {
		if (predi(val)) new_list.push(val);
	});
	return new_list;
}
```

### `_reject` 함수 구현

```js
function _reject(data, predi) {
	return _filter(data, function (val) {
		return !predi(val);
	});
}
```

#### `_negate` 함수를 이용한 리펙터링

- 조건의 반대 값만 가져오는 함수

```js
function _negate(fns) {
	return function (val) {
		return !fns(val);
	};
}

function _reject(data, predi) {
	return _filter(data, _negate(predi));
}
```

### `_compact` 함수 구현

- `truthy`한 값만 남기게 됨

```js
function _identity(val) {
	return val;
}
```

- `_identity를 이용`해서
- ┣ \_filter 함수에 조건을 넘겨주고
- ┣ 그 조건이 truthy 하다면
- ┗ 이를 반환하는 함수를 구현

```js
// _compact 함수 구현

var _compact = _filter(_identity);
console.log(_compact([1, 2, 0, false, null, {}]));
```

## 찾아내기 find

### find 만들기

- `predicate가 처음으로 true로 평가`되는
- ┗ `값 하나를 return` 하는 함수임

```js
function _find(list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		var val = list[keys[i]]; // 평가 조건과 반환값이 같기 때문에
		// 두 번 사용되는 값을 변수에 담아버림
		if (predi(val)) return val;
	}
}

console.log(
	_find(users, function (user) {
		return user.age < 30;
	})
);
```

- list를 전체를 돌면서
- ┣ predicate 함수가 true 한 값을 return 하는 경우
- ┣ 그 값을 return 하게 됨
- ┣ 원하는 값을 찾으면 for문을 빠져나올 수 있는
- ┗ `지연 평가의 최적화 중 하나`

#### `_find_index` 만들기

```js
function _find_index(list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		if (predi(list[keys[i]])) return i;
	}
	return -1; // JS의 기본 찾지 못하면
	// -1을 return 하도록 설정함
}
```

- find 하면서 get을 사용하여 이름 알아오기

```js
console.log(
	_get(
		_find(user, function (user) {
			return user.age === 30;
		}),
		'name'
	)
);
```

- `_go` 함수를 이용한 연속 동작
- 파이프 라인을 통한 리펙터링
- 아래와 같이 가독성 좋게 코딩이 가능함

```js
_go(
	find((user) => user.id === 50),
	_get('name'),
	console.log
);
```

#### `_find`에 curryr을 사용

```js
var _find = _curryr(function (list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		var val = list[keys[i]];
		if (val) return val;
	}
});
```

### some 만들기

- 조건에 만족하는 값이 하나라도
- ┗ 존재하면 true를 반환함

- find_index를 이용해서
- ┣ 조건에 만족하는지 → return이 -1이 아닌지
- ┗ 체킹하여서 이를 이용하게 됨

```js
function _some(data, predi) {
	return _find_index(data, predi) != -1;
}
```

### every 만들기

- 모든 값이 조건에 만족하면 : true
- ┗ 아니면 false를 반환함

- `_negate 함수를 이용`

```js
// predi 함수의 반대 조건으로 탐색
// -1을 return 하게 되면 모든 조건이 참임을 의미함
function _every(data, predi) {
	return _find_index(data, _negate(predi)) == -1;
}
```

#### 문제점

- 위의 코드들은 predicate가 없으면
- ┣ 제대로 동작하지 않음
- ┣ 고로 기본값으로 이를 지정해줌

```js
function _some(data, predi) {
	return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
	return _find_index(data, _negate(predi || _identity)) != -1;
}
```

- 이용법

- 아래와 같이 사용이 가능함

```js
console.log(
	_some(users, function (user) {
		user.age == 20;
	})
);
```

## 접기 reduce, min_by, max_by

- 순차적으로 사용하는 것이 아님
- ┣ 평가 순서와 상관없이
- ┣ 접고 펼쳐 나가는 것이 특징임
- ┣ 접기 혹은 축약이라고 생각하면 됨

- Array, iterable 한 객체에 대해서
- ┣ 접혀진 값을 위해서 사용하게됨

### min 만들어보기

- reduce를 이용해서 함수를 만들 때는
- ┣ 조금 다른 방법으로 생각 하는 것이 중요
- ┣ 평가 순서와 상관 없이 값을 만드는 것을
- ┣ 생각하는 것이 중요
- ┣ `[1, 2, 4]` 앞에서 부터 순서가 아닌
- ┣ `순서와 상관 없이 해주는 것이 중요`
- ┗ `두개의 값만 존재` 한다고 생각

```js
function _min(data) {
	return _reduce(data, function (a, b) {
		return a < b ? a : b;
	});
}

console.log(_min([1, 2, -4, 5, 10]));

function _max(data) {
	return _reduce(data, function (a, b) {
		return a > b ? a : b;
	});
}

console.log(_min([1, 2, -4, 5, 10]));
```

### `_min_by` 만들어보기

- min에서 좀 더 확장성을 길러줌
- ┣ 기존의 min이 그냥 최소값만 구해 준다고
- ┣ 생각하게 되면
- ┣ 이를 인자를 하나 더 받아서 `(iter)`를 통해
- ┣ 각각의 데이터를 iter로 감싸주면
- ┗ `원하는 동작을 하면서 min, max를 구현이 가능함`

```js
function _min_by(data, iter) {
	return _reduce(data, function (a, b) {
		return iter(a) < iter(b) ? a : b;
	});
}

function _max_by(data, iter) {
	return _reduce(data, function (a, b) {
		return iter(a) > iter(b) ? a : b;
	});
}
```

- map을 통해서 abs를 돌려버리면
- ┣ 기존 값이 수정된 값을 통해서
- ┣ `원하는 값이 아닌 다른 값이 출력 되게 됨`
- ┣ `[1, 2, 3, -10] → 10` map 이용
- ┗ `[1, 2, 3, -10] → -10` \_max_by 이용

- 다른 예로 user 중에 가장 나이가 많은 사람을
- ┣ 출력 하게 하는 예제를 만든다면

```js
console.log(
	_min_by(users, function (user) {
		return user.age;
	})
);
```

- `_go`를 이용한 파이프라인 연속적 실행

```js
_go(
	users,
	_filter((user) => user.age > 30),
	_min_by(users, function (user) {
		return user.age;
	}),
	console.log
);

// 함수형으로 리펙터링

_go(
	users,
	_filter((user) => user.age > 30),
	// 이렇게도 가능함
	_map(_get('age')),
	_min,
	// 제일 적은 나이를 찾도록
	_min_by(get('age')),
	_get('age'),
	console.log
);

// max_by도 사용 가능

// reject 사용
// 이유 : reject : filter의 반대형

_go(
	users,
	_reject((user) => user.age > 30),
	_max_by(get('user')),
	// name을 다시 받아올 수 있음
	_get('name'),
	console.log
);
```

## 접기 - group_by

- `그룹`을 만드는 것이 이 함수의 목적
- ┗ 쉽게 말해서 분류를 한다고 생각하면 됨

```js
var _group_by = _curryr(function (data, iter) {
	return _reduce(
		data,
		function (grouped, val) {
			// 분류를 iter 함수에 위임
			(grouped[key] = grouped[key] || []).push(val);
			return grouped;
		},
		{}
	);
});
```

- 위에서 `key값이 있고 없고에 대한`
- ┣ 확인을 위해 사용한 3줄을 `더 간단하게 표현`이
- ┗ 가능함

```js
var _push = function (obj, key, val) {
	(obj[key] = obj[key] || []).push(val);
	return obj;
};

// 이를 이용해서 _group_by 리펙터링
// 아래와 같이 간단하게 3줄로 표현이 가능함
var _group_by = _curryr(function (data, iter) {
	return _reduce(data, function (grouped, val) {
		return _push(grouped, iter(val), val);
	});
});
```

> curryr의 사용 이유

    _go 함수에 사용하기 위함
    ┣ 함수를 넣으면 데이터가 나오기 때문에
    ┣ 쉽게 사용이 가능함

### `_head` 함수

```js
var _head = function (list) {
	return list[0];
};

// 이용법
// 방법이 좋은 것은 아니지만
// 이러한 사용법도 있다는 것을 숙지
_go(users, _group_by(_pipe(_get('name'), _head)));
```

### 접기 `_count_by`

- `reduce` 사용할 때 `주의점`
- ┣ `for문을 머리속에서 지우는 것을 생각`
- ┣ `순서대로 for문을 돌기 보다는`
- ┣ 들어오는 값에 대해 연속적으로
- ┗ `어떤 값을 return 하는지`에 대한 생각이 필요

```js
var _count_by = curryr(function (data, iter) {
	return _reduce(
		data,
		function (count, val) {
			var key = iter(val);
			count[key] ? count[key]++ : (count[key] = 1);
			return count;
		},
		{}
	);
});
```

#### 헬퍼 함수 `_inc`

- 전에 사용했던 `_push` 함수와 동일함

```js
var _inc = function (count, key) {
	count[key] ? count[key]++ : (count[key] = 1);
	return count;
};
```
