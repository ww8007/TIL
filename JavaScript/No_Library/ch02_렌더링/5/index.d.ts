export interface Registry {
	[key: string]: (targetElement: Element, state: State) => Element;
}

export interface Todo {
	text: string;
	completed: boolean;
}

export interface State {
	todos: Todo[];
	currentFilter: string;
}

export type Component = (targetElement: Element, state: State) => Element;
