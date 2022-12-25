import { AsyncSubject } from "rxjs";

const subject = new AsyncSubject();

subject.subscribe((x) => console.log("A: " + x));

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe((x) => console.log("B: " + x));

subject.next(4);
subject.next(5);

subject.subscribe((x) => console.log("C: " + x));

subject.next(6);
subject.next(7);
subject.complete();
