// before
function printOwing(invoice) {
	printBanner();
	let outstanding = calculateOutstanding();

	// 세부 사항 출력
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
}

// after
function printOwing(invoice) {
	printBanner();
	let outstanding = calculateOutstanding();
	printDetails(outstanding);

	function printDetails(outstanding) {
		console.log(`고객명: ${invoice.customer}`);
		console.log(`채무액: ${outstanding}`);
	}
}

////////////////////////////////////////////
// 유효범위를 벗어나는 변수가 없을 때
function printOwing(invoice) {
	let outstanding = 0;

	console.log('******');
	console.log('******');
	console.log('******');

	// 미해결 채무(outstanding)
	for (const o of invoice.orders) {
		outstanding += o.amount;
	}

	// 마감일 기록
	const today = Clock.today;
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 30
	);

	// 세부 사항 출력
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
}

////////////////////////////////////////////
// 함수 인라인 하기 6.2
function getRating(driver) {
	return more;
}

/////////////////////////////////
// 여러 함수
const aReading = acquireReading();
const baseChange = baseRate(aReading.moth, aReading.year) * aReading.quantity;
