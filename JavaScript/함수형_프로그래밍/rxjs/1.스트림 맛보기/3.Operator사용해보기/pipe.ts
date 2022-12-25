import { Observable, range } from "rxjs";
import { filter, map } from "rxjs/operators";
import type { Observable as IObservable } from "rxjs";

const observable$ = range(1, 10);

observable$
	.pipe(
		//
		filter((x) => x % 2 === 0),
		map((n) => n ** 2)
	)
	.subscribe({
		next: (n) => console.log(n + " 발행"),
		error: (e) => console.error(e),
		complete: () => console.log("발행물 완결")
	});
