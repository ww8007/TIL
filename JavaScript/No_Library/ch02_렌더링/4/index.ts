import registry from "./registry";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import getTodos from "./getTodos";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
	todos: getTodos(),
	currentFilter: "All"
};

const render = () => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector(".todoapp") as HTMLElement;
		if (!main) return;
		const newMain = registry.renderRoot(main, state);
		main.replaceWith(newMain);
	});
};

window.setInterval(() => {
	state.todos = getTodos();
	render();
}, 5000);

render();
