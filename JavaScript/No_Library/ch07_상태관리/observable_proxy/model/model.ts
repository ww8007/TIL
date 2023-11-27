import { CustomEvents, State } from "../core/types";
import { observableFactory } from "./observable";

const INITIAL_STATE: Partial<State> = {
	todos: [],
	currentFilter: "All"
};

export const modelFactory = (initialState = INITIAL_STATE) => {
	const state = observableFactory(initialState as State);

	const addItem = (text: string) => {
		if (!text) return;

		state.todos = [
			...state.todos,
			{
				text,
				completed: false
			}
		];
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

		state.todos = state.todos.map((todo, i) => {
			if (i === index) {
				return {
					...todo,
					text
				};
			}
			return todo;
		});
	};

	const deleteItem = (index: number) => {
		if (index < 0) {
			return;
		}

		if (!state.todos[index]) {
			return;
		}

		state.todos = state.todos.filter((_, i) => i !== index);
	};

	const toggleItemCompleted = (index: number) => {
		if (index < 0) {
			return;
		}

		if (!state.todos[index]) {
			return;
		}

		state.todos = state.todos.map((todo, i) => {
			if (i === index) {
				return {
					...todo,
					completed: !todo.completed
				};
			}
			return todo;
		});
	};

	const completeAll = () => {
		state.todos = state.todos.map((t) => {
			t.completed = true;
			return t;
		});
	};

	const clearCompleted = () => {
		state.todos = state.todos.filter((t) => !t.completed);
	};

	const changeFilter = (filter: string) => {
		state.currentFilter = filter;
	};

	return {
		addChangeListener: state.addChangeListener,
		addItem,
		updateItem,
		deleteItem,
		toggleItemCompleted,
		completeAll,
		clearCompleted,
		changeFilter
	};
};
