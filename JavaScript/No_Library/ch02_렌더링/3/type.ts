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
	[key: string]: (targetElement: HTMLElement, state: State) => HTMLElement;
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
	state: State
) => HTMLElement;
