import { State } from "../core/types";

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const freeze = (state: State) => Object.freeze(cloneDeep(state));

export const observableFactory = (initialState: State) => {
	let listeners: Function[] = [];

	const proxy = new Proxy(cloneDeep(initialState), {
		set: (target, name: keyof State, value) => {
			target[name] = value;
			listeners.forEach((l) => l(freeze(proxy)));
			return true;
		}
	});

	proxy.addChangeListener = (cb) => {
		listeners.push(cb);
		cb(freeze(proxy));
		return () => {
			listeners = listeners.filter((l) => l !== cb);
		};
	};

	return proxy;
};
