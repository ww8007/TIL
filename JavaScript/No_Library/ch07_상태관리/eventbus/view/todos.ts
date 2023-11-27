import { CustomEvents, State, Todo } from "../core/types";
import { eventCreators } from "../model/eventCreators";

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
	dispatch: (event: CustomEvents) => void
) => {
	const deleteHandler = (e: any) => dispatch(eventCreators.deleteItem(index));
	const toggleHandler = (e: any) =>
		dispatch(eventCreators.toggleItemCompleted(index));
	const updateHandler = (e: any) => {
		if (e.key === "Enter") {
			element.classList.remove("editing");
			dispatch(eventCreators.updateItem(index, e.target.value));
		}
	};

	element
		.querySelector("button.destroy")
		?.addEventListener("click", deleteHandler);

	element
		.querySelector("input.toggle")
		?.addEventListener("click", toggleHandler);

	element.addEventListener("dblclick", () => {
		element.classList.add("editing");
		const input = element.querySelector("input.edit") as HTMLInputElement;
		input.focus();
	});

	element
		.querySelector("input.edit")
		?.addEventListener("keypress", updateHandler);
};

const getTodoElement = (
	todo: Todo,
	index: number,
	dispatch: (event: CustomEvents) => void
) => {
	const { text, completed } = todo;

	const element = createNewTodoNode() as HTMLElement;

	const input = element.querySelector("input.edit") as HTMLInputElement;
	input.value = text;

	const label = element.querySelector("label") as HTMLLabelElement;
	label.textContent = text;

	if (completed) {
		element.classList.add("completed");
		const inputToggle = element.querySelector(
			"input.toggle"
		) as HTMLInputElement;
		inputToggle.checked = true;
	}

	attachEventsToTodoElement(element, index, dispatch);

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
	dispatch: (event: CustomEvents) => void
) => {
	const { todos, currentFilter } = state;
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;

	newTodoList.innerHTML = "";

	const filteredTodos = filterTodos(todos, currentFilter);

	filteredTodos
		.map((todo, index) => getTodoElement(todo, index, dispatch))
		.forEach((element) => {
			newTodoList.appendChild(element);
		});

	return newTodoList;
};
