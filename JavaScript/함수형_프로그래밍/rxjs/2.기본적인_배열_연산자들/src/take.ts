import {
	fromEvent,
	interval,
	range,
	skip,
	skipWhile,
	take,
	takeUntil
} from "rxjs";

const r = range(1, 20).pipe(take(5)).subscribe(console.log);

interval(1000)
	.pipe(take(5))
	.subscribe({ next: console.log, error: console.error });

const obs1$ = interval(1000);
// const obs2$ = fromEvent(document, "click");

// obs1$.pipe(takeUntil(obs2$)).subscribe(
// 	console.log,
// 	(err) => console.error(err),
// 	() => console.log("COMPLETE")
// );

range(1, 20).pipe(skip(5)).subscribe(console.log);

range(1, 20)
	.pipe(skipWhile((x) => x <= 10))
	.subscribe(console.log);

export { r };
