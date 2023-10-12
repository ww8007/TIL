function count() {
	for (var i = 0; i < 10; i++) {
		setTimeout(function () {
			console.log(i);
		}, 100);
	}
	return count;
}

count();
