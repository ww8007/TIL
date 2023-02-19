declare function cacheLast<T extends Function>(f: T): T;

declare function shallowEqual(a: any, b: any): boolean;

function cacheLast<T extends Function>(f: T): T {
	let lastArgs: any[] | null = null;
	let lastResult: any;
	return function (...args: any[]) {
		if (!lastArgs || !shallowEqual(lastArgs, args)) {
			lastResult = f(...args);
			lastArgs = args;
		}
		return lastResult;
	} as unknown as T;
}

declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
	for (const [k, aVal] of Object.entries(a)) {
		if (!(k in b) || aVal !== (b as any)[k]) {
			return false;
		}
	}
	return Object.keys(a).length === Object.keys(b).length;
}
