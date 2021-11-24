# 41. 타이머

## 41.1 호출 스케줄링

- 함수를 명시적으로 호출하면 함수가 즉시 실행됨
- ┣ 만약 함수를 명시적으로 호출하지 않고
- ┣ 일정 시간이 경과한 이후에 호출되도록
- ┣ 함수 호출을 예약 하려면 :
- ┣ 타이머를 사용함
- ┗ 이를 `호출 스케줄링(scheduling a call)`

- JS는 타이머를 생성할 수 있는 타이머 함수
- ┣ 1. `setTimeout : clearTimeout`
- ┣ 2. `setInterval : clearInterval `
- ┣ 을 제공함
- ┣ 타이머 함수 : ECMAScript 사양에 정의된
- ┣ 빌트인 함수가 아님
- ┣ 브라우저, Node.js 환경에서 모두 전역 객체
- ┣ 메서드로서 타이머 함수를 제공함
- ┗ 즉 : `타이머 함수 → 호스트 객체`

- 둘 다 모두 일정 시간이 경과한 이후
- ┣ 콜백 함수가 호출되도록 타이머를 생성함
- ┣ `타이머 함수가 생성한 타이머가 만료되면`
- ┗ `콜백 함수가 호출됨`

- setTimeout : 단 한 번 동작
- ┣ setInterval : 반복 동작
- ┣ `setTimeout : 콜백 함수가 타이머 만료되면`
- ┣ `단 한 번 호출`되고
- ┣ `setInterval : 타이머 만료까지`
- ┗ `반복 호출됨`

- `JS 엔진` : `단 하나의 실행 컨텍스트를 가짐`
- ┣ 두 가지 이상의 태스크 동시 실행 불가
- ┣ 즉 : `JS 엔진 : 싱글 스레드로 동작`
- ┣ 그렇기에 타이머는 비동기(asynchronous)
- ┗ 처리 방식으로 동작함

## 41.2 타이머 함수

### 41.2.1 setTimeout / clearTimeout

- setTimeout 함수 : 두 번째 인수로 전달받은
- ┣ 시간(ms, 1/1000초)으로 단 한 번 동작하는
- ┣ 타이머를 생성함
- ┣ 이후 타이머가 만료되면 `첫 번째 인수로`
- ┣ `전달받은 콜백 함수가 호출됨`
- ┣ 즉 : setTimeout 함수의 콜백 함수
- ┣ `두 번째 인수로 전달받은 시간 이후`
- ┗ `단 한 번 실행되도록 호출 스케줄링 됨`

| 매개변수 | 설명                                                                                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| func     | 타이머가 만료된 두 호출될 콜백 함수 <br/> 콜백 함수 대신 코드를 문자열로 전달이 가능함 <br/> 이때 코드 문자열은 타이머가 만료된 뒤 해석되고 실행됨 <br/> 권장 X eval과 비슷 |

| delay | 타이머 만료 시간(밀리초(ms)단위). setTimeout 함수는 delay 시간으로 단 한 번 동작하는 <br/> 타이머를 생성함. 인수를 전달 생략한 경우 기본값 0 지정 <br/> delay 시간이 설정된 타이머가 만료되면 콜백 함수가 즉시 실행되는 것을 보장하지 않음 <br/> delay 시간 : 태스크 큐에 콜백 함수를 등록하는 시간을 지연하는 것 일 뿐임 |
| param1<br/>param2| 호출 스케줄링된 콜백 함수에 전달해야 할 인수가 존재하는 경우 세 번째 이후의 인수로 전달 가능 |

```js
// 1초 후 타이머가 만료되면 함수가 호출됨
setTimeout(() => console.log('Hi!'), 1000);

// 콜백 함수에 인수 전달
setTimeout((name) => console.log(`Hi! ${name},`), 1000, 'Lee');
```

- setTimeout 함수 : 생성된 타이머를 식별이 가능함
- ┣ `고유한 타이머 id를 반환함`
- ┣ setTimeout 함수가 반환한 타이머 id
- ┣ `브라우저 환경인 경우 : 숫자`
- ┗ `Node.js 환경인 경우 : 객체`

- setTimeout 함수가 반환한 타이머 id를
- ┣ `clearTimeout 함수의 인수로 전달하여`
- ┣ `타이머 취소가 가능함`
- ┣ 즉 : clearTimeout 함수
- ┗ `호출 스케줄링을 취소함`

```js
// 1초 후 타이머가 만료되면 콜백 함수가 호출됨
// setTimeout 함수 : 생성된 타이머를 식별할 수 있는
// 고유한 타이머 id를 반환함
const timerId = setTimeout(() => console.log('Hi!'), 1000);

clearTimeout(timerId);
```

### 41.2.2 setInterval / clearInterval

- setInterval 함수 : 두 번째 인수로 전달받은
- ┣ 시간(ms, 1/1000초)으로 반복 동작하는 타이머
- ┣ 생성함
- ┣ 이후 타이머가 만료될 때마다 첫 번째 인수로
- ┣ `전달받은 콜백 함수가 반복 호출됨`
- ┣ 이는 타이머가 취소될 때 까지 계속됨
- ┗ `전달 인수 : setTimeout과 동일 `

```js
let count = 1;

const timeoutId = setInterval(() => {
	console.log(count);

	if (count++ === 5) clearInterval(timeoutId);
}, 1000);
```

## 41.3 디바운스와 스로틀

- `scroll`, `resize`, `input`, `mousemove` 같은
- ┣ 이벤트들은 짧은 시간 간격으로 연속해서 발생
- ┣ 이러한 이벤트에 바인딩한 이벤트 핸들러 :
- ┣ 과도하게 호출되어 성능에 문제를 일으킬 수 있음
- ┣ `디바운스 스로틀` : 짧은 시간 간격으로
- ┣ `연속해서 발생하는 이벤트를 그룹화` 해서
- ┣ 과도한 이벤트 핸들러의 호출을 방지하는
- ┗ `프로그래밍 기법`

```js
const debounce = (callback, delay) => {
	let timerId;
	return (event) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(callback, delay, event);
	};
};

const throttle = (callback, delay) => {
	let timerId;
	return (event) => {
		if (timerId) return;
		timerId = setTimeout(
			() => {
				callback(event);
				timerId = null;
			},
			delay,
			event
		);
	};
};
```

- 일반 클릭 이벤트 카운터 : 20
- ┣ 디바운스 클릭 이벤트 카운터 : 1
- ┗ 스로틀 클릭 이벤트 카운터 : 6

- 디바운스, 스토틀의 경우
- ┣ 이벤트를 처리할 때 매우 유용함
- ┣ `디바운스와 스토틀 구현에는`
- ┗ `타이머 함수가 사용됨`

### 41.3.1 디바운스

- `디바운스(debounce)` : 짧은 시간 간격으로
- ┣ 이벤트가 연속해서 발생하면
- ┣ 이벤트 핸들러를 호출하지 않다가
- ┣ 일정 시간이 경과한 이후에
- ┣ `이벤트 핸들러가 한 번만 호출되되록 함`
- ┣ 즉 : 디바운스 : 짧은 시간 간격으로
- ┣ `발생하는 이벤트들을 그룹화해서`
- ┗ `마지막에 한 번만 이벤트 핸들러가 호출되도록 함`

> input 입력 예제

```js
const $input = document.querySelector('input');
const $msg = document.querySelector('.msg');

const debounce = (callback, delay) => {
	let timerId;
	// delay가 경과하기 이전에 이벤트가 발생하면
	// 이전 타이머를 취소하고 새로운 타이머를 재설정함
	// 따라서 delay보다 짧은 간격으로 이벤트가 발생하면
	// callback은 호출되지 않음
	return (event) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(callback, delay, event);
	};
};

// debounce 함수가 반환하는 클로저가
// 이벤트 핸들러로 등록됨
// 300ms 보다 짧은 간격으로 이벤트가 발생하면
// debounce 함수의 콜백 함수는 호출되지 않다가
// 300ms 동안 input 이벤트가 더 이상 발생하지 않으면
// 한 번만 호출됨
$input.oninput = debounce((e) => {
	$msg.textContent = e.target.value;
}, 300);
```

- input 이벤트 :
- ┣ 사용자가 텍스트 입력 필드에 값을
- ┣ 입력할 때마다 연속해서 발생함
- ┣ 만약 input 이벤트 핸들러에서
- ┣ `Ajax 같은 무거운 처리를 수행한다면`
- ┣ 사용자가 아직 입력을 완료하지 않았어도
- ┣ Ajax 요청이 전송될 것임
- ┣ `이는 서버에도 무리를 주는 행위 이므로`
- ┗ `최적화가 필요함`

- 사용자가 입력을 완료했는지 여부는
- ┣ 정확히 알 수 없으므로
- ┣ 일정 시간 동안 텍스트 입력 필드에
- ┣ 값을 입력하지 않으면 입력이 완료된 것으로
- ┣ 간주하게 됨

- ┣ 이를 위해 debounce 함수가 반환한 함수 :
- ┣ debounce 함수에 두 번째 인수로 전달한
- ┣ `시간(delay)보다 짧은 간격으로 이벤트가`
- ┣ `발생하면 이전 타이머를 취소하고`
- ┣ `새로운 타이머를 재설정함`
- ┣ 따라서 delay보다 짧은 간격으로 이벤트가
- ┣ 연속해서 발생하면 debounce 함수의 첫 번째
- ┣ `인수로 전달한 콜백함수가 호출되지 않다가`
- ┣ `delay 동안 input 이벤트가 더 이상 발생하지 `
- ┗ `않으면 한 번만 호출됨`

- 이처럼 짧은 시간 간격으로 이벤트가 연속해서
- ┣ 발생하면 이벤트 핸들러를 호출하지 않다가
- ┣ 일정 시간 동안 이벤트가 더 이상 발생하지
- ┣ 않으면 이벤트 핸들러가 한 번만 호출되도록
- ┣ 하는 디바운스 : `resize 이벤트 처리`나
- ┣ input 요소에 입력된 값으로 Ajax 요청하는
- ┣ `입력 필드 자동완성(autocomplete)`
- ┗ 버튼 중복 클릭 방지 처리 등에 유용하게 사용

- 위 예제 이해를 위해 간단하게 구현하여
- ┣ 완벽하지 않으므로
- ┣ 실무 : `Underscore debounce 함수`
- ┗ `lodash : debounce 함수 이용`

### 41.3.2 스로틀

- 스토틀(throttle) :
- ┣ 짧은 시간 간격으로 이벤트가
- ┣ 연속해서 발생 하더라도
- ┣ `일정 시간 간격으로 이벤트 핸들러가`
- ┣ `최대 한 번만 호출되도록 함`
- ┣ 즉 : 스로틀은 짧은 시간 간격으로
- ┣ 연속해서 발생하는 이벤트를 그룹화 해서
- ┣ `일정 시간 단위로 이벤트 핸들러가 호출되도록`
- ┗ `호출 주기를 만듬`

```js
const $container = document.querySelector('.container');
const $normalCount = document.querySelector('.normal-count');
const $throttleCount = document.querySelector('.throttle-count');

const throttle = (callback, delay) => {
	let timerId;
	// throttle 함수 : timerId를 기억하는
	// 클로저를 반환함
	return (event) => {
		// delay가 경과하기 이전에 이벤트가
		// 발생하면 아무것도 하지 않음
		// delay가 경과했을 때 이벤트가 발생하면
		// 새로운 타이머를 재설정함
		// 따라서 delay 간격으로 callback이 호출됨
		if (timerId) return;
		timerId = setTimeout(
			() => {
				callback(event);
				timerId = null;
			},
			delay,
			event
		);
	};
};

let normalCount = 0;
$container.addEventListener('scroll', () => {
	$normalCount.textContent = ++normalCount;
});

let throttleCount = 0;
// throttle 함수가 반환하는 클로저가
// 이벤트 핸들러로 등록됨
$container.addEventListener(
	'scroll',
	throttle(() => {
		$throttleCount.textContent = ++throttleCount;
	}, 100)
);
```

- scroll 이벤트 : 사용자가 스크롤할 때 짧은 시간 간격으로
- ┣ 연속해서 발생함
- ┣ 이처럼 짧은 시간 간격으로 연속해서 발생하는
- ┣ 이벤트의 과도한 이벤트 핸들러의 호출을 방지하기 위해
- ┣ throttle 함수 : 이벤트를 그룹화 해서
- ┣ `일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를`
- ┗ `만듬`

- throttle 함수가 반환한 함수 :
- ┣ throttle 함수에 두 번째 인수로 전달한 시간(delay)
- ┣ 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
- ┣ delay 시간이 경과 했을 때 이벤트가 발생하면
- ┣ `콜백 함수를 호출하고 새로운 타이머를 재설정함`
- ┗ 따라서 `delay 시간 간격으로 콜백 함수가 호출됨`

- ┣ 1. scroll 이벤트 처리나
- ┣ 2. 무한 스크롤(infinite scrolling) UI 구현 사용
- ┣ `UnderScore : throttle 함수`
- ┗ `Lodash : throttle 함수 실무에서 사용`
