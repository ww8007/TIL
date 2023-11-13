import { State, Todo } from "../core/type";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
	if (!template) {
		template = document.getElementById("todo-item") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(
		true
	) as HTMLInputElement;
};

const getTodoElement = (todo: Todo) => {
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

	return element;
};

export default (targetElement: HTMLElement, { todos }: State) => {
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;

	newTodoList.innerHTML = "";

	todos.map(getTodoElement).forEach((element) => {
		newTodoList.appendChild(element);
	});

	return newTodoList;
};
