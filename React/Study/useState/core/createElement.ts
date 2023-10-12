export const createElement = (
	type: any,
	props = {},
	...children: any[]
): VNode => {
	return {
		type,
		props: props || {},
		children: children.flat() || [] // 여기서 children.flat() 이 children을 항상 배열로 만듭니다.
	};
};
