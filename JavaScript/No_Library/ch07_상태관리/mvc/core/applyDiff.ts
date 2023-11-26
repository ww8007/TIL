const differentValue = (node1: HTMLInputElement, node2: HTMLInputElement) => {
	if (node1.value !== node2.value) {
		return true;
	}

	if (node1.checked !== node2.checked) {
		return true;
	}

	return false;
};

const isNodeChanged = (node1: HTMLElement, node2: HTMLElement) => {
	const n1Attributes = node1.attributes;
	const n2Attributes = node2.attributes;
	if (n1Attributes.length !== n2Attributes.length) {
		return true;
	}

	const differentAttribute = Array.from(n1Attributes).find((attribute) => {
		const { name } = attribute;
		const attribute1 = node1.getAttribute(name);
		const attribute2 = node2.getAttribute(name);

		return attribute1 !== attribute2;
	});

	if (differentAttribute) {
		return true;
	}

	if (differentValue(node1 as HTMLInputElement, node2 as HTMLInputElement)) {
		return true;
	}

	if (
		node1.children.length === 0 &&
		node2.children.length === 0 &&
		node1.textContent !== node2.textContent
	) {
		return true;
	}

	return false;
};

const applyDiff = (
	parentNode: HTMLElement,
	realNode: HTMLElement,
	virtualNode: HTMLElement
) => {
	if (realNode && !virtualNode) {
		realNode.remove();
		return;
	}

	if (!realNode && virtualNode) {
		parentNode.appendChild(virtualNode);
		return;
	}

	if (isNodeChanged(virtualNode, realNode)) {
		realNode.replaceWith(virtualNode);
		return;
	}

	const realChildren = Array.from(realNode.children) as HTMLElement[];
	const virtualChildren = Array.from(virtualNode.children) as HTMLElement[];

	const max = Math.max(realChildren.length, virtualChildren.length);
	for (let i = 0; i < max; i++) {
		applyDiff(realNode, realChildren[i], virtualChildren[i]);
	}
};

export default applyDiff;
