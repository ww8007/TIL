function createPerformanceCalculator(aPerformance, aPlay) {
	switch (aPlay.type) {
		case 'tragedy':
			return new TragedyCalculator(aPerformance, aPlay);
		case 'comedy':
			return new ComedyCalculator(aPerformance, aPlay);
		default:
			throw new Error('알 수 없는 장르');
	}
}

class TragedyCalculator extends PerformanceCalculator {
	get amount() {
		result = 40000;
		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30);
		}
	}
}
class ComedyCalculator extends PerformanceCalculator {
	get amount() {
		result = 30000;
		if (this.performance.audience > 20) {
			result += 10000 + 500 * (this.performance.audience - 20);
		}
		result += 300 * this.performance.audience;
		return result;
	}
	get volumeCredits() {
		return super.volumeCredits + Math.floor(this.performance.audience / 5);
	}
}

class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance;
		this.play = aPlay;
	}
	get amount() {
		throw new Error('서브 클래스 처리');
	}
	get volumeCredits() {
		return Math.max(this.performance.audience - 30, 0);
	}
}

function statement(invoice) {
	const statementData = {};
	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances.map(enrichPerformance);
	return renderPlainText(statementData, plays);
}

function renderPlainText(data, plays) {
	let result = `청구 내역 (고객명 : ${data.customer})\n`;

	for (let perf of data.performance) {
		// 청구 내역 출력
		result += ` ${pref.play.name}: ${usd(amountFor(perf) / 100)} (${
			pref.audience
		}석)\n`;
	}
	result += `총액: ${usd(totalAmount / 100)}\n`;
	result += `적립 포인트: ${volumeCredits}점\n`;
	return result;
}

function enrichPerformance(aPerformance) {
	const calculator = createPerformanceCalculator(
		aPerformance,
		playFor(aPerformance)
	);
	const result = Object.assign({}, aPerformance); // 얕은 복사 수행
	result.play = calculator.play; // 중간 데이터에 연극 정보를 저장
	result.amount = calculator.amount;
	return result;
}

function totalAmount() {
	let result = 0;
	for (let perf of data.performances) {
		result += amountFor(perf);
	}
	return result;
}

function totalVolumeCredits() {
	let result = 0;
	for (let perf of data.performances) {
		result += volumeCreditsFor(pref);
	}
	return result;
}

function amountFor(aPerformance) {
	return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}

function playFor(aPerformance) {
	return plays[aPerformance.playID];
}

function volumeCreditsFor(perf) {
	let volumeCredits = 0;
	// 포인트 적립
	volumeCredits += Math.max(pref.audience - 30, 0);
	// 희극 관객 5명 마다 추가 포인트 지급
	if ('comedy' === playFor(perf).type)
		volumeCredits += Math.floor(pref.audience / 5);
	return volumeCredits;
}

function usd(aNumber) {
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(aNumber);
}

function totalVolumeCredits() {
	let volumeCredits = 0;
	for (let perf of invoice.performances) {
		volumeCredits += volumeCreditsFor(perf);
	}
	return volumeCredits;
}
