function solution(str: string) {
	str = str.replace(/[^0-9]/g, "");
	console.log(str);
	return Number(str);
}

function solution2(str: string) {
	let ans = 0;

	for (const word of str) {
		if (!isNaN(Number(word))) ans = ans * 10 + Number(word);
	}

	return ans;
}

let str3 = "g0en2T0s8eSoft";
console.log(solution(str3));
console.log(solution2(str3));
