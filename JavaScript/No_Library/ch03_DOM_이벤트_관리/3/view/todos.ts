import { CustomEvents, State, Todo } from "../core/type";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
	if (!template) {
		template = document.getElementById("todo-item") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(
		true
	) as HTMLInputElement;
};

const getTodoElement = (todo: Todo, index: number, events: CustomEvents) => {
	const { text, completed } = todo;

	const element = createNewTodoNode();

	if (element.querySelector("input.edit")) {
		const input = element.querySelector("input.edit") as HTMLInputElement;
		input.value = text;
	}

	if (element.querySelector("label")) {
		const label = element.querySelector("label") as HTMLLabelElement;
		label.textContent = text;
	}

	if (completed) {
		element.classList.add("completed");
		const input = element.querySelector("input.toggle") as HTMLInputElement;
		input.checked = true;
	}

	const handler = (e: Event) => events.deleteItem(index);

	const deleteButton = element.querySelector(
		"button.destroy"
	) as HTMLButtonElement;

	deleteButton.addEventListener("click", handler);

	return element;
};

export default (
	targetElement: HTMLElement,
	{ todos }: State,
	events?: CustomEvents
) => {
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;

	newTodoList.innerHTML = "";

	if (!events) return newTodoList;
	todos
		.map((todo, index) => getTodoElement(todo, index, events))
		.forEach((element) => {
			newTodoList.appendChild(element);
		});

	return newTodoList;
};
