import { CustomEvents, State } from "../core/types";
import { eventCreators } from "../model/eventCreators";

let template: HTMLTemplateElement;

const getTemplate = () => {
	if (!template) {
		template = document.getElementById("todo-app") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
};

const addEvents = (
	targetElement: HTMLElement,
	dispatch: (event: CustomEvents) => void
) => {
	const element = targetElement.querySelector(".new-todo") as HTMLInputElement;
	element.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && e.target) {
			const input = e.target as HTMLInputElement;
			const event = eventCreators.addItem(input.value);
			dispatch(event);
			input.value = "";
		}
	});
};

export default (
	targetElement: HTMLElement,
	state: State,
	dispatch: (event: CustomEvents) => void
) => {
	const newApp = targetElement.cloneNode(true) as HTMLElement;

	newApp.innerHTML = "";
	newApp.appendChild(getTemplate());

	addEvents(newApp, dispatch);

	return newApp;
};
