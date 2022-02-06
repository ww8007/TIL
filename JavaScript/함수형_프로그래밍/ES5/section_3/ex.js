const users = [
	{ id: 1, name: 'ID', age: 36 },
	{ id: 2, name: 'ID', age: 32 },
	{ id: 3, name: 'ID', age: 32 },
	{ id: 4, name: 'ID', age: 27 },
	{ id: 5, name: 'ID', age: 25 },
	{ id: 6, name: 'ID', age: 26 },
	{ id: 7, name: 'ID', age: 31 },
	{ id: 8, name: 'ID', age: 23 },
];

/////////////////////////////////
// 1. 수집하기 - map

function _is_object(obj) {
	return typeof obj === 'object' && !!obj;
}

function _keys(obj) {
	return _is_object(obj) ? Object.keys(obj) : [];
}

function _each(list, iter) {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		iter(list[keys[i]]);
	}
	return list;
}

function _curryr(fn) {
	return function (a, b) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(b, a);
			  };
	};
}

function _map(list, mapper) {
	const new_list = [];
	_each(list, function (val) {
		new_list.push(mapper(val));
	});
	return new_list;
}

// _values - 값만 추출

function _values(data) {
	return _map(data, (val) => val);
}

// _identity - 그대로 전달

function _identity(val) {
	return val;
}

// _pluck - 키로 데이터 추출

/// _get을 사용해서 pluck

const _get = _curryr(function (obj, key) {
	return obj === null ? undefined : obj[key];
});

const _pluck = _curryr(function (data, key) {
	return _map(data, _get(key));
});

console.log(_pluck(users, 'id'));

///////////////////////////////////////////////
// _filter
function _filter(list, predi) {
	const new_list = [];
	_each(list, function (val) {
		if (predi(val)) new_list.push(val);
	});
	return new_list;
}

// _reject : filter 반대 동작
function _reject(data, predi) {
	return _filter(data, function (val) {
		return !predi(val);
	});
}

// _negate : filter 추상화 함수
function _negate(func) {
	return function (val) {
		return !func(val);
	};
}

//// 사용법
function _reject(data, predi) {
	return _filter(data, _negate(predi));
}

// _compact : truthy 값만 return
var _compact = _filter(_identity);
console.log(_compact([1, 2, 0, false, null, {}]));

//////////////////////////////////////////
// _find 찾아내기

function _find(list, predi) {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		const val = list[keys[i]];
		if (predi(val)) return val;
	}
}

// 사용법
console.log(_find(users), (user) => user.age < 30);

// _find_index
function _find_index(list, predi) {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		if (predi(list[keys[i]])) return i;
	}
	// 조건에 맞는게 없다면 -1 return
	return -1;
}

// _some : 조건에 맞는게 있는지 확인
function _some(data, predi) {
	return _find_index(data, predi) != -1;
}

// _every : 모든 값이 true
function _every(data, predi) {
	return _find_index(data, _negate(predi));
}

////////// 문제점
// predi 함수가 안들어오면 동작하지 않음
function _some(data, predi) {
	return _find_index(data, predi || _identity) == -1;
}

function _some(data, predi) {
	return _find_index(data, _negate(predi || _identity)) == -1;
}

///////////////////////////////////////////////
// _reduce 접어내기
function _reduce(list, iter, memo) {
	if (arguments.length === 2) {
		memo = list[0];
		list = _rest(list);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}

// _min
function _min(data) {
	return _reduce(data, function (a, b) {
		return a > b ? b : a;
	});
}

// max
function _max(data) {
	return _reduce(data, function (a, b) {
		return a > b ? a : b;
	});
}

///// 확장성 기르기
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

console.log(_max_by([1, 2, 3, -4], Math.abs));

////////////////////////////////////////////////
// _group_by : 그룹 만들기
const _group_by = _curryr(function (data, iter) {
	return _reduce(data, function (grouped, val) {
		var key = iter(val);
		(grouped[key] = grouped[key] || []).push(val);
		return grouped;
	});
});

// _push : 안전성 높히기
function _push(obj, key, val) {
	(obj[key] = obj[key] || []).push(val);
	return obj;
}

/// 사용법
// 10대 20대 30으로 그룹 만들기
_go(
	users,
	_group_by((user) => user.age - (user.age % 10)),
	console.log
);
_go(
	users,
	_group_by((user) => user.name[0]),
	console.log
);

// _head

function _head(data) {
	return data[0];
}

_go(users, _group_by(_pipe(_get('name'), _head)), console.log);

// _count_by

const _count_by = _curryr(function (data, iter) {
	return _reduce(data, function (count, val) {
		const key = iter(val);
		count[key] ? count[key]++ : (count[key] = 1);
		return count;
	});
});

//////////////////////////////////////////////
// _each, _map key 값 추출
const _each = _curryr(function (list, iter) {
	const keys = _keys(list);
	for (let i = 0, len = keys.length; i < len; i++) {
		iter(list[keys[i]], keys[i]);
	}
	return list;
});

const _map = _curryr(function (list, mapper) {
	const new_list = [];
	_each(list, function (val, key) {
		new_list.push(mapper(val, key));
	});
	return new_list;
});

/// _pairs : key value 받아오기
const _pairs = _map((key, val) => [key, val]);

/////////////////////////////////////////////
// 실무 코드
_go(
	users,
	_filter((user) => user.age >= 20),
	_count_by((user) => user.age - (user.age % 10)),
	_map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
	(list) => '<ul>' + list.join('') + '</ul>',
	function () {
		document.write(html);
	}
);

var _f1 = _pipe(
	_count_by((user) => user.age - (user.age % 10)),
	_map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
	(list) => '<ul>' + list.join('') + '</ul>',
	function () {
		document.write(html);
	}
);

_f1(users);
