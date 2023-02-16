const registry = {};

const renderWrapper = (component) => {
	return (targetElement, state) => {
		// console.log('component is', component)
		console.log(typeof component)
		const element = component(targetElement, state);

		const childComponents = element.querySelectorAll("[data-component]");

		console.group('element', element, 
		'component',
		component)

		console.log(childComponents.length);

		Array.from(childComponents).forEach((target) => {
			const name = target.dataset.component;

			const child = registry[name];
			if (!child) {
				return;
			}

			target.replaceWith(child(target, state));
		});

		return element;
	};
};

const add = (name, component) => {
	registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
	const cloneComponent = (root) => {
		console.log("root is", root.cloneNode(true));
		return root.cloneNode(true);
	};

	return renderWrapper(cloneComponent)(root, state);
};

export default {
	add,
	renderRoot
};
