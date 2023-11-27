import { CustomEvents, State, Todo } from "../core/types";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
	if (!template) {
		template = document.getElementById("todo-item") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true);
};

const attachEventsToTodoElement = (
	element: HTMLElement,
	index: number,
	events: CustomEvents
) => {
	const handler = (e: any) => events.deleteItem(index);

	element.querySelector("button.destroy")?.addEventListener("click", handler);

	element
		.querySelector("input.toggle")
		?.addEventListener("click", (e) => events.toggleItemCompleted(index));

	element.addEventListener("dblclick", () => {
		element.classList.add("editing");
		const inputEdit = element.querySelector("input.edit") as HTMLInputElement;
		inputEdit.focus();
	});

	const inputEdit = element.querySelector("input.edit") as HTMLInputElement;
	inputEdit.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && e.target) {
			const target = e.target as HTMLInputElement;
			element.classList.remove("editing");
			target && events.updateItem(index, target.value);
		}
	});
};

const getTodoElement = (todo: Todo, index: number, events?: CustomEvents) => {
	const { text, completed } = todo;

	const element = createNewTodoNode() as HTMLElement;

	const inputEdit = element.querySelector("input.edit") as HTMLInputElement;
	inputEdit.value = text;

	const label = element.querySelector("label") as HTMLLabelElement;
	label.textContent = text;

	if (completed) {
		element.classList.add("completed");
		const inputToggle = element.querySelector(
			"input.toggle"
		) as HTMLInputElement;
		inputToggle.checked = true;
	}

	events && attachEventsToTodoElement(element, index, events);

	return element;
};

const filterTodos = (todos: Todo[], filter: string) => {
	const isCompleted = (todo: Todo) => todo.completed;
	if (filter === "Active") {
		return todos.filter((t) => !isCompleted(t));
	}

	if (filter === "Completed") {
		return todos.filter(isCompleted);
	}

	return [...todos];
};

export default (
	targetElement: HTMLElement,
	state: State,
	events?: CustomEvents
) => {
	const { todos, currentFilter } = state;
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;

	newTodoList.innerHTML = "";

	const filteredTodos = filterTodos(todos, currentFilter) as Todo[];

	filteredTodos
		.map((todo, index) => getTodoElement(todo, index, events))
		.forEach((element) => {
			newTodoList.appendChild(element);
		});

	return newTodoList;
};
