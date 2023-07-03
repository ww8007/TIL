function solution(park, routes) {
	const routeArr = (x, y, s) => {
		const parse = s.split(" ");
		const np = parseInt(parse[1]);

		if (
			parse[0] === "N" &&
			x - np >= 0 &&
			checkIsPass(park, x - 1, np, "X", y, -1)
		) {
			return [x - np, y];
		}
		if (
			parse[0] === "S" &&
			x + np < maxX &&
			checkIsPass(park, x + 1, np, "X", y, 1)
		) {
			return [x + np, y];
		}
		if (
			parse[0] === "E" &&
			y + np < maxY &&
			checkIsPass(park, y + 1, np, "Y", x, 1)
		) {
			return [x, y + np];
		}
		if (
			parse[0] === "W" &&
			y - np >= 0 &&
			checkIsPass(park, y - 1, np, "Y", x, -1)
		) {
			return [x, y - np];
		}
		return [x, y];
	};

	const checkIsPass = (arr, start, size, pos, prev, direction) => {
		for (let i = 0; i < size; i++) {
			if (pos === "X") {
				if (arr[start + i * direction][prev] === "X") return false;
			} else {
				if (arr[prev][start + i * direction] === "X") return false;
			}
		}
		return true;
	};

	const maxX = park.length;
	const maxY = park[0].length;

	let startX = 0,
		startY = 0;

	for (let i = 0; i < maxX; i++) {
		for (let j = 0; j < maxY; j++) {
			if (park[i][j] === "S") {
				startX = i;
				startY = j;
			}
		}
	}

	routes.forEach((route) => {
		const res = routeArr(startX, startY, route);
		startX = res[0];
		startY = res[1];
	});

	return [startX, startY];
}
