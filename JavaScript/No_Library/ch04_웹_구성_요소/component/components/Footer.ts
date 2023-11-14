import { Todo } from "../types/type";

const getTodoCount = (todos: Todo[]) => {
	const notCompleted = todos.filter((todo) => !todo.completed);

	const { length } = notCompleted;
	if (length === 1) {
		return "1 Item left";
	}

	return `${length} Items left`;
};

export default class Footer extends HTMLElement {
	static get observedAttributes() {
		return ["filter", "todos"];
	}

	get todos() {
		if (!this.hasAttribute("todos")) {
			return [];
		}

		return JSON.parse(this.getAttribute("todos") as string);
	}

	set todos(value) {
		this.setAttribute("todos", JSON.stringify(value));
	}

	get filter() {
		return this.getAttribute("filter") as string;
	}

	set filter(value: string) {
		this.setAttribute("filter", value);
	}

	connectedCallback() {
		const template = document.getElementById("footer") as HTMLTemplateElement;
		const content = template.content.firstElementChild?.cloneNode(
			true
		) as HTMLElement;

		this.appendChild(content);

		const { filter, todos } = this;

		this.querySelectorAll("li a").forEach((a) => {
			if (a.textContent === filter) {
				a.classList.add("selected");
			} else {
				a.classList.remove("selected");
			}
		});

		const label = getTodoCount(todos);

		const spanTodoCount = this.querySelector("span.todo-count");
		if (spanTodoCount) {
			spanTodoCount.textContent = label;
		}
	}
}
