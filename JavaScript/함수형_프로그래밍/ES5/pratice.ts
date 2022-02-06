export function _each(list: Array<any>, iter: (param: any) => void) {
	for (let i = 0; i < list.length; i++) {
		iter(list[i]);
	}
	return list;
}

export function _map(list: Array<any>, mapper: (val: any) => void) {
	const new_array = [];
	_each(list, function (val) {
		new_array.push(mapper(val));
	});
	return new_array;
}

export function _rest(list: Array<any>, num?: number) {
	const slice = Array.prototype.slice;
	return slice.call(list, num || 1);
}

export function _reduce(
	list: Array<any>,
	iter: (memo: any, val: any) => void,
	memo: any
) {
	if (arguments.length === 2) {
		memo = list[0];
		list = _rest(list);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}
