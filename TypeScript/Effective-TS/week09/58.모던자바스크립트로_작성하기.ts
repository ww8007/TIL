class Foo {
	method() {
		console.log(this);
		[1, 2].forEach(function (i) {
			console.log(this);
		});
	}
}

const f = new Foo();
f.method();

function countWordsMap(text: string) {
	const map = new Map<string, number>();
	for (const word of text.split(/[\s,.]+/)) {
		const count = map.get(word) || 0;
		map.set(word, count + 1);
	}
	return map;
}
