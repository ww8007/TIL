import { CustomEvents, State } from "../core/types";
import { createEventHandler } from "./eventCreators";

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const INITIAL_STATE: Partial<State> = {
	todos: [],
	currentFilter: "All"
};

const addItem = createEventHandler<State, "addItem">((state, event) => {
	const text = event.payload;
	if (!text) {
		return state;
	}

	return {
		...state,
		todos: [
			...state.todos,
			{
				text,
				completed: false
			}
		]
	};
});

const updateItem = createEventHandler<State, "updateItem">((state, event) => {
	const { text, index } = event.payload;
	if (!text) {
		return state;
	}

	if (index < 0) {
		return state;
	}

	if (!state.todos[index]) {
		return state;
	}

	return {
		...state,
		todos: state.todos.map((todo, i) => {
			if (i === index) {
				todo.text = text;
			}
			return todo;
		})
	};
});

const deleteItem = createEventHandler<State, "deleteItem">((state, event) => {
	const index = event.payload;
	if (index < 0) {
		return state;
	}

	if (!state.todos[index]) {
		return state;
	}

	return {
		...state,
		todos: state.todos.filter((todo, i) => i !== index)
	};
});

const toggleItemCompleted = createEventHandler<State, "toggleItemCompleted">(
	(state, event) => {
		const index = event.payload;

		if (index < 0) {
			return state;
		}

		if (!state.todos[index]) {
			return state;
		}

		return {
			...state,
			todos: state.todos.map((todo, i) => {
				if (i === index) {
					todo.completed = !todo.completed;
				}
				return todo;
			})
		};
	}
);

const completeAll = createEventHandler<State, "completeAll">((state, event) => {
	return {
		...state,
		todos: state.todos.map((todo, i) => {
			todo.completed = true;
			return todo;
		})
	};
});

const clearCompleted = createEventHandler<State, "clearCompleted">(
	(state, event) => {
		return {
			...state,
			todos: state.todos.filter((t) => !t.completed)
		};
	}
);

const changeFilter = createEventHandler<State, "changeFilter">(
	(state, event) => {
		return {
			...state,
			currentFilter: event.payload
		};
	}
);

const methods = {
	ITEM_ADDED: addItem,
	ITEM_UPDATED: updateItem,
	ITEM_DELETED: deleteItem,
	ITEMS_COMPLETED_TOGGLED: toggleItemCompleted,
	ITEMS_MARKED_AS_COMPLETED: completeAll,
	COMPLETED_ITEM_DELETED: clearCompleted,
	FILTER_CHANGED: changeFilter
};

export const modelFactory = (initialState = INITIAL_STATE) => {
	return (prevState?: State, event?: CustomEvents): State => {
		if (!prevState) {
			return cloneDeep(initialState) as State;
		}

		if (!event) {
			return prevState;
		}

		const currentModifier = methods[event.type] as (
			state: State,
			event: CustomEvents
		) => State;

		if (!currentModifier) {
			return prevState;
		}

		return currentModifier(prevState, event);
	};
};
