import { CustomEvents, State } from "../core/types";
import { eventCreators } from "../model/eventCreators";

export default (
	targetElement: HTMLElement,
	{ currentFilter }: State,
	dispatch: (event: CustomEvents) => void
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
			a.textContent && dispatch(eventCreators.changeFilter(a.textContent));
		});
	});

	return newFilters;
};
