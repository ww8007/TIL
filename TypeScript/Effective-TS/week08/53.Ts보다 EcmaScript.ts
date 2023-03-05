enum Flavor {
	Vanilla = "Vanilla",
	Chocolate = "Chocolate",
	Strawberry = "Strawberry"
}

let flavor: Flavor = Flavor.Vanilla;
// flavor = "choocolate"; // $ExpectError

function scoop(flavor: Flavor) {}

// class Person {
// 	name: string;
// 	constructor(name: string) {
// 		this.name = name;
// 	}
// }

// class Person {
// 	constructor(public name: string) {}
// }

class Person {
	first: string;
	last: string;
	constructor(first: string, last: string) {
		[this.first, this.last] = [first, last];
	}
}

class Person {
	constructor(public name: string) {}
}

const p: Person = { name: "john" };
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	@logged
	greet() {
		return "Hello, + this.greeting";
	}
}
function logged(target: any, key: string, descriptor: PropertyDescriptor) {
	const fn = target[key];
	descriptor.value = function () {
		console.log(`Calling ${key} with`, arguments);
		return fn.apply(this, arguments);
	};
}
