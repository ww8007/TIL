import { currentInstance, render } from "./render";

type SetState<T> = (newState: T | ((prevState: T) => T)) => void;
type ReturnType<T> = [T, SetState<T>];

let states: unknown[] = [];
export let currentIndex = 0;

export const useState = <T>(initialValue: T): ReturnType<T> => {
	if (states[currentIndex] === undefined) {
		states[currentIndex] = initialValue;
	}

	const setStateIndex = currentIndex;

	const setState: SetState<T> = (newState: T | ((prevState: T) => T)) => {
		states[setStateIndex] =
			typeof newState === "function"
				? (newState as (prevState: T) => T)(states[setStateIndex] as T)
				: newState;

		if (currentInstance === null) {
			throw new Error("useState는 컴포넌트 함수 내에서만 호출할 수 있습니다.");
		}
		const tempIndex = currentIndex; // 현재 값 저장
		currentIndex = 0;
		const nextVNode = currentInstance.component(currentInstance.props);
		console.log("it is render");
		render(nextVNode, document.getElementById("root")!);
		currentIndex = tempIndex; // 원래 값으로 복원
	};

	currentIndex += 1; // 다음 호출을 위해 증가
	return [states[setStateIndex] as T, setState]; // 이전 상태값 반환
};
