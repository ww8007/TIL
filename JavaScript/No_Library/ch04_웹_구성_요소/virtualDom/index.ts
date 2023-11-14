import HelloWorld from "./components/HelloWorld";

window.customElements.define("hello-world", HelloWorld);

const changeColorTo = (color: string) => {
	const helloWorld = document.querySelectorAll(
		"hello-world"
	) as NodeListOf<HelloWorld>;

	Array.from(helloWorld).forEach((target) => {
		target.color = color;
	});
};

const button = document.querySelector("button");

button?.addEventListener("click", () => {
	changeColorTo("red");
});
