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
}

export type Component = (
	targetElement: HTMLElement,
	state: State,
	dispatch: (event: CustomEvents) => void
) => HTMLElement;

export type CustomEvents = ReturnType<
	(typeof eventCreators)[keyof typeof eventCreators]
>;

export interface Event {
	type: [keyof typeof eventCreators];
	payload?: any;
}

export interface EventHandler<
	State,
	EventCreator extends (...args: any[]) => CustomEvents
> {
	(state: State, event: ReturnType<EventCreator>): State;
}
