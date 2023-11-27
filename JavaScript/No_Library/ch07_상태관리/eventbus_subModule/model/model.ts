import { CustomEvents, State } from "../core/types";
import { eventCreators } from "./eventCreators";
import { filterModifier } from "./filter";
import { OmittedCustomEvents, todosModifiers } from "./todos";

const cloneDeep = <T>(x: T) => {
	return JSON.parse(JSON.stringify(x)) as T;
};

const INITIAL_STATE: State = {
	todos: [],
	currentFilter: "All"
};

export const modelFactory = (initialState = INITIAL_STATE) => {
	return (prevState?: State, event?: CustomEvents) => {
		if (!event) {
			return cloneDeep(initialState);
		}

		if (!prevState) {
			return cloneDeep(INITIAL_STATE);
		}

		const newTodoState = todosModifiers(
			prevState,
			event as OmittedCustomEvents
		);
		const newCurrentFilterState = filterModifier(
			prevState,
			event as ReturnType<typeof eventCreators.changeFilter>
		) as string;

		return {
			todos: newTodoState.todos,
			currentFilter: newCurrentFilterState
		};
	};
};
