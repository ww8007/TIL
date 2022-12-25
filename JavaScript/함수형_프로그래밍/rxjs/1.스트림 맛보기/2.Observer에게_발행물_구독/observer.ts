import { from, Observable, of } from "rxjs";

const Observable$ = from([1, 2, 3, 4, 5]);

const observer = {
	next: console.log,
	error: (err: string) => console.log("발행 에러", err),
	complete: () => console.log("완료")
};

Observable$.subscribe(observer);

const obs$ = new Observable((sub) => {
	sub.next(1);
	sub.next(2);
	sub.complete();
	sub.next(3);
	sub.next(4);
});

obs$.subscribe({
	next: (v) => console.log(v),
	error: (e) => console.error(e),
	complete: () => console.info("complete")
});
