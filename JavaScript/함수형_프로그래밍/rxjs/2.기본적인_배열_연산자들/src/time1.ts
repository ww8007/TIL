import { delay, fromEvent, interval, pluck, take, tap, timestamp } from "rxjs";

const t1 = interval(1000)
	.pipe(
		take(5),
		tap((x) => console.log(x + " 발행시작")),
		delay(5000)
	)
	.subscribe((x) => console.log(x + " 발행완료"));

// fromEvent(document, "click")
// 	.pipe(pluck("x"), timestamp())
// 	.subscribe(console.log);

export { t1 };
