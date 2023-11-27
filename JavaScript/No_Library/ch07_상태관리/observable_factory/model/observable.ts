import { CustomEvents, State } from "../core/types";

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const freeze = <T>(x: T) => Object.freeze(cloneDeep(x)) as T;

type Observable<T> = {
	addChangeListener: (cb: Function) => void;
} & T;

export const observableFactory = <T>(
	model: CustomEvents,
	stateGetter: () => State
): Observable<T> => {
	let listeners: Function[] = [];

	const addChangeListener = (cb: Function) => {
		listeners.push(cb);
		cb(freeze(stateGetter()));
		return () => {
			listeners = listeners.filter((element) => element !== cb);
		};
	};

	const invokeListeners = () => {
		const data = freeze(stateGetter());
		listeners.forEach((l) => l(data));
	};

	const wrapAction = (originalAction: any) => {
		return (...args: any) => {
			const value = originalAction(...args);
			invokeListeners();
			return value;
		};
	};

	const baseProxy = {
		addChangeListener
	};

	const keys = Object.keys(model) as Array<keyof CustomEvents>;

	return keys
		.filter((key) => {
			return typeof model[key] === "function";
		})
		.reduce<Observable<T>>((proxy, key) => {
			const action = model[key];
			return {
				...proxy,
				[key]: wrapAction(action)
			};
		}, baseProxy as Observable<T>);
};
