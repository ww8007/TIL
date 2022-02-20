/////////////////////////////////////////
// async await
const log = console.log;

function delay(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a), 500));
}

async function f1() {
	const a = await delay(10);
	const b = await delay(5);
	return a + b;
}

f1();

const pa = Promise.resolve(10);

// (async () => {
// 	log(await pa);
// })();

///////////////////////////////////////////
// Array.prototype.map이 있는데 왜 FxJS map 함수가 필요?

async function delayI(a) {
	return new Promise((resolve) => setTimeout(() => resolve(a)), 100);
}

async function f2() {
	const list = [1, 2, 3, 4];
	const temp = map((a) => delayI(a * a), list);
	log(temp);
	const res = await temp;
	log(res);
}
async function f3() {
	const list = [1, 2, 3, 4];
	const temp = map((a) => delayI(a * a), list);
	log(temp);
	const res = await temp;
	log(res);
}
f2();

/////////////////////////////////////////////
// 파이프라인

function f52(list) {
	const r1 = await go(
		list,
		L.map((a) => delayI(a * a)),
		L.filter((a) => delayI(a % 2)),
		L.map((a) => delayI(a + 1)),
		C.take(2),
		reduce((a, b) => delayI(a + b))
	);
	const r2 = await go(
		list,
		L.map((a) => delayI(a * a)),
		L.filter((a) => delayI(a % 2)),
		reduce((a, b) => delayI(a + b))
	);
	return r1 + r2;
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8], (a) => log(a, 'f52')));

//////////////////////////////////////////////
// 동기 상황의 에러 핸들링
function f7(list) {
	try {
		return list
			.map(
				(a) =>
					new Promise((resolve) => {
						aslkdfjlkad;
					})
			)
			.filter((a) => a % 2)
			.slice(0, 2);
	} catch (e) {
		log(e);
		return [];
	}
}
log(f7(null));

async function f9(list) {
	try {
		return await go(
			list,
			map(
				(a) =>
					new Promise((resolve) => {
						resolve(JSON.parse(a));
					})
			),
			filter((a) => a % 2),
			take(2)
		);
	} catch (e) {
		log(e);
		return [];
	}
}
