const p = document.getElementsByTagName("p")[0];
p instanceof HTMLParagraphElement; // true

function addDragHandler(el: HTMLElement) {
	el.addEventListener("mousedown", (eDown) => {
		const dragStart = [eDown.clientX, eDown.clientY];
		const handleUp = (eUp: MouseEvent) => {
			el.classList.remove("dragging");
			el.removeEventListener("mouseup", handleUp);
			const dragEnd = [eUp.clientX, eUp.clientY];
			console.log(
				"dragged",
				dragEnd[0] - dragStart[0],
				dragEnd[1] - dragStart[1]
			);
		};
		el.addEventListener("mouseup", handleUp);
	});
}

const div = document.getElementsByTagName("div")[0];
if (div instanceof HTMLDivElement) {
	addDragHandler(div);
}
