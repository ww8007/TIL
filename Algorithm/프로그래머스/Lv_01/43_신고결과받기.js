function solution(id_list, report, k) {
	const answer = new Array(id_list.length);
	answer.fill(0);
	const Obj = {};

	id_list.map((user) => {
		Obj[user] = [];
	});

	report.map((user) => {
		const [userId, reportId] = user.split(' ');
		if (!Obj[reportId].includes(userId)) {
			Obj[reportId].push(userId);
		}
	});
	Object.keys(Obj).map((key) => {
		if (Obj[key].length >= k) {
			Obj[key].map((item) => answer[id_list.indexOf(item)]++);
		}
	});
	return answer;
}
