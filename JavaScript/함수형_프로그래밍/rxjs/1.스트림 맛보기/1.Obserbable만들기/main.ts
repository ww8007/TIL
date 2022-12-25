import { of, from, range, generate } from "rxjs";

const obs1$ = of(1, 2, 3, 4, 5);
const obs2$ = from([6, 7, 8, 9, 10]);
const obs3$ = range(11, 5);
const obs4$ = generate(
	15,
	(x) => x < 30,
	(x) => x + 2
);

obs1$.subscribe((item) => console.log(`of: ${item}`));
obs2$.subscribe((item) => console.log(`from: ${item}`));
obs3$.subscribe((item) => console.log(`range: ${item}`));
obs4$.subscribe((item) => console.log(`generate: ${item}`));
