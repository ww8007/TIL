import { CustomEvents, State, Todo } from "../core/type";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
	if (!template) {
		template = document.getElementById("todo-item") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
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
		console.log(element);
		const input = element.querySelector("input.toggle") as HTMLInputElement;
		input.checked = true;
	}

	// 이벤트 위임
	const destroyButton = element.querySelector(
		"button.destroy"
	) as HTMLButtonElement;
	if (destroyButton) {
		destroyButton.dataset.index = index.toString();
	}

	const toggleButton = element.querySelector(
		"input.toggle"
	) as HTMLInputElement;
	if (toggleButton) {
		toggleButton.dataset.index = index.toString();
	}

	return element as Node;
};

export default (
	targetElement: HTMLElement,
	{ todos }: State,
	events?: CustomEvents
) => {
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;

	newTodoList.innerHTML = "";

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
				events && events.deleteItem(parseInt(index));
			}
		}
		if (target.matches("input.toggle")) {
			const index = target.dataset.index;
			if (index) {
				events && events.toggleItemCompleted(parseInt(index));
			}
		}
	});

	return newTodoList;
};
