const DEFAULT_COLOR = "black";

const createDomElement = (color: string) => {
	const div = document.createElement("div");
	div.innerText = "Hello World";
	div.style.color = color;
	return div;
};

export default class HelloWorld extends HTMLElement {
	private div: HTMLDivElement | null = null;
	constructor() {
		super();
		this.div = null;
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
		if (!this.div) return;

		if (name === "color") {
			this.div.style.color = newValue;
		}
	}

	connectedCallback() {
		window.requestAnimationFrame(() => {
			this.appendChild(createDomElement(this.color));
		});
	}
}
