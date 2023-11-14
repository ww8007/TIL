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

const getTodoElement = (todo: Todo, index: number) => {
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

	// 이벤트 위임
	const destroyButton = element.querySelector(
		"button.destroy"
	) as HTMLButtonElement;

	destroyButton.dataset.index = index.toString();

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
		.map((todo, index) => getTodoElement(todo, index))
		.forEach((element) => {
			newTodoList.appendChild(element);
		});

	// 새롭게 추가된 부분
	newTodoList.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		if (target.matches("button.destroy")) {
			const index = target.dataset.index;
			if (index) {
				events.deleteItem(parseInt(index));
			}
		}
	});

	return newTodoList;
};
