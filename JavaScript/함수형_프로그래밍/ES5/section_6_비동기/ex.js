function square(a) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(a * a);
		}, 500);
	});
}

square(10).then((res) => console.log(res));

const list = [2, 3, 4];

// 이를 모두 square해서 return
new Promise(function (resolve) {
	(function recur() {
		if (list.length === res.length) return resolve(res);
		square(list[res.length]).then(function (val) {
			res.push(val);
			recur(res);
		});
	})([]);
}).then(function (res) {
	console.log;
});

//////////////////////////////////////////////////
// Refactor with _go

_go(list, _map(square), _map(square), console.log);
