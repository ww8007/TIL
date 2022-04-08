function solution(n, arr1, arr2) {
	var answer = [];
	for (let i = 0; i < n; i++) {
		let sum = arr1[i] | arr2[i];
		let pushString = sum.toString(2);
		pushString = pushString.replace(/1|0/g, (n) => (+n ? '#' : ' '));
		pushString = pushString.split('');
		while (pushString.length !== n) {
			pushString = [' ', ...pushString];
		}
		answer.push(pushString.join(''));
	}
	return answer;
}
