import { CustomEvents, EventHandler, State } from "../core/types";
import { createEventHandler } from "./eventCreators";

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

type ExcludeFilterChanged<T> = T extends { type: "FILTER_CHANGED" } ? never : T;
export type OmittedCustomEvents = ExcludeFilterChanged<CustomEvents>;

const methods: {
	[K in OmittedCustomEvents["type"]]: EventHandler<
		State,
		(...args: any) => CustomEvents
	>;
} = {
	ITEM_ADDED: addItem,
	ITEM_UPDATED: updateItem,
	ITEM_DELETED: deleteItem,
	ITEMS_COMPLETED_TOGGLED: toggleItemCompleted,
	ITEMS_MARKED_AS_COMPLETED: completeAll,
	COMPLETED_ITEM_DELETED: clearCompleted
};

export const todosModifiers = (
	prevState: State,
	event: OmittedCustomEvents
) => {
	if (!event) {
		return prevState;
	}

	const currentModifier = methods[event.type];

	if (!currentModifier) {
		return prevState;
	}

	return currentModifier(prevState, event);
};
