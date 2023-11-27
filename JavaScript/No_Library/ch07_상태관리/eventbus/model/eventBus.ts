import { CustomEvents, State } from "../core/types";
import { modelFactory } from "./model";

type Model = ReturnType<typeof modelFactory>;

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const freeze = (state: State) => Object.freeze(cloneDeep(state));

export const eventBusFactory = (model: Model) => {
	let listeners: Function[] = [];
	let state = model();

	const subscribe = (listener: Function) => {
		listeners.push(listener);

		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	const invokeSubscribers = () => {
		const data = freeze(state);
		listeners.forEach((l) => l(data));
	};

	const dispatch = (event: CustomEvents) => {
		const newState = model(state, event);

		if (!newState) {
			throw new Error("model should always return a value");
		}

		if (newState === state) {
			return;
		}

		state = newState;

		invokeSubscribers();
	};
	return {
		subscribe,
		dispatch,
		getState: () => freeze(state)
	};
};
