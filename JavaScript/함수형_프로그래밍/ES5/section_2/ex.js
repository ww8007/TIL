//////////////////////////////////////////
// _filter, _map, _each
// 기존에 존재하는 메서드가 있지만
// 다음과 같이 클래스에 의존하지 않고
// 함수형으로 설정하여
// 모든 값에 대해서 유연성을 가지도록
// 설정이 가능함

function _filter(list, predi) {
	const new_list = [];
	for (let i = 0; i < list.length; i++) {
		if (predi(list[i])) new_list.push(list[i]);
	}
	return new_list;
}

function _map(list, mapper) {
	const new_list = [];
	for (let i = 0; i < list.length; i++) {
		new_list.push(mapper(list[i]));
	}
	return new_list;
}

// 동시적으로 사용하기

_map(
	_filter(users, function (user) {
		return user.age >= 30;
	}),
	function (user) {
		return user.age;
	}
);

_map(
	_filter(users, function (user) {
		return user.age >= 30;
	}),
	function (user) {
		return user.name;
	}
);

// 하지만 아직 중복 코드가 존재

function _each(list, iter) {
	for (let i = 0; i < list.length; i++) {
		iter(list[i]);
	}
	// 받은 값을 그대로 return
	return list;
}

// each를 이용해서 리펙터링

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

//////////////////////////////////////
// _curry
// 3항 연산자를 통한 리펙터링 된 함수
// 인자가 두개 들어오면 즉시 실행 하도록
// 함수를 다음과 같이 설정할 수 있음
function _curry(fn) {
	return function (a, b) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(a, b);
			  };
	};
}

// sub와 같은 함수에서
// 실행 순서를 변경 시키고 싶을 때
// curryr과 같은 함수를 설정하여서
// 다음과 같이 사용이 가능하다
function _curryr(fn) {
	return function (a, b) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(b, a);
			  };
	};
}

const _sub = _curryr(function (a, b) {
	return a - b;
});

const sub10 = _sub(10);
console.log(sub10(5));

//////////////////////////////////////
// _get 함수
function _get(obj, key) {
	return obj === null ? undefined : obj[key];
}

console.log(users[10].name); // error
console.log(_get(users, 'name')); //undefined

// _curryr을 통한 리펙터링
const _get = _curryr(function (obj, key) {
	return obj === null ? undefined : obj[key];
});

const get_name = _get('name'); // 다음과 같이 name을 꺼낼 수 있는
// 함수가 만들어짐

////////////////////////////////////////
// _reduce 함수
function _reduce(list, iter, memo) {
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}

console.log(_reduce([1, 2, 3], add, 0));

// 문제점 : memo의 초기값이 없으면 동작하지 않음
// 고로 이를 slice를 통해 첫번째 인덱스를 사용하도록 설정
const slice = Array.prototype.slice;

function _rest(list, num) {
	return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
	if (arguments.length === 2) {
		memo = list[0];
		list = _rest(list);
	}
	// memo를 덮어 쓴다고 생각하면 좋음
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}

/////////////////////////////////////////////
// _pipe, _go 함수
function _pipe() {
	const fns = arguments;
	return function (arg) {
		return (
			_reduce(fns, function (arg, fn) {
				return fn(arg);
			}),
			arg
		);
	};
}

function _go(arg) {
	const fns = _rest(arguments);
	_pipe.apply(null, fns)(arg);
}

// 사용법
_pipe(
	function (a) {
		return a + 1;
	},
	function (a) {
		return a * 2;
	},
	console.log
);

_go(
	1,
	function (a) {
		return a + 1;
	},
	function (a) {
		return a * 2;
	},
	console.log
);
