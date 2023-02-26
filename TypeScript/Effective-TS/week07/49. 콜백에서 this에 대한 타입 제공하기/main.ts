class C {
	vals = [1, 2, 3];
	logSquares() {
		for (const val of this.vals) {
			console.log(val * val);
		}
	}
}

const c = new C();
const method = c.logSquares;
method.call(c);

document.querySelector("input")!.addEventListener("change", function (e) {
	console.log(this);
});

const makeButton = (options: { text: string; onClick: () => void }) => {
	const button = document.createElement("button");
};

class ResetButton {
	render() {
		return makeButton({ text: "Reset", onClick: this.onClick });
	}
	onClick = () => {
		console.log(this);
	};
}

function addKeyListener(
	el: HTMLElement,
	fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
	el.addEventListener("keydown", (e) => {
		fn.call(el, e);
	});
}

declare let el: HTMLElement;
addKeyListener(el, function (e) {
	this.innerHTML;
});

class Foo {
	registerHandler(el: HTMLElement) {
		addKeyListener(el, (e) => {});
	}
}
