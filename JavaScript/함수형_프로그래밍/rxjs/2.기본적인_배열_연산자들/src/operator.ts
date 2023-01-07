import {
	count,
	distinct,
	elementAt,
	filter,
	first,
	from,
	last,
	max,
	min,
	of,
	reduce,
	tap
} from "rxjs";

const obs$ = of(4, 2, 6, 10, 8);

const obs$2 = from([
	9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2
]);

obs$.pipe(count()).subscribe((x) => console.log("count :", x));
obs$.pipe(max()).subscribe((x) => console.log("max :", x));
obs$.pipe(min()).subscribe((x) => console.log("min :", x));

obs$.pipe(reduce((acc, cur) => acc + cur, 0)).subscribe((x) => console.log(x));

obs$2.pipe(first()).subscribe((x) => console.log("first: " + x));
obs$2.pipe(last()).subscribe((x) => console.log("last: " + x));
obs$2.pipe(elementAt(5)).subscribe((x) => console.log("elementAt: " + x));
obs$2.pipe(distinct(), count()).subscribe((x) => console.log("distinct: " + x));
obs$2
	.pipe(filter((x) => x % 2 === 1))
	.subscribe((x) => console.log("filter: " + x));

obs$2
	.pipe(
		distinct(),
		filter((x) => x % 2 === 1),
		reduce((a, b) => a + b, 0)
	)
	.subscribe((x) => console.log("filter: " + x));

from([9, 3, 10, 5, 1, 10, 9, 9, 1, 4, 1, 8, 6, 2, 7, 2, 5, 5, 10, 2])
	.pipe(
		tap((x) => console.log("-------------- 처음 탭: " + x)),
		filter((x) => x % 2 === 0),
		tap((x) => console.log("--------- 필터 후: " + x)),
		distinct(),
		tap((x) => console.log("중복 제거 후: " + x))
	)
	.subscribe((x) => console.log("발행물: " + x));

export { obs$, obs$2 };
