import { State } from "../core/types";

const cloneDeep = (x: any) => {
	return JSON.parse(JSON.stringify(x));
};

const INITIAL_STATE: State = {
	todos: [],
	currentFilter: "All"
};

export default (initialState = INITIAL_STATE) => {
	const state = cloneDeep(initialState) as State;

	const getState = () => {
		return Object.freeze(cloneDeep(state));
	};

	const addItem = (text: string) => {
		if (!text) {
			return;
		}

		state.todos.push({
			text,
			completed: false
		});
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
	};

	const completeAll = () => {
		state.todos.forEach((t) => {
			t.completed = true;
		});
	};

	const clearCompleted = () => {
		state.todos = state.todos.filter((t) => !t.completed);
	};

	const changeFilter = (filter: string) => {
		state.currentFilter = filter;
	};

	return {
		addItem,
		updateItem,
		deleteItem,
		toggleItemCompleted,
		completeAll,
		clearCompleted,
		changeFilter,
		getState
	};
};
