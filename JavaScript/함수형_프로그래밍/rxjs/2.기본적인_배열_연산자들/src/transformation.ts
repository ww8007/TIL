import {
	catchError,
	filter,
	from,
	map,
	of,
	pluck,
	range,
	scan,
	toArray,
	zip
} from "rxjs";
import { ajax } from "rxjs/ajax";

const mapRX = of(1, 2, 3, 4, 5)
	.pipe(map((x) => x * x))
	.subscribe(console.log);

const obs$ = from([
	{ name: "apple", price: 1200, info: { category: "fruit" } },
	{ name: "carrot", price: 800, info: { category: "vegetable" } },
	{ name: "pork", price: 5000, info: { category: "meet" } },
	{ name: "milk", price: 2400, info: { category: "drink" } }
]);

obs$.pipe(map((x) => x.info.category)).subscribe(console.log);

// const obs$2 = ajax(`https://api.github.com/search/users?q=user:mojombo`).pipe(
// 	map((x) => console.log("x", x)),
// 	catchError((err) => of(err))
// );

// obs$2.subscribe({
// 	next: (x) => console.log("x", x),
// 	error: (err) => console.log("err", err)
// });

// obs$2.subscribe(console.log);

range(1, 50)
	.pipe(
		filter((x) => x % 3 === 0),
		filter((x) => x % 2 === 1),
		toArray()
	)
	.subscribe(console.log);

const obs2$ = of(1, 2, 3, 4, 5);

obs2$
	.pipe(
		scan((acc, x) => {
			return acc + x;
		}, 0)
	)
	.subscribe((x) => console.log("scan: " + x));

const obs1$ = from([1, 2, 3, 4, 5]);
const obs3$ = from(["a", "b", "c", "d", "e"]);
const obs4$ = from([true, false, "F", [6, 7, 8], { name: "zip" }]);

zip(obs1$, obs3$, obs4$).subscribe(console.log);

export { mapRX };
