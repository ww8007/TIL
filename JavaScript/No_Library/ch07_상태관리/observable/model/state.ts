import { State } from "../core/types";

const cloneDeep = (x: any) => {
	return JSON.parse(JSON.stringify(x));
};

const freeze = (x: any) => Object.freeze(cloneDeep(x));

const INITIAL_STATE: State = {
	todos: [],
	currentFilter: "All"
};

export default (initialState = INITIAL_STATE) => {
	const state = cloneDeep(initialState) as State;
	let listeners: Function[] = [];

	const addChangeListener = (listener: Function) => {
		listeners.push(listener);

		listener(freeze(state));

		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	const invokeListeners = () => {
		const data = freeze(state);
		listeners.forEach((l) => l(data));
	};

	const addItem = (text: string) => {
		if (!text) return;

		state.todos.push({
			text,
			completed: false
		});

		invokeListeners();
	};

	const updateItem = (index: number, text: string) => {
		if (!text) {
			return;
		}

		if (index < 0) {
			return;
		}

		if (!state.todos[index]) {
			return;
		}

		state.todos[index].text = text;

		invokeListeners();
	};

	const deleteItem = (index: number) => {
		if (index < 0) {
			return;
		}

		if (!state.todos[index]) {
			return;
		}

		state.todos.splice(index, 1);
	};

	const toggleItemCompleted = (index: number) => {
		if (index < 0) {
			return;
		}

		if (!state.todos[index]) {
			return;
		}

		state.todos[index].completed = !state.todos[index].completed;

		invokeListeners();
	};

	const completeAll = () => {
		state.todos.forEach((t) => {
			t.completed = true;
		});

		invokeListeners();
	};

	const clearCompleted = () => {
		state.todos = state.todos.filter((t) => !t.completed);
		invokeListeners();
	};

	const changeFilter = (filter: string) => {
		state.currentFilter = filter;
		invokeListeners();
	};

	return {
		addItem,
		updateItem,
		deleteItem,
		toggleItemCompleted,
		completeAll,
		clearCompleted,
		changeFilter,
		addChangeListener
	};
};
