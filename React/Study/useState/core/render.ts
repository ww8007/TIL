export let currentInstance: {
	component: ComponentFunction;
	props: any;
} | null = null;

export const render = (vnode: VNode, container: HTMLElement): void => {
	// 기존에 렌더링된 내용을 지운다.

	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}

	_render(vnode, container);
};

const _render = (vnode: VNode | string, container: HTMLElement): void => {
	if (typeof vnode === "string") {
		container.appendChild(document.createTextNode(vnode));
		return;
	}

	if (typeof vnode.type === "function") {
		const child = vnode.type(vnode.props);
		_render(child, container);
		return;
	}

	const domElement = document.createElement(vnode.type);
	for (const key in vnode.props) {
		if (key.startsWith("on")) {
			const eventType = key.slice(2).toLowerCase();
			domElement.addEventListener(eventType, vnode.props[key]);
		} else {
			domElement.setAttribute(key, String(vnode.props[key]));
		}
	}

	if (vnode.children && Array.isArray(vnode.children)) {
		for (const child of vnode.children) {
			_render(child, domElement);
		}
	}

	container.appendChild(domElement);
};

export const renderComponent = (
	component: ComponentFunction,
	props: any,
	container: HTMLElement
) => {
	currentInstance = { component, props };
	const vnode = component(props);
	render(vnode, container);
};
