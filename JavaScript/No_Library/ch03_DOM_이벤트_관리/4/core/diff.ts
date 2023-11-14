export const applyDiff = (
	parentNode: HTMLElement,
	realNode: HTMLElement,
	virtualNode: HTMLElement
) => {
	// 새 노드가 없으면 기존 노드를 삭제
	if (!virtualNode && realNode) {
		realNode.remove();
		return;
	}
	// 실제 노드가 없지만 가상 노드가 있으면 부모 노드에 추가
	if (!realNode && virtualNode) {
		parentNode.appendChild(virtualNode);
		return;
	}
	// 두 노드가 모두 있으면 차이가 있는지 확인
	if (isNodeChanged(realNode, virtualNode)) {
		realNode.replaceWith(virtualNode);
		return;
	}

	const realChildren = Array.from(realNode.children);
	const virtualChildren = Array.from(virtualNode.children);

	const max = Math.max(realChildren.length, virtualChildren.length);

	for (let i = 0; i < max; i++) {
		applyDiff(
			realNode,
			realChildren[i] as HTMLElement,
			virtualChildren[i] as HTMLElement
		);
	}
};

const isNodeChanged = (realNode: HTMLElement, virtualNode: HTMLElement) => {
	const realAttributes = realNode.attributes;
	const virtualAttributes = virtualNode.attributes;

	// 속성의 개수가 다르면 노드가 변경된 것으로 간주
	if (realAttributes?.length !== virtualAttributes?.length) {
		return true;
	}

	// 속성의 이름이 다르면 노드가 변경된 것으로 간주
	const differentAttribute = Array.from(realAttributes).find((attribute) => {
		const { name } = attribute;
		const realValue = realNode.getAttribute(name);
		const virtualValue = virtualNode.getAttribute(name);
		return realValue !== virtualValue;
	});

	if (differentAttribute) {
		return true;
	}

	// 자식 노드가 없고 텍스트가 다르면 노드가 변경된 것으로 간주
	if (
		realNode.children.length === 0 &&
		virtualNode.children.length === 0 &&
		realNode.textContent !== virtualNode.textContent
	) {
		return true;
	}

	return false;
};
