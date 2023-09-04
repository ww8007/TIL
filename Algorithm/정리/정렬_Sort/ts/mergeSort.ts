const mergeTS = (left: number[], right: number[]) => {
	// 정렬된 왼쪽과 오른쪽 배열을 받아서 하나로 합치는 순수한 함수
	const result = [];
	while (left.length !== 0 && right.length !== 0) {
		left[0] <= right[0]
			? result.push(left.shift())
			: result.push(right.shift());
	}

	return [...result, ...left, ...right];
	// left,right 둘 중 하나는 요소가 남아있기 때문에 result 뒤에 붙여서 출력
};

const mergeSortTS = (array: number[]): number[] => {
	// ending condition: length === 1 인 배열이 들어올 때, 정렬이 끝난 것.
	if (array.length === 1) return array; //그 배열 그대로 리턴...! 정렬할 필요가 없으므로

	// 2로 나누고 '내림을' 해야
	// length 가 2일 때도 안전하게 배열을 slice 할 수 있다.
	const middleIndex = Math.floor(array.length / 2);
	const left = array.slice(0, middleIndex);
	const right = array.slice(middleIndex);

	// 재귀로 계속해서 반으로 나누면서 length 가 1이 될때까지 쪼개고,
	// 거꾸로 올라오면서 순수한 함수인 merge에 인자로 넣어서 다시 병합되어서 최종값을 리턴한다.
	return mergeTS(mergeSortTS(left), mergeSortTS(right));
};

const mergeExample = [10, 1, 3, 4, 2, 5, 6];
console.log(mergeSortTS(mergeExample));
