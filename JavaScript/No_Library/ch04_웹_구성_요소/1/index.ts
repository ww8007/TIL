import HelloWord from "./HelloWorld";

window.customElements.define("hello-world", HelloWord);

const changeColorTo = (color: string) => {
	const helloWorld = document.querySelectorAll(
		"hello-world"
	) as NodeListOf<HelloWord>;
	helloWorld.forEach((helloWorld) => {
		helloWorld.color = color;
	});
};

const button = document.querySelector("button");
button?.addEventListener("click", () => {
	changeColorTo("blue");
});
