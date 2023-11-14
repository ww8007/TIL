import { State } from "../types/type";
import Footer from "./Footer";
import List, { EVENTS, isDeleteEvent } from "./List";

export default class App extends HTMLElement {
	private state: State;
	private template: HTMLTemplateElement;
	private list: List;
	private footer: Footer;
	constructor() {
		super();

		this.state = {
			todos: [],
			filter: "all"
		};

		this.template = document.getElementById("todo-app") as HTMLTemplateElement;

		this.list = new List();
		this.footer = new Footer();
	}

	deleteItem(index: number) {
		this.state.todos.splice(index, 1);
		this.syncAttributes();
	}

	addItem(text: string) {
		this.state.todos.push({
			text,
			completed: false
		});
		this.syncAttributes();
	}

	syncAttributes() {
		this.list.todos = this.state.todos;
		this.footer.todos = this.state.todos;
		this.footer.filter = this.state.filter;
	}

	connectedCallback() {
		window.requestAnimationFrame(() => {
			const content = this.template.content.firstElementChild?.cloneNode(
				true
			) as HTMLElement;

			this.appendChild(content);

			const newTodoInput = this.querySelector(".new-todo") as HTMLInputElement;

			newTodoInput.addEventListener("keypress", (e) => {
				if (e.key === "Enter") {
					const input = e.target as HTMLInputElement;
					this.addItem(input.value);
					input.value = "";
				}
			});

			this.footer = this.querySelector("todomvc-footer") as Footer;

			this.list = this.querySelector("todomvc-list") as List;

			this.list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
				if (isDeleteEvent(e)) this.deleteItem(e.detail.index);
			});

			this.syncAttributes();
		});
	}
}
