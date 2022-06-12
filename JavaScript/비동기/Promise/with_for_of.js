'use strict';

const promise = new Promise((res, rej) => {
	setTimeout(() => res('즉시 호출 1'), 3000);
	rej('hi');
});
const promise2 = new Promise((res, rej) =>
	setTimeout(() => res('즉시 호출 2'), 2000)
);
const promise3 = new Promise((res, rej) =>
	setTimeout(() => res('즉시 호출 3'), 1000)
);
const promise4 = new Promise((res, rej) =>
	setTimeout(() => res('즉시 호출 4'), 4000)
);

const arr = [promise, promise2, promise3, promise4];

for (const item of arr) {
	item.then((res) => console.log(res)).catch((e) => console.log(e));
	item.catch((e) => console.log(e));
}
