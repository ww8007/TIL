interface Person {
	name: string;
	age: number;
	nationality: string;
	[prop: string]: string | number;
}

const persons = {
	name: 'John Doe',
	age: 42,
	nationality: 'American'
};

const personProxyWithReflect = new Proxy(persons, {
	get: (obj: Person, prop: string) => {
		console.log(`${String(prop)}의 값은 ${Reflect.get(obj, prop)} 입니다.`);
	},
	set: (obj, prop: string, value) => {
		console.log(
			`${String(prop)}의 값은 ${String(obj[prop])} 에서 ${value}로 변경 됩니다.`
		);
		Reflect.set(obj, prop, value);
		return true;
	}
});

personProxyWithReflect.name;
personProxyWithReflect.age = 45;
