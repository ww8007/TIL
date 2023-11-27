import { CustomEvents, State } from "../core/types";
import { observableFactory } from "./observable";

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const INITIAL_STATE: State = {
	todos: [],
	currentFilter: "All"
};

export const modelFactory = (initialState = INITIAL_STATE) => {
	const state = cloneDeep(initialState);

	const addItem = (text: string) => {
		if (!text) return;

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

	const model = {
		addItem,
		updateItem,
		deleteItem,
		toggleItemCompleted,
		completeAll,
		clearCompleted,
		changeFilter
	};

	return observableFactory<CustomEvents>(model, () => state);
};
