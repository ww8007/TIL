import { CustomEvents, State, Todo } from "../core/types";

let template: HTMLTemplateElement;

const allTodosCompleted = (todos: Todo[]) => {
	if (todos.length === 0) {
		return false;
	}
	return !todos.find((t) => !t.completed);
};

const noCompletedItemIsPresent = (todos: Todo[]) =>
	!todos.find((t) => t.completed);

const getTemplate = () => {
	if (!template) {
		template = document.getElementById("todo-app") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
};

const addEvents = (targetElement: HTMLElement, events: CustomEvents) => {
	const { clearCompleted, completeAll, addItem } = events;
	const element = targetElement.querySelector(".new-todo") as HTMLInputElement;
	element.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && e.target) {
			const input = e.target as HTMLInputElement;
			addItem(input.value);
			input.value = "";
		}
	});

	targetElement
		.querySelector("input.toggle-all")
		?.addEventListener("click", completeAll);

	targetElement
		.querySelector(".clear-completed")
		?.addEventListener("click", clearCompleted);
};

export default (
	targetElement: HTMLElement,
	state: State,
	events?: CustomEvents
) => {
	const newApp = targetElement.cloneNode(true) as HTMLElement;

	newApp.innerHTML = "";
	newApp.appendChild(getTemplate());

	if (noCompletedItemIsPresent(state.todos)) {
		newApp.querySelector(".clear-completed")?.classList.add("hidden");
	} else {
		newApp.querySelector(".clear-completed")?.classList.remove("hidden");
	}

	const inputToggleAll = newApp.querySelector(
		"input.toggle-all"
	) as HTMLInputElement;
	inputToggleAll.checked = allTodosCompleted(state.todos);

	events && addEvents(newApp, events);

	return newApp;
};
