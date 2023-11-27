import { eventCreators } from "../model/eventCreators";

declare global {
	interface Window {
		faker: {
			random: {
				number: (max: number) => number;
				boolean: () => boolean;
				words: (count: number) => string;
			};
		};
	}
}

export interface Registry {
	[key: string]: (
		targetElement: HTMLElement,
		state: State,
		dispatch: (event: CustomEvents) => void
	) => HTMLElement;
}

export interface Todo {
	text: string;
	completed: boolean;
}

export interface State {
	todos: Todo[];
	currentFilter: string;
	addChangeListener: (listener: (state: State) => void) => void;
}

export type Component = (
	targetElement: HTMLElement,
	state: State,
	dispatch: (event: CustomEvents) => void
) => HTMLElement;

export type CustomEvents = ReturnType<
	(typeof eventCreators)[keyof typeof eventCreators]
>;

export interface EventHandler<
	State,
	EventCreator extends (...args: any[]) => any
> {
	(state: State, event: ReturnType<EventCreator>): State;
}
