function solution(fees, records) {
	let ans = [];
	const carMap = new Map();
	const [freeLimit, free, afterMinute, afterFee] = fees;
	const endOfTime = 23 * 60 + 59;
	for (const item of records) {
		let [time, carNum, status] = item.split(' ');
		time = time.split(':');
		time = Number(time[0]) * 60 + Number(time[1]);
		if (carMap.has(carNum)) {
			if (carMap.get(carNum).status === 'IN') {
				const inTime = carMap.get(carNum).time;
				carMap.set(carNum, { time: 0, status: 'OUT', extra: time - inTime });
			} else {
				const extra = carMap.get(carNum).extra;
				carMap.set(carNum, { time, status: 'IN', extra });
			}
		} else {
			carMap.set(carNum, { time, status, extra: 0 });
		}
	}
	const mapToArray = [...carMap].sort();

	console.log(mapToArray);
	mapToArray.forEach(([_, item]) => {
		if (item.status === 'IN') {
			const totalTime = endOfTime - item.time + item.extra;
			if (totalTime <= freeLimit) ans.push(0);
			else {
				const over =
					Math.ceil((totalTime - freeLimit) / afterMinute) * afterFee;
				ans.push(free + over);
			}
		} else {
			if (item.extra <= freeLimit) ans.push(0);
			else {
				const over =
					Math.ceil((item.extra - freeLimit) / afterMinute) * afterFee;
				ans.push(free + over);
			}
		}
	});

	return ans;
}
