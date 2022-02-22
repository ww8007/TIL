import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';
// _.go(_.range(10), _.take(3), console.log);

// _.go(
// 	L.range(10), // 0부터 9까지의 배열
// 	L.map(_.delay(1000)),
// 	L.filter((a) => a % 2),
// 	L.map((_) => new Date()),
// 	L.take(3), // 앞에서 세개만 자르기
// 	_.each(console.log)
// );

// //////////////////////////////
// // takeUntil takeWhile
// _.go(
// 	[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0],
// 	_.takeUntil((a) => !a),
// 	_.each(console.log)
// );

const track = [
	{ cars: ['철수', '영희', '철희', '영수'] },
	{ cars: ['하든', '커리', '듀란트', '탐슨'] },
	{ cars: ['폴', '어빙', '릴라드', '맥컬럼'] },
	{ cars: ['스파이더맨', '아이언맨'] },
	{ cars: [] }
];

// _.go(
// 	L.range(Infinity),
// 	L.map((i) => track[i]),
// 	L.map(({ cars }) => cars),
// 	L.map(_.delay(1000)),
// 	L.takeWhile(({ length: l }) => l == 4),
// 	L.flat,
// 	L.map((car) => `${car} 출발`),
// 	_.each(console.log)
// );

// 4. 아임포트 결제 누락 스케쥴러 만들기

const Impt = {
	payments: {
		1: [
			{ imp_id: 11, order_id: 1, amount: 15000 },
			{ imp_id: 12, order_id: 2, amount: 25000 },
			{ imp_id: 13, order_id: 3, amount: 10000 }
		],
		2: [
			{ imp_id: 14, order_id: 4, amount: 25000 },
			{ imp_id: 15, order_id: 5, amount: 45000 },
			{ imp_id: 16, order_id: 6, amount: 15000 }
		],
		3: [
			{ imp_id: 17, order_id: 1, amount: 20000 },
			{ imp_id: 18, order_id: 2, amount: 30000 }
		],
		4: [],
		5: []
	},
	getPayments: (page) => {
		console.log(`http://...?page=${page}`);
		return _.delay(1000 * 3, Impt.payments[page]);
	},
	cancelPayment: (imp_id) => Promise.resolve(`${imp_id}: 취소완료`)
};

const DB = {
	getOrders: (ids) => _.delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }])
};

async function job() {
	// 결제된 결제모듈측 payments 가져옴
	// page 단위로 가져오는데, 내용이 있을 때 까지
	// 가져와서 하나로 합침
	const payments = _.go(
		L.range(1, Infinity), // 언제까지 할지 모름
		L.map(Impt.getPayments),
		L.takeUntil(({ length }) => length < 3),
		_.flat
	);
	// 결제가 실제로 완료된 가맹점 측 주문서
	// id들을 뽑아옴
	const orderIds = await _.go(
		payments,
		_.map((p) => p.order_id),
		DB.getOrders,
		_.map(({ id }) => id)
	);
	// 결제모듈의 payments와 가맹점의 주문서를 비교해서
	// 결제를 취소해야할 id들을 뽑아서
	// 결제 취소 api를 실행
	await _.go(
		payments,
		L.reject((p) => orderIds.includes(p.order_id)),
		L.map((p) => p.imp_id),
		L.map(Impt.cancelPayment),
		_.each(console.log)
	);
}

// 5초에 한번만 한다.
// 그런데 만일 job 자체가 5초보다 더 걸리면
// job이 끝날 때까지 다 기다리고
// 아니면 5초에 한번씩 실행
(function recur() {
	Promise.all([_.delay(7000, undefined), job()]).then(recur);
})();
