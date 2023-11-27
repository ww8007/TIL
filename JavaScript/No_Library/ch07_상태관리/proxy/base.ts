interface Target {
	[key: string]: any;
}

const base = {
	foo: "bar"
};

const handler = {
	get: function (target: Target, name: string) {
		console.log(`get ${name}`);
		return target[name];
	},
	set: function (target: Target, name: string, value: any) {
		console.log(`set ${name} to ${value}`);
		target[name] = value;
		return true;
	}
};

const proxy = new Proxy(base, handler);
proxy.foo = "baz";
console.log(proxy.foo);
