import { Todo } from "../types/type";

const TEMPLATE = '<ul class="todo-list"></ul>';

export const EVENTS = {
	DELETE_ITEM: "DELETE_ITEM"
};

interface DeleteItem {
	index: number;
}

export const isDeleteEvent = (e: Event): e is CustomEvent<DeleteItem> => {
	return e.type === EVENTS.DELETE_ITEM;
};

export default class List extends HTMLElement {
	private list: HTMLUListElement;
	private itemTemplate: HTMLTemplateElement;

	constructor() {
		super();

		this.list = document.createElement("ul");
		this.itemTemplate = document.createElement("template");
	}

	static get observedAttributes() {
		return ["todos"];
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

	onDeleteClick(index: number) {
		const event = new CustomEvent(EVENTS.DELETE_ITEM, {
			detail: {
				index
			}
		});

		this.dispatchEvent(event);
	}

	createNewTodoNode() {
		return this.itemTemplate.content.firstElementChild?.cloneNode(
			true
		) as HTMLElement;
	}

	getTodoElement(todo: Todo, index: number) {
		const { text, completed } = todo;

		const element = this.createNewTodoNode();

		const input = element.querySelector("input.edit") as HTMLInputElement;
		input.value = text;

		const label = element.querySelector("label") as HTMLLabelElement;
		label.textContent = text;

		if (completed) {
			element.classList.add("completed");

			const input = element.querySelector("input.toggle") as HTMLInputElement;
			input.checked = true;
		}

		const button = element.querySelector("button.destroy") as HTMLButtonElement;
		button.dataset.index = index.toString();

		return element;
	}

	updateList() {
		this.list.innerHTML = "";

		const todoElements = this.todos.map(
			this.getTodoElement.bind(this)
		) as Node[];
		todoElements.forEach((element) => {
			this.list.appendChild(element);
		});
	}

	connectedCallback() {
		this.innerHTML = TEMPLATE;
		this.itemTemplate = document.getElementById(
			"todo-item"
		) as HTMLTemplateElement;

		this.list = this.querySelector("ul") as HTMLUListElement;

		this.list.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target.matches("button.destroy")) {
				this.onDeleteClick(Number(target.dataset.index));
			}
		});

		this.updateList();
	}

	attributeChangedCallback() {
		this.updateList();
	}
}
