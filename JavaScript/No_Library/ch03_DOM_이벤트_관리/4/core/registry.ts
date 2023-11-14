import { Component, CustomEvents, Registry, State } from "./type";

const registry: Registry = {};

const renderWrapper = (component: Component) => {
	return (targetElement: HTMLElement, state: State, events?: CustomEvents) => {
		const element = component(targetElement, state, events);

		const childComponents = element.querySelectorAll(
			"[data-component]"
		) as NodeListOf<HTMLElement>;

		Array.from(childComponents).forEach((target) => {
			const name = target.dataset.component as string;

			const child = registry[name];
			if (!child) return;

			events
				? target.replaceWith(child(target, state, events))
				: target.replaceWith(child(target, state));
		});

		return element;
	};
};

const add = (name: string, component: Component) => {
	registry[name] = renderWrapper(component);
};

const renderRoot = (root: HTMLElement, state: State, events: CustomEvents) => {
	const cloneComponent = (root: HTMLElement) => {
		return root.cloneNode(true) as unknown as HTMLElement;
	};

	return renderWrapper(cloneComponent)(root, state, events);
};

export default {
	add,
	renderRoot
};
