import getTodos from "./getTodos";
import view from "./view";

const state = {
	todos: getTodos(),
	currentFilter: "All"
};

const main = document.querySelector(".todoapp");

if (!main) {
	throw new Error("No .todoapp element");
}

window.requestAnimationFrame(() => {
	const newMain = view(main, state);
	main.replaceWith(newMain);
});
