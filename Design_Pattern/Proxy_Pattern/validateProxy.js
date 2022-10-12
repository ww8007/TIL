const personProxyWithValidate = new Proxy(person, {
	get: (obj, prop) => {
		if (!obj[prop]) console.log(`키 값이 존재하지 않습니다.`);
		else console.log(`The value of ${prop} is ${obj[prop]}`);
	},
	set: (obj, prop, value) => {
		if (prop === 'age' && typeof value !== 'number')
			console.log(`나이에는 숫자만 입력이 가능 합니다.`);
		else if (prop === 'name' && value.length < 2)
			console.log(`이름의 형식이 유효하지 않습니다.`);
		else {
			console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
			obj[prop] = value;
		}
	}
});
