import { CustomEvents, State } from "../core/type";

let template: HTMLTemplateElement;

const getTemplate = () => {
	if (!template) {
		template = document.getElementById("todo-app") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
};

const addEvents = (targetElement: HTMLElement, events: CustomEvents) => {
	const element = targetElement.querySelector(".new-todo") as HTMLInputElement;
	element.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && e.target) {
			const input = e.target as HTMLInputElement;
			events.addItem(input.value);
			input.value = "";
		}
	});
};

export default (
	targetElement: HTMLElement,
	state: State,
	events?: CustomEvents
) => {
	const newApp = targetElement.cloneNode(true) as HTMLElement;

	newApp.innerHTML = "";
	newApp.appendChild(getTemplate());

	events && addEvents(newApp, events);

	return newApp;
};
