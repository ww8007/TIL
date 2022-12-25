import { fromEvent, interval, of } from "rxjs";

const obs1$ = of("a", "b", "c");
const obs2$ = interval(1000);

setTimeout(() => {
	console.log("of 구독 시작");
	obs1$.subscribe((item) => console.log(item));
}, 5000);
setTimeout(() => {
	console.log("interval 구독 시작");
	obs2$.subscribe((item) => console.log(item));
}, 10000);

setTimeout(() => {
	console.log("interval 구독 시작 2");
	obs2$.subscribe((item) => console.log(item));
}, 20000);
