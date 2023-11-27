import { State } from "../core/types";
import { eventCreators } from "./eventCreators";

interface Event {}

const changeFilter = (
	state: State,
	event: ReturnType<typeof eventCreators.changeFilter>
) => {
	return event.payload;
};

const modifiers = {
	FILTER_CHANGED: changeFilter
};

export const filterModifier = (
	prevState: State,
	event: ReturnType<typeof eventCreators.changeFilter>
) => {
	if (!event) {
		return "All";
	}

	const currentModifier = modifiers[event.type];

	if (!currentModifier) {
		return prevState;
	}

	return currentModifier(prevState, event);
};
