const solution2 = (size: number, n: number) => {
	const queue = Array.from({ length: size }, (v, i) => i + 1);

	let cnt = 1;
	while (queue.length !== 1) {
		queue.push(queue.shift()!);
		cnt++;
		if (cnt === n) {
			queue.shift();
			cnt = 1;
		}
	}

	return queue[0];
};

console.log(solution2(8, 3));
