import { interval, Subject } from "rxjs";

const obs$ = interval(1000);

obs$.subscribe((x) => console.log("바로구독: " + x));
setTimeout(() => {
	obs$.subscribe((x) => console.log("3초 후 구독: " + x));
}, 3000);
setTimeout(() => {
	obs$.subscribe((x) => console.log("5초 후 구독: " + x));
}, 5000);
setTimeout(() => {
	obs$.subscribe((x) => console.log("10초 후 구독: " + x));
}, 10000);

const subject = new Subject();
const obs2$ = interval(1000);

obs2$.subscribe(subject);

subject.subscribe((x) => console.log("바로구독: " + x));
setTimeout(() => {
	subject.subscribe((x) => console.log("3초 후 구독: " + x));
}, 3000);
setTimeout(() => {
	subject.subscribe((x) => console.log("5초 후 구독: " + x));
}, 5000);
setTimeout(() => {
	subject.subscribe((x) => console.log("10초 후 구독: " + x));
}, 10000);
