function getLength2(array: any): number {
	return array.length;
}

function getLength(array: any[]): number {
	return array.length;
}

function hasTwelveLetterKey(o: object) {
	for (const key in o) {
		if (key.length === 12) {
			return true;
		}
	}
	return false;
}

const numArgsGood = (...args: any[]) => args.length;
