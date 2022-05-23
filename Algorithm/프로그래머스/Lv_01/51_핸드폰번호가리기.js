function solution(phone_number) {
	let subStr = phone_number.slice(0, phone_number.length - 4);

	let replaceStr = '';

	for (let i = 0; i < phone_number.length - 4; i++) {
		replaceStr += '*';
	}

	let ans = phone_number.replace(subStr, replaceStr);
	return ans;
}

function solution2(phone_number) {
	return '*'.repeat(phone_number.length - 4) + phone_number.slice(-4);
}
