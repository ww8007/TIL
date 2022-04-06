function solution(a, b) {
	let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	let months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let daysSum = 0;
	for (let i = 0; i <= a - 2; i++) {
		daysSum += months[i];
	}
	daysSum += b;
	return days[((daysSum % 7) + 4) % 7];
}
