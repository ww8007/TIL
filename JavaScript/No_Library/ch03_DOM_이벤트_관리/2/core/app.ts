let template: HTMLTemplateElement;

const createAppElement = () => {
	if (!template) {
		template = document.getElementById("todo-app") as HTMLTemplateElement;
	}

	return template.content.firstElementChild?.cloneNode(true) as HTMLElement;
};

export default (targetElement: HTMLElement) => {
	const newApp = targetElement.cloneNode(true) as HTMLElement;
	newApp.innerHTML = "";
	newApp.appendChild(createAppElement());
	return newApp;
};
