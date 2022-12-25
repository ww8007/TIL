import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject(0); // 초기값이 있음

subject.subscribe((x) => console.log("A: " + x));

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe((x) => console.log("B: " + x));
const lastValue = subject.getValue();

subject.next(4);
subject.next(5);

console.log(lastValue);
