# 1. 리펙터링

## 1.1

- 비디오 대여점에서 영수증 출력
- ┣ 다양한 연극을 외주로 받아서 공연
- ┣ 두 가지 장르 : 비극, 희극
- ┗ 공연료 별개로 포인트 : 공연료 할인

## 1.2

- 예시 코드를 보고 느낀점
- ┣ 사람은 코드의 미적 상태에 민감함
- ┣ 프로그램이 새로운 기능을 추가하기에
- ┣ 편한 구조가 아니라면 : 먼저 기능을 추가하기
- ┗ 쉬운 형태로 리팩터링 하고 나서 원하는 기능을 추가함

- 예시 코드의 문제점
- ┣ 1. 청구 내역 HTML로 출력 기능 없음
- ┣ 이를 위해서 청구 결과에 문자열을 추가하는
- ┣ 문장 각각을 조건문으로 감싸야 하고
- ┣ 이는 statement 함수의 복잡도 증가 별로임
- ┣ 2. 변경 사항도 관리
- ┣ 새로운 공연 장르나 할인법에 대한 고민을
- ┗ 이 코드에 다시 적용이 어려움

## 1.3 리팩터링의 첫 단계

- 언제나 첫 단계는 같음
- ┗ `테스트 코드부터 마련해야 함`

## 1.4 statement() 함수 쪼개기

- statement() 처럼 긴 함수를 리팩터링 할 때
- ┣ 전체 동작을 각각의 부분으로 나눌 수 있는
- ┣ 지점을 찾는 것이 중요
- ┣ 위 예제에서는 switch 문

```js
switch (play.type) {
	case 'tragedy':
		thisAmount = 40000;
		if (pref.audience > 30) {
			thisAmount += 1000 * (pref.audience - 30);
		}
		break;
	case 'comedy':
		thisAmount = 30000;
		if (pref.audience > 20) {
			thisAmount += 10000 + 500 * (pref.audience - 20);
		}
		thisAmount += 300 * pref.audience;
		break;
	default:
		throw new Error(`알 수 없는 장르: ${play.type}`);
}
```

- 지금 보면 한 번의 공연에 대한 요금 계산중
- ┣ 코드를 분석해서 얻은 정보임
- ┣ 이런 식으로 파악한 정보 :
- ┣ 내 머리속에 저장 → 고로 코드에 빨리 반영

- ┣ 코드 조각을 별도 함수로 추출하는 방식으로 앞서
- ┣ 파악한 정보를 코드에 반영
- ┣ `amountFor(aPerformance)` 함수

- ┣ 별도 함수로 빼냈을 때 :
- ┣ `유효범위를 벗어나는 변수` 있는지 확인
- ┣ 새 함수에서 `즉시 사용 불가`
- ┣ `perf, play, thisAmount`

- ┣ `pref, play`는 추출한 새 함수에서도 필요하지만
- ┣ 값을 변경하지는 않으므로
- ┣ 매개변수로 넘겨줌
- ┣ `thisAmount`의 경우 값이 변경 되므로
- ┗ 이의 경우 `값을 반환 하도록 설정`

- 지금 코드는 JS 이므로
- ┣ amountFor()를 statement() 중첩 함수로
- ┣ 만들 수 있음
- ┗ 이의 경우 매개변수로 전달할 필요가 없어서 편리함

### 함수 추출 후

- 표현을 더 명확하게 바꿀 수 없나
- ┣ 검토를 해봄
- ┣ 1. 변수 이름을 더 명확하게
- ┣ 하는 일이 명확하게 드러나야 함
- ┗ `결과 → result`

### play 변수 제거하기

- `amountFor()`의 `매개변수`를 살펴 보면서
- ┣ 이 값들이 어디서 오는지 알아봤음

- ┣ `재계산`이 가능한 변수는
- ┣ 매개변수로 넘기는 것이 아닌
- ┣ 함수 안에서 `재계산`을 하도록 함
- ┣ 임시 변수들 때문에 로컬 범위에 존재하는 이름이 늘어서
- ┣ 추출 작업이 복잡해짐

```js
// 다음과 같이 지역 변수를 줄이도록 함수 작성
function playFor(aPerformance) {
	return plays[aPerformance.playID];
}
```

- `지역 변수 제거`의 `장점`
- ┣ `추출 작업`이 훨씬 `쉬워짐`
- ┗ 유효범위를 신경 써야 할 대상이 줄어듬

### 반복문 처리

- 함수를 만들어서 계산 결과를
- ┗ 반환 하도록 설정하면 됨

```js
function volumeCreditsFor(perf) {
	let volumeCredits = 0;
	// 포인트 적립
	volumeCredits += Math.max(pref.audience - 30, 0);
	// 희극 관객 5명 마다 추가 포인트 지급
	if ('comedy' === playFor(perf).type)
		volumeCredits += Math.floor(pref.audience / 5);
	return volumeCredits;
}
```

### formant 변수 제거하기

- `임시 변수` : 나중에 문제를 일으킬 수 있음
- ┣ 임시 변수는 자신이 속한 루틴에서만
- ┣ `의미가 있어서 루틴이 길고 복잡해지지기 쉬움`
- ┗ 이런 `변수들을 제거하는 것이 리팩터링`

> 변수에 함수 담기

    이러한 패턴은 그냥
    ┣ 함수를 만들어서 이를 이용하도록
    ┗ 설정하는 편이 좋음

```js
function format(aNumber) {
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(aNumber);
}
```

### 반복문 쪼개기 - volumeCredits

- 반복문을 한 바퀴 돌 때마다
- ┣ 값을 누적하기 때문에
- ┗ `리팩터링하기에 더 까다로움`

> 의문

- 반복문을 쪼개서 성능이 느려지지 않을까
- ┣ 리팩터링 전과 후의 실행 시간을
- ┣ 이 정도 중복은 성능에 미치는 영향이 적음
- ┣ 1. 먼저 보기 좋게 리팩터링 하고
- ┣ 2. 성능 개선은 나중에 하는 것도 좋음

1. 반복문 쪼개기

- ┗ 변수 값을 누적시키는 부분을 분리한다

2. 문장 슬라이드하기

- ┣ 변수 초기화 문장을 변수 값 누적 코드
- ┗ 바로 앞으로 옮김

3. 함수 추출하기

- ┗ 적립 포인트 계산 부분을 별도 함수로 추출

4. 변수 인라인하기

## 1.6 계산 단계와 포맷팅 단계 분리하기

- 지금 까지의 프로그램
- ┣ `논리적인 요소를 파악하기 쉽도록`
- ┣ 코드의 구조를 보강하는 데 `주안점`
- ┗ 이제 HTML 버전을 만드는 작업을 해봄

- ┣ 단계 쪼개기를 여기서 사용
- ┣ 첫 단계 : statement()에 필요한 데이터를 처리
- ┣ 다음 단계 : 텍스트나 HTML로 표현하도록 설정
- ┗ `두 번째 전달한 중간 데이터 구조를 생성`

> 객체 복사하기

```js
const result = Object.assign({}, aPerformance); // 얕은 복사 수행
```

### 반복문을 파이프라인으로 바꾸기

- reduce를 사용해서 다음과 같이 for문을 제거가 가능함

```js
function totalAmount(data) {
	return data.performances.reduce((total, p) => total + p.amount, 0);
}
function totalVolumeCredits(data) {
	return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}
```

## 1.7 중간 점검

- 처음보다 코드량이 늘었음
- ┣ 하지만 1. 전체 로직을 구성하는 `요소 각각이 뚜렷이 부각`
- ┗ 2. `계산하는 부분과 출력 형식을 다루는 부분이 분리`

## 1.8 다형성을 활용해 계산 코드 재구성하기

- 연극 장르를 추가하고 장르마다
- ┣ 공연료와 적립 포인트 계산법을 다르게 지정
- ┣ 기능을 수정
- ┣ 현재 상태에서 코드를 변경 하려면
- ┗ `함수에서 조건문을 수정`

- 조건부 로직을 명확한 구조로 보완하는 법은
- ┣ 다양하지만 여기서는 객체지향의 핵심 특성인
- ┣ `다형성(polymorphism)`을 활용하는 것이 자연스러움

- 이번 작업의 목표는 상속 계층을 구성해서
- ┣ 희극 서브클래스와 비극 서브클래스가
- ┣ 각각의 구체적인 계산 로직을 정의하는 것

- ┣ `조건부 로직을 다형성으로 바꾸기`
- ┣ 이 리팩터링은 조건부 코드 한 덩어리를
- ┣ 다형성을 활용하는 방식으로 바꿔줌
- ┣ 이 리팩터링을 정의하기 위해서는
- ┗ `상속 계층부터 정의`해야 함

### 공연료 계산기 만들기

- 핵심 : 각 공연의 중간 데이터 구조에 채워주는
- ┣ enrichPerformance 함수
- ┣ 이 함수 : 조건부 로직을 포함한 함수인
- ┣ amountFor(), volumeCreditsFor()를 호출하여
- ┣ 공연료와 적립 포인트를 계산함
- ┣ 이번에 할 일은 두 함수를 전용 클래스로 옮기는 작업

```js
// 클래스 생성
class PerformanceCalculator {
	constructor(aPerformance) {
		this.performance = aPerformance;
	}
}

function enrichPerformance(aPerformance) {
	const calculator = new PerformanceCalculator(aPerformance);
	const result = Object.assign({}, aPerformance); // 얕은 복사 수행
	result.play = playFor(result); // 중간 데이터에 연극 정보를 저장
	result.amount = amountFor(result);
	return result;
}
```

### 함수들을 계산기로 옮기기

- 지금까지는 중첩 함수를 재배치하는 것이어서
- ┣ 함수를 옮기는 데 부담이 없었음
- ┣ 이번에는 `함수를 다른 컨텍스트로 옮기는 큰 작업`
- ┣ 1. `공연료 계산 코드를 계산기 클래스 안으로 복사`

> 함수를 클래스 메서드로 변경함

### 공연료 계산기를 다형성 버전으로 만들기

- 가장 먼저 할 일
- ┣ `타입 코드` 대신 `서브클래스를 사용하도록 변경`
- ┣ `PerformanceCalculator`의 서브클래스를 준비하고
- ┣ `createStatementData()` 에서 그 중 적합한 서브 클래스 사용
- ┣ 딱 맞는 서브클래스를 사용 하려면 생성자 대신
- ┣ 함수를 호출하도록 바꿔야 함
- ┗ `JS 에서는 생성자가 서브클래스의 인스턴스를 반환 불가`

> 생성자를 팩터리 함수로 바꾸기

```js
function createPerformanceCalculator(aPerformance, aPlay) {
	return new PerformanceCalculator(aPerformance, aPlay);
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
```

- 함수를 이용하면
- ┣ `서브클래스 중에서 어느 것을 생성`해서
- ┣ `반환`할지 선택이 가능함

```js
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
```

- 이제 다형성을 지원하기 위한 구조는 갖춰짐
- ┣ 다음은 조건부 로직을 다형성으로 바꾸기 적용

> get amount를 서브 클래스에서 처리

```js
class ComedyCalculator extends PerformanceCalculator {
	get amount() {
		result = 30000;
		if (this.performance.audience > 20) {
			result += 10000 + 500 * (this.performance.audience - 20);
		}
		result += 300 * this.performance.audience;
		return result;
	}
}
```

- 다음으로 교체할 조건부 로직 :
- ┣ 적립 포인트를 계산하는 부분
- ┣ `일반적인 경우`를 기본으로 삼아
- ┣ `슈퍼 클래스에 남겨두고`
- ┣ 장르마다 달라지는 부분은 필요할 때
- ┣ `오버라이드`하게 만드는 것이 좋음
- ┣ 포인트 계산 방식이 조금 다른 희극 처리 로직을
- ┣ `해당 서브클래스로 내림`

```js
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

class ComedyCalculator extends PerformanceCalculator {
	get volumeCredits() {
		return super.volumeCredits + Math.floor(this.performance.audience / 5);
	}
}
```

## 다형성을 활용하여 데이터 생성하기

- 앞에서 함수를 추출했을 때 처럼
- ┣ 코드의 양은 늘어났지만 `장르별 코드`를
- ┣ `계산 코드들과 함께 묶어뒀다는 것임`
- ┣ 앞으로의 수정 대부분이 이 코드에서 일어나면
- ┣ 이렇게 `명확하게 분리해두면 좋음`

- 이제 새로운 장르를 추가하려면
- ┣ 해당 장르의 서브 클래스를 작성하고
- ┣ 생성 함수인 `createPerformanceCalculator()`에 추가

- 이번 예를 보면 서브클래스를 언제 사용하면
- ┣ 좋을지에 대한 감이 잡힐 것임
- ┣ 같은 타입의 다형성을 기반으로
- ┣ 실행되는 함수가 많을수록 이렇게 구성하는
- ┣ 것이 유리함

- 계산기 중간 데이터 코드를 채우게 한
- ┣ 지금의 코드와 달리
- ┣ `createStateData`가 계산기 자체를 반환하게 구현 가능
- ┣ 여기서 JS 장점이 발휘
- ┣ `getter` 메서드를 호출하는 코드와
- ┣ 일반적인 데이터 접근 코드의 모양이 같음
