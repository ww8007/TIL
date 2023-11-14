import registry from "./core/registry";
import appView from "./view/app";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import { applyDiff } from "./core/diff";
import { CustomEvents, State } from "./core/type";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state: State = {
	todos: [],
	currentFilter: "All"
};

const events: CustomEvents = {
	deleteItem: (index: number) => {
		state.todos.splice(index, 1);
		render();
	},
	addItem: (text: string) => {
		state.todos.push({
			text,
			completed: false
		});
		render();
	},
	toggleItemCompleted: (index: number) => {
		const newState = state.todos.map((todo, i) => {
			if (i === index) {
				return {
					...todo,
					completed: !todo.completed
				};
			}
			return todo;
		});
		state.todos = newState;
		render();
	}
};

const render = () => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector("#root") as HTMLElement;
		if (!main) return;
		const newMain = registry.renderRoot(main, state, events);
		applyDiff(main, main, newMain);
	});
};

render();
