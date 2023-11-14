import applyDiff from "./applyDiff";

const DEFAULT_COLOR = "black";

const createDomElement = (color: string) => {
	const div = document.createElement("div");
	div.textContent = "Hello World!";
	div.style.color = color;
	return div;
};

export default class HelloWorld extends HTMLElement {
	constructor() {
		super();
	}
	static get observedAttributes() {
		return ["color"];
	}

	get color() {
		return this.getAttribute("color") || DEFAULT_COLOR;
	}

	set color(value) {
		this.setAttribute("color", value);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (!this.hasChildNodes()) {
			return;
		}

		if (this.firstElementChild)
			applyDiff(this, this.firstElementChild, createDomElement(newValue));
	}

	connectedCallback() {
		window.requestAnimationFrame(() => {
			this.appendChild(createDomElement(this.color));
		});
	}
}
