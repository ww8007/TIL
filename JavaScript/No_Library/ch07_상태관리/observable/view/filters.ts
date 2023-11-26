import { CustomEvents, State } from "../core/types";

export default (
	targetElement: HTMLElement,
	{ currentFilter }: State,
	events?: CustomEvents
) => {
	const newFilters = targetElement.cloneNode(true) as HTMLElement;

	Array.from(newFilters.querySelectorAll("li a")).forEach((a) => {
		if (a.textContent === currentFilter) {
			a.classList.add("selected");
		} else {
			a.classList.remove("selected");
		}

		a.addEventListener("click", (e) => {
			e.preventDefault();
			events && a.textContent && events.changeFilter(a.textContent);
		});
	});

	return newFilters;
};
