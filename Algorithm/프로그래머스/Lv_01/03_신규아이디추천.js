function solution(new_id) {
	var answer = '';
	answer = step_1(new_id);
	answer = step_2(answer);
	answer = step_3(answer);
	answer = step_4(answer);
	answer = step_5(answer);
	answer = step_6(answer);
	answer = step_7(answer);
	isNan;
	return answer;
}

const step_1 = (input) => input.toLowerCase();

const step_2 = (input) => input.replace(/[^a-z0-9-_.]/g, '');

const step_3 = (input) => input.replace(/\.+/g, '.');

const step_4 = (input) => input.replace(/^\.|\.$/g, '');

const step_5 = (input) => {
	if (!input.length) return 'a';
	return input;
};

const step_6 = (input) => input.slice(0, 15).replace(/\.$/, '');

const step_7 = (input) => {
	let len = input.length;
	return len > 2 ? input : input + input.charAt(len - 1).repeat(3 - len);
};

console.log(solution('...!@BaT#*..y.abcdefghijklm'));
