import { currentInstance, render } from "./render";

type SetState<T> = (newState: T | ((prevState: T) => T)) => void;
type ReturnType<T> = [T, SetState<T>];

// 상태 관리 인터페이스 정의
interface StateFactory {
	<T>(initialValue: T): ReturnType<T>;
}

// 팩토리 함수
export function createStateFactory(): StateFactory {
	let state: unknown = undefined;

	return <T>(initialValue: T): ReturnType<T> => {
		if (state === undefined) {
			state = initialValue;
		}

		const setState: SetState<T> = (newState: T | ((prevState: T) => T)) => {
			state =
				typeof newState === "function"
					? (newState as (prevState: T) => T)(state as T)
					: newState;

			if (currentInstance === null) {
				throw new Error(
					"useState는 컴포넌트 함수 내에서만 호출할 수 있습니다."
				);
			}
			const nextVNode = currentInstance.component(currentInstance.props);
			render(nextVNode, document.getElementById("root")!);
		};

		return [state as T, setState];
	};
}

// 팩토리를 통한 인스턴스 생성
export const useState2 = createStateFactory();
export const useState3 = createStateFactory();
