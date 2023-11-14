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
		events?: CustomEvents
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
	events?: CustomEvents
) => HTMLElement;

export type CustomEvents = {
	addItem: (text: string) => void;
	updateItem?: (index: number, text: string) => void;
	deleteItem: (index: number) => void;
	toggleItemCompleted: (index: number) => void;
	completeAll?: () => void;
	clearCompleted?: () => void;
	changeFilter?: (filter: string) => void;
};
