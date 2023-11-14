import registry from "./core/registry";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import getTodos from "./getTodos";
import { applyDiff } from "./core/diff";
import { CustomEvents } from "./core/type";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
	todos: getTodos(),
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
	}
};

const render = () => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector(".todoapp") as HTMLElement;
		if (!main) return;
		const newMain = registry.renderRoot(main, state, events);
		applyDiff(main, main, newMain);
	});
};

window.setInterval(() => {
	state.todos = getTodos();
	render();
}, 5000);

render();
