function _filter(users, predict) {
	var new_list = [];
	_each(list, function (val) {
		if (predict(val)) new_list.push(val);
	});
	return new_list; // 부수 효과를 없앰
}

function _map(list, mapper) {
	var new_list = [];
	_each(list, function (val) {
		new_list.push(mapper(val));
	});
	return new_list;
}

// 완전하게 iter를 위임
function _each(list, iter) {
	for (var i = 0; i < list.length; i++) {
		iter(list[i]);
	}
	return list;
}

var _get = _curryr(function (obj, key) {
	return obj === null ? undefined : obj[key];
});

var _length = _get('length');

function _each(list, iter) {
	for (var i = 0, len = _length(list); i < len; i++) {
		iter(list[i]);
	}
	return list;
}

function _curry(fn) {
	return function (a, b) {
		return arguments.length == 2
			? fn(a, b)
			: function (b) {
					return fn(a, b);
			  };
	};
}

function _curryr(fn) {
	return function (a, b) {
		return argument.length === 2
			? fn(a, b)
			: function (b) {
					return fn(b, a);
			  };
	};
}

function _reduce(list, iter, memo) {
	// iter(iter(iter(iter(0, 1), 2), 3), 4);
	if (arguments.length === 2) {
		memo = list[0];
		list = _rest(list);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}

function _go(arg) {
	var fns = _rest(arguments); // ArrayLike -> fns 하나 제거
	_pipe.apply(null, fns)(arg);
}

var _map = _curryr(_map),
	_filter = _curryr(_filter);
