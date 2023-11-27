import { Component, CustomEvents, Registry, State } from "./types";

const registry: Registry = {};

const renderWrapper = (component: Component) => {
	return (
		targetElement: HTMLElement,
		state: State,
		dispatch: (event: CustomEvents) => void
	) => {
		const element = component(targetElement, state, dispatch);

		const childComponents = element.querySelectorAll(
			"[data-component]"
		) as NodeListOf<HTMLElement>;

		Array.from(childComponents).forEach((target) => {
			const name = target.dataset.component as string;

			const child = registry[name];
			if (!child) {
				return;
			}

			target.replaceWith(child(target, state, dispatch));
		});

		return element;
	};
};

const add = (name: string, component: Component) => {
	registry[name] = renderWrapper(component);
};

const renderRoot = (
	root: HTMLElement,
	state: State,
	dispatch: (event: CustomEvents) => void
) => {
	const cloneComponent = (root: HTMLElement) => {
		return root.cloneNode(true) as unknown as HTMLElement;
	};

	return renderWrapper(cloneComponent)(root, state, dispatch);
};

export default {
	add,
	renderRoot
};
