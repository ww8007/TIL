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
