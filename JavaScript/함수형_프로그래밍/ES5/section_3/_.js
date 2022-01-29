import * as lib from './library.js';

// 수집하기
// 특화 함수 map
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

console.log(
	lib._map(users, function (user) {
		return user.name;
	})
);

// values
// function _values(data) {
// 	return lib._map(data, function (val) {
// 		return val;
// 	});
// }

function _identity(val) {
	return val;
}

var a = 10;
console.log(_identity(a)); // 의미가 없어보임
// a라는 것이 이미 10 이라는 것을 아는데
// 굳이 쓰는 이유? :
// identity 함수와 동일하게 동작함

function _values2(data) {
	return lib._map(data, function (val) {
		return val;
	});
}
// 리펙토링이 가능하다
function _values(data) {
	return _map(data, _identity);
}

// 더 간단하게 구현 가능
// map을 curryr로 만들어서
// 인자가 하나만 있을 경우
// 함수를 return 하도록 설정 하였음
var _values = _map(_identity); // 앞으로 들어올 데이터를 받을 준비
console.log(_map(_identity)(users[0])); // 이렇게 사용 가능

console.log(_values(users[0]));

// pluck
function _pluck(data, key) {
	return _map(data, function (obj) {
		return obj[key];
	});
}

// 배열 내부 객체의
// 값들을 수집하는 함수
_pluck(users, 'age');

// 거르기

// filter 동작

// filter 함수
function _filter(list, predi) {
	var new_list = [];
	_each(list, function (val) {
		if (predi(val)) new_list.push(val);
	});
	return new_list;
}

console.log(
	_filter(user, function (user) {
		return user.age > 30;
	})
);

// reject

function _reject(data, predi) {
	return _filter(data, function (val) {
		return !predi(val);
	});
}

console.log(
	_reject(users, function (user) {
		return user.age > 30;
	})
);

function _negate(func) {
	return function (val) {
		return !func(val);
	};
}

// _negate를 통한 리펙터링

function _reject(data, predi) {
	return _filter(data, _negate(predi));
}

// _compact 함수 구현

var _compact = _filter(_identity);
console.log(_compact([1, 2, 0, false, null, {}]));

// 찾아내기 find

function _find(list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		var val = list[keys[i]];
		if (predi(val)) return val;
	}
}

console.log(
	_get(
		_find(users, function (user) {
			return user.age < 30;
		}),
		'name'
	)
);

console.log(
	_filter(users, function (user) {
		return user.age < 30;
	})
);

// 인덱스 return
function _find_index(list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		if (predi(list[keys[i]])) return i;
	}
	return -1;
}

// find를 curry가 동작하도록 설정
var _find = _curryr(function (list, predi) {
	var keys = _keys(list);
	for (var i = 0, len = keys.length; i < len; i++) {
		var val = list[keys[i]];
		if (val) return val;
	}
});

// some 만들기

function _some(data, predi) {
	return _find_index(data, predi) != -1;
}

_some([1, 2, 5, 10, 20], function (val) {
	return val > 10;
});

//some 만들기

function _every(data, predi) {
	return _find_index(data, _negate(predi)) == -1;
}

console.log(
	_every([1, 2, 5, 10, 20], function (val) {
		return val > 10;
	})
);
console.log(
	_every([12, 24, 5, 10, 20], function (val) {
		return val > 3;
	})
);
// true

// 문제점
// predicate가 존재하지 않으면 동작을 안함
// 고로 predicate를 기본값으로 지정해줌
function _every(data, predi) {
	return _find_index(data, predi || _identity) != -1;
}

// reduce로 min 만들기

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

// min_by 만들어보기

function _min_by(data, iter) {
	return _reduce(data, function (a, b) {
		return iter(a) < iter(b) ? a : b;
	});
}

console.log(_min_by([1, 2, 4, 10, 5, -4], Math.abs));

function _max_by(data, iter) {
	return _reduce(data, function (a, b) {
		return iter(a) > iter(b) ? a : b;
	});
}

console.log(_max_by([1, 2, 4, 10, 5, -4], Math.abs));

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

// 아래와 같이 나이를 기준으로 그룹을
// 만들어주도록 함수를 설정
// var users2 = {
// 	36: [{id: 10, name: 'ID', age: 36}],
// 	32: [{id: 20, name: 'BG', age : 32}, {id: 31}]
// }

// reduce group_by는 접기에 특화

var _group_by = _curryr(function (data, iter) {
	return _reduce(
		data,
		function (grouped, val) {
			// 분류를 iter 함수에 위임
			var key = iter(val); // key가 된다고 볼 수 있음
			(grouped[key] = grouped[key] || []).push(val); // 있으면 그대로 사용 없으면 생성
			return grouped;
		},
		{}
	);
});

_go(
	users,
	_group_by(function (user) {
		return user.age;
	}),
	console.log
);

_group_by(users, function (user) {
	return user.age;
});

// 여기서 빈 배열이 있을 경우
// 이를 push 하도록 사용 하는 것을
// 헬퍼 함수로 만들어서
// 안전성을 높힐 수 있음
function _push(obj, key, val) {
	(obj[key] = obj[key] || []).push(val);
	return obj;
}

var _group_by = _curryr(function (data, iter) {
	return _reduce(
		data,
		function (grouped, val) {
			return _push(grouped, iter(val), val); // 아래 3줄의 코드를 이렇게 줄일 수 있음
			// // 분류를 iter 함수에 위임
			// var key = iter(val); // key가 된다고 볼 수 있음
			// (grouped[key] = grouped[key] || []).push(val); // 있으면 그대로 사용 없으면 생성
			// return grouped;
		},
		{}
	);
});

// 아래와 같이 10대 20대 30대 분류가 가능함
// 다양한 분류가 가능하다는 점이 _group_by의 장점
_go(
	users,
	_group_by(function (user) {
		return user.age - (user.age % 10);
		return user.name[0]; // 이름 첫 글자로 분류하기
	}),
	console.log
);

var _head = function (list) {
	return list[0];
};

// pipe 함수를 이용해서 이렇게도 사용 가능
_go(users, _group_by(_pipe(_get('name'), _head)));

//////////////////////////////////////////////////////
// 3. count_by, inc

var _count_by = _curryr(function (data, iter) {
	return _reduce(
		data,
		function (count, val) {
			var key = iter(val); // 받은 iter를 이용해서 key를 뽑음
			count[key] ? count[key]++ : (count[key] = 1);
			return count;
		},
		{}
	);
});

_count_by(users, function (user) {
	return user.age;
});

_count_by(users, function (user) {
	return user.age - (user.age % 10);
});

// _inc 헬퍼 함수
var _inc = function (count, key) {
	count[key] ? count[key]++ : (count[key] = 1);
	return count;
};

// 이를 _count_by에 사용
var _count_by = curryr(function (data, iter) {
	return _reduce(
		data,
		function (count, val) {
			return _inc(count, iter(val));
		},
		{}
	);
});
