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
	ㅉㅉㅈ;
}
