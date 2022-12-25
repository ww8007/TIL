import { filter, interval, map, tap } from "rxjs";

const observable$ = interval(1000);

// ... observer 정의

observable$
	.pipe(
		filter((x) => x % 2 === 0),
		tap(console.log),
		map((x) => x * x)
	)
	.subscribe(console.log);
