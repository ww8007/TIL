# 40. 이벤트

## 40.1 이벤트 드리븐 프로그래밍

- 브라우저 : 처리해야 할 특정 사건이 발생하면
- ┣ 이를 감지하여 이벤트를 발생(trigger) 함
- ┗ Ex) 클릭, 키보드 입력, 마우스 이동

- 만약 : 애플리케이션이 특정 타입의
- ┣ 이벤트에 대해 반응하여 어떤 일을 하고 싶다면
- ┣ 해당하는 타입의 이벤트가 발생했을 때
- ┣ 호출될 함수를 브라우저에게 알려 호출을 위임함
- ┣ 이때 `이벤트가 발생했을 때 호출될 함수`
- ┣ `이벤트 핸들러(event handler)`
- ┣ `이벤트가 발생했을 때 브라우저에게 이벤트 핸들러`
- ┗ `호출을 위임`하는 것 : `이벤트 핸들러 등록`

- Ex) 사용자가 버튼 클릭
- ┣ → 함수를 호출하여 어떤 처리 가정
- ┗ 문제 : 어떤 함수를 호출해야 하는지 모름

- 특정 버튼 요소에서 클릭 이벤트 발생하면
- ┣ 1. `특정 함수(이벤트 핸들러)를 호출하도록`
- ┣ 2. `브라우저에게 위임(이벤트 핸들러 등록)`
- ┣ 할 수 있음
- ┣ 즉 : 함수를 언제 호출할지 알 수 없으므로
- ┣ 개발자가 명시적으로 함수를 호출하는 것이 아닌
- ┗ `브라우저에게 함수 호출을 위임하는 것`

```html
<body>
	<button>Click me!</button>
	<script>
		const $button = document.querySelector('button');
		// 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
		$button.onClick = () => {
			alert('button click');
		};
	</script>
</body>
```

- 위 예제 : 버튼 요소 `$button`의 onclick 프로퍼티에
- ┣ 함수를 할당 하였음
- ┣ `Window`, `Document`, `HTMLElement` 타입의 객체 :
- ┣ onclick과 같이 특정 이벤트에 대응하는
- ┣ 다양한 이벤트 핸들러 프로퍼티를 가지고 있음
- ┣ `이 이벤트 핸들러 프로퍼티에 함수를 할당 하면` :
- ┣ 해당 이벤트가 발생했을 때
- ┗ `할당한 함수가 브라우저에 의해서 호출됨`

## 40.2 이벤트 타입

- `이벤트 타입(event type)` : 이벤트 종류를
- ┗ 나타내는 문자열임

### 40.2.1 마우스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                    |
| ----------- | ------------------------------------------------------------------- |
| click       | 마우스 버튼 클릭                                                    |
| dbclick     | 마우스 더블 클릭                                                    |
| mousedown   | 마우스 버튼 누를 때                                                 |
| moseup      | 누르고 있던 버튼 놓을 때                                            |
| mousemove   | 마우스 커서 움직일 때                                               |
| mouseenter  | 마우스 커서를 HTML 요소 안으로 이동 <br/> 했을 때(버블링 되지 않음) |
| mouseover   | 마우스 커서를 HTML 요소 안으로 이동 <br/> 했을 때(버블링 됨)        |
| mouseleave  | 마우스 커서를 HTML 요소 밖으로 이동 <br/> 했을 때(버블링 되지 않음) |
| mouseout    | 마우스 커서를 HTML 요소 밖으로 이동 <br/> 했을 때(버블링 됨)        |

### 40.2.2 키보드 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| keydown     | 모든 키를 눌렀을 때 발생 <br/> control, option, shift, tab, delete, enter <br> 방향 키와 문자, 숫자, 특수 문자 키를 <br/> 눌렀을 때 발생함 <br/> enter 키를 눌렀을 때는 연속적으로 발생하지만 <br/> 그 외의 키를 눌렀을 때는 한 번만 발생함 |
| keypress    | 문자 키를 눌렀을 때 연속적으로 발생                                                                                                                                                                                                         | 문자, 숫자, 특수 문자, enter 키를 <br/> 키를 눌렀을 때만 발생함 <br/> 폐지 되었음 사용 X |
| keyup       | 누르고 있던 키를 놓았을 때 한 번만 발생함                                                                                                                                                                                                   | keydown 이벤트 마찬가지로 문자 키를 놓을 때만 발생함                                     |

### 40.2.3 포커스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                |
| ----------- | ----------------------------------------------- |
| focus       | HTML 요소가 포커스를 받았을 때(버블링되지 않음) |
| blur        | HTML 요소가 포커스를 잃었을 때(버블링되지 않음) |
| focusin     | HTML 요소가 포커스를 받았을 때(버블링됨)        |
| focusout    | HTML 요소가 포커스를 잃었을 때(버블링됨)        |

### 40.2.4 폼 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                |
| ----------- | ----------------------------------------------- |
| submit      | form 요소 내의 submit 버튼을 클릭했을 때        |
| reset       | form 요소 내의 reset 버튼을했을 때(최근 사용 X) |

### 40.2.5

| 이벤트 타입 | 이벤트 발생 시점                                                                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input       | input(text, checkbox, radio), select, textarea <br/> 요소 값이 입력되었을 때                                                                                                                                                                                                                                                    |
| change      | input(text, checkbox, radio), select, textarea <br/> 요소 값이 변경되었을 때 <br/> change 이벤트 : input 이벤트 와는 달리 HTML 요소가 <br/> 포커스를 잃었을 때 종료되었다고 인식하여 발생함 <br/> 즉 : 사용자가 입력을 하고 있을 때는 input 이벤트가 발생하고 <br/> 사용자 입력이 종료되어 값이 변경되면 change 이벤트가 발생함 |

| readystatechange| HTML 문서의 로드와 파싱 상태를 나타내는 <br/> document.readyState 프로퍼티 값('loading', 'interactive', 'complete')이 변경될 때 |

### 40.2.6 DOM 뮤테이션 이벤트

| 이벤트 타입      | 이벤트 발생 시점                                        |
| ---------------- | ------------------------------------------------------- |
| DOMContentLoaded | HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료될 때 |

### 40.2.7 뷰 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| resize      | 브라우저 윈도우(window)의 크기를 리사이즈 할 때 <br/> 연속적으로 발생됨 <br/> 오직 window 객에에서만 발생함 |
| scroll      | 웹페이지(document) 또는 HTML 요소를 스크롤할 때 연속적으로 발생함                                           |

### 40.2.8 리소스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| load        | DOMContendLoaded 이벤트가 발생한 이후 모든 리소스(이미지, 폰트) <br/> 로딩이 완료되었을 때 발생(주로 window) |
| unload      | 리소스가 언로드될 때 (주로 새로운 웹페이지를 요청한 경우)                                                    |
| abort       | 리소스 로딩이 중단되었을 때                                                                                  |
| error       | 리소스 로딩이 실패되었을 때                                                                                  |

## 40.3 이벤트 핸들러 등록

- `이벤트 핸들러(event handler, event listener)` :
- ┣ 이벤트가 발생했을 때 `브라우저에서 호출을 위임한 함수`
- ┣ 다시 말해 : 이벤트가 발생하면 `브라우저`에 의해
- ┗ `호출될 함수가 이벤트 핸들러임`

- 이벤트가 발생했을 때 브라우저에게
- ┣ `이벤트 핸들러의 호출을 위임하는 것` :
- ┣ `이벤트 핸들러 등록`이라고 함
- ┗ 이벤트 핸들러 등록의 방법 : 3가지

### 40.3.1 이벤트 핸들러 어트리뷰트 방식

- HTML 요소의 어트리뷰트 중에서
- ┣ `이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 존재`
- ┣ 이벤트 핸들러 어트리뷰트 이름은
- ┣ onclick과 같이
- ┣ 1. `on 접두사`와
- ┣ 2. 이벤트 종류를 나타내는 → `이벤트 타입`으로 이루어져 있음
- ┣ `이벤트 핸들러 어트리뷰트 값으로`
- ┣ `함수 호출문 등의 문(statement)을 할당하면`
- ┗ `이벤트 핸들러가 등록됨`

```html
<body>
	<button onclick="sayHi('Lee')">Click me!</button>
	<script>
		function sayHi(name) {
			console.log(`Hi! ${name}`);
		}
	</script>
</body>
```

- 주의할 점 : 이벤트 핸들러 어트리뷰트 값으로
- ┣ 함수 참조가 아닌 함수 호출문 등의 문을 할당하는 것
- ┣ 이벤트 핸들러 프로퍼티 방식 :
- ┣ `DOM 노드의 이벤트 핸들러 프로퍼티에`
- ┗ `함수 참조를 할당함`

- 이벤트 핸들러 등록 :
- ┣ `함수 호출을 브라우저에게 위임`
- ┣ 따라서 이벤트 핸들러를 등록할 때
- ┣ 콜백함수와 마찬가지로
- ┣ `함수 참조를 등록해야 브라우저가 이벤트 핸들러`
- ┗ `호출이 가능해짐`

- 만약 함수 참조가 아닌 함수 호출문을 등록하면
- ┣ 호출문의 결과가 이벤트 핸들러로 등록됨
- ┣ `함수를 반환하는 고차 함수 호출문을`
- ┣ `이벤트 핸들러로 등록` 한다면
- ┣ 문제가 없겠지만
- ┣ `함수가 아닌 값을 반환하는 함수 호출문을`
- ┣ 이벤트 핸들러로 등록하면
- ┗ `브라우저가 이벤트 핸들러 호출 불가함`

- 위 예제 : 이벤트 핸들러 어트리뷰트 값으로
- ┣ 함수 호출문을 할당했음
- ┣ 이때 이벤트 핸들러 어트리뷰트 값 :
- ┣ 사실 암묵적으로 생성될 이벤트 핸들러의
- ┣ 함수 몸체를 의미함
- ┣ 즉 : `어트리뷰트 → 파싱되어 다음과 같은 함수 생성`
- ┣ 이벤트 핸들러 어트리뷰트 이름과 동일한 키
- ┗ `onclick 이벤트 핸들러 프로퍼티에 할당함`

```js
function onclick(event) {
	sayHi('Lee');
}
```

- 이처럼 동작하는 이유 :
- ┣ 이벤트 핸들러에 인수를 전달하기 위함
- ┣ 만약 : 이벤트 핸들러 어트리뷰트 값으로
- ┣ `함수 참조를 할당해야 한다면`
- ┗ `이벤트 핸들러에 인수를 전달하기 곤란함`

```html
<!-- 이벤트 핸들러에 인수를 전달하기 곤란함-->
<button onclick="sayHi">Click me!</button>
```

- 결국 이벤트 핸들러 어트리뷰트 값으로
- ┣ `할당한 문자열` :
- ┣ `암묵적으로 생성되는 이벤트 핸들러의`
- ┣ `함수 몸체임`
- ┣ 따라서 이벤트 핸들러 어트리뷰트 값으로
- ┗ 다음과 같이 여러개의 문을 할당 가능

```html
<button onclick="console.log('Hi!.'); console.log('Lee') ">Click me!</button>
```

- 이벤트 핸들러 어트리뷰트 방식 :
- ┣ 오래된 코드에서 사용
- ┣ 요즘에는 잘 사용하지 않음
- ┣ HTML, JS : 관심사가 다르므로
- ┗ `혼재하는 것 보다 → 분리하는 것이 좋음`

- 하지만 모던 JS에서는 이벤트 핸들러 어트리뷰트 방식 사용
- ┣ `CBD(Component Based Development)` 방식의
- ┣ Angular/React/Svelte/Vue.js 같은
- ┣ 프레임워크/라이브러리에서
- ┗ `이벤트 핸들러 어트리뷰트 방식으로 이벤트 처리함`

> 이유

    CBD 에서는
    ┣ HTML, CSS, JS를
    ┣ 관심사가 다른 개별 요소가 아닌
    ┣ 뷰를 구성하기 위한 요소로 봄
    ┗ 고로 관심사가 같다고 봄

```js
// React
<button onClick={handleClick}>Save</button>
```

### 40.3.2 이벤트 핸들러 프로퍼티 방식

- window 객체와 `Document, HTMLElement 타입`의
- ┣ DOM 노드 객체는 이벤트에 대응하는
- ┣ `이벤트 핸들러 프로퍼티를 가지고 있음`
- ┣ 이벤트 핸들러 프로퍼티의 키 :
- ┣ 이벤트 핸들러 어트리뷰트와 마찬가지로
- ┣ 1. `on 접두사`
- ┣ 2. `이벤트 종류를 나타내는 이벤트 타입`
- ┣ `이벤트 핸들러 프로퍼티에 함수를 바인딩하면`
- ┗ `이벤트 핸들러가 등록됨`

```html
<body>
	<button>Click me!</button>
	<script>
		const $button = document.querySelector('button');

		// 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
		$button.onclick = function () {
			console.log('button click');
		};
	</script>
</body>
```

- 이벤트 핸들러를 등록하기 위해서는
- ┣ `이벤트를 발생시킬 객체`인 :
- ┣ 1. `이벤트 타깃(event target)`과
- ┣ 이벤트 종류를 나타내는 문자열인:
- ┣ 2. `이벤트 타입(event type)`
- ┣ 3. `이벤트 핸들러`를 지정할 필요가 있음

- ┣ 예를 들어 버튼 요소가 클릭되면
- ┣ handleClick 함수를 호출하도록
- ┣ 이벤트 핸들러를 등록하는 경우 :
- ┣ `이벤트 타깃 : 버튼 요소`
- ┣ `이벤트 타입 : 'click'`
- ┗ `이벤트 핸들러 : handleClick 함수`

- 이벤트 핸들러 : 대부분 이벤트를 발생시킬
- ┣ 이벤트 타깃에 바인딩함
- ┣ 하지만 : 반드시 이벤트 타깃에
- ┣ `이벤트를 바인딩 해야 하는 것은 아님`
- ┣ 이벤트 핸들러 :
- ┣ 1. `이벤트 타깃` 또는
- ┣ 2. `전파된 이벤트를 캐치할 DOM 노드 객체`에
- ┗ 바인딩함

- 앞서 살펴본 : `이벤트 핸들러 어트리뷰트 방식도`
- ┣ `결국 DOM 노드 객체의 이벤트 핸들러 프로퍼티로`
- ┣ 변환되어 결과적으로
- ┣ `이벤트 핸들러 프로퍼티 방식과`
- ┣ `동일하다고 할 수 있음`
- ┣ 이벤트 핸들러 프로퍼티 방식 :
- ┣ 이벤트 핸들러 어트리뷰트 방식의
- ┣ `JS, HTML 혼동의 문제를 해결이 가능함`
- ┣ 하지만 이벤트 핸들러 프로퍼티에
- ┣ `하나의 이벤트 핸들러만 바인딩할 수 없는`
- ┗ `단점이 존재함`

```html
<body>
	<button>click</button>
	<scrip>
		const $button = document.querySelector('button');

		// 이벤트 핸들러 프로퍼티 방식 :
		// 이벤트 하나의 이벤트 핸들러만 바인딩 가능함
		// 첫 번째로 바인딩된 이벤트 핸들러 :
		// 두 번째 바인딩된 이벤트 핸들러에 의해
		// 재할당 되어 실행되지 않음
		$button.onclick = function () {
			console.log('button clicked1');
		};
		$button.onclick = function () {
			console.log('button clicked2');
		};
	</script>
</body>
```

### 40.3.3 addEventListener 메서드 방식

- DOM Level 2 에서 도입된
- ┣ `EventTarget.prototype.addEventListener` 메서드를
- ┣ 사용하여 이벤트 핸들러를 등록이 가능함
- ┣ 앞의 1. `이벤트 핸들러 어트리뷰트`
- ┣ 2. `이벤트 핸들러 프로퍼티 방식` :
- ┣ `DOM level 0 에서 제공되던 방식`

- addEventListener 메서드의
- ┣ 1. `첫 번째 매개변수` :
- ┣ 이벤트의 종류를 나타내는 문자열인
- ┣ `이벤트 타입을 전달함`
- ┣ 이때 이벤트 핸들러 프로퍼티 방식과는 달리
- ┣ `on 접두사를 붙이지 않음`
- ┣ 2. `두 번째 매개변수` :
- ┣ `이벤트 핸들러를 전달함`
- ┣ `생략 또는 false를 지정하면` :
- ┣ `버블링 단계`에서 이벤트를 캐치하고
- ┗ `true 지정` : `캡처링 단계에서 이벤트 캐치`

> 이에 대해서는 40.6에서 학습

```js
$button.addEventLister('click', function () {
	console.log('button click');
});
```

- 이벤트 핸들러 프로퍼티 방식 :
- ┣ `이벤트 핸들러 프로퍼티에`
- ┣ `이벤트 핸들러를 바인딩` 하지만
- ┣ `addEventListener` 메서드 :
- ┗ `이벤트 핸들러를 인수로 전달함`

> 만약 동시에 이를 등록하면 어떻게 될까

    둘 다 서로에게 영향을
    ┣ 주지 않음
    ┣ 고로 이벤트 핸들러
    ┗ 2개 모두 호출

- 동일한 HTML 요소에서 발생한
- ┣ 동일한 이벤트에 대해
- ┣ `이벤트 핸들러에 아무런 영향을 주지 않음`
- ┣ 따라서 `버튼 요소에서 클릭 이벤트가 발생하면`
- ┗ `2개의 이벤트 핸들러가 모두 호출됨`

- 동일한 HTML 요소에서 발생한 동일한 이벤트에 대해
- ┣ `이벤트 핸들러 프로퍼티 방식` :
- ┣ `하나 이상의 이벤트 핸들러를 등록할 수 없지만`
- ┣ `addEventListener : 하나 이상의 이벤트 핸들러`
- ┗ `등록이 가능함`

> 이벤트 핸들러

    등록한 순서대로 호출됨
    ┣ 단 : 참조가 동일한 이벤트 핸들러
    ┣ 중복 등록하면 하나의 이벤트 핸들러만
    ┗ 등록됨

```js
const $button = document.querySelector('button');

const handleClick = () => console.log('button click');

// 참조가 동일한 이벤트를 중복 등록하면
// 하나의 핸들러만 등록됨
$button.addEventListener('click', handleClick);
$button.addEventListener('click', handleClick);
```

## 40.4 이벤트 핸들러 제거

- `addEventListener 메서드로 등록한`
- ┣ 이벤트 핸들러를 제거하려면
- ┣ EventTarget.prototype.removeEventListener 사용
- ┣ `removeEventListener 메서드에 전달할 인수 :`
- ┣ `addEventListener와 동일함`
- ┣ 단 : 메서드에 전달한 인수가 일치하지 않으면
- ┗ 제거되지 않음

```js
// 이벤트 핸들러 등록
$button.addEvenLister('click', handleClick);

// 이벤트 핸들러 제거
// 일치하지 않으면 제거 안됨
$button.removeEventListener('click', handleClick, true); //false
$button.removeEventListener('click', handleClick); // true
```

- 무명 함수를 이벤트 핸들러로 등록한 경우
- ┣ 제거가 불가능함
- ┣ 고로 : 이벤트 핸들러 제거하기 위해서는
- ┣ `이벤트 핸들러의 참조를 변수나 자료구조에`
- ┗ `보관하고 있어야함`

- 단 : `기명 이벤트 핸들러 내부`에서
- ┣ removeEventListener 메서드를 호출하여
- ┣ `이벤트 핸들러를 제거하는 것은 가능함`
- ┣ `이벤트 핸들러는 단 한 번만 호출됨`
- ┣ 다음 예제 : 버튼 요소 여러 번 클릭해도
- ┗ 단 한번만 이벤트 핸들러가 한 번 호출됨

```js
// 기명 함수를 이벤트 핸들러로 등록
$button.addEventListener('click', function foo() {
	console.log('button click');
	// 이벤트 핸들러를 제거함
	// 따라서 이벤트 핸들러는 단 한번만 호출됨
	$button.removeEventListener('click', foo);
});
```

- 기명 함수를 이벤트 핸들러로 등록할 수 없다면
- ┣ 호출된 함수 → 즉 : 함수 자신을 가리키는
- ┣ `argument.callee`를 사용 가능
- ┗ `18.2.1 참조`

```js
// 무명 함수를 이벤트 핸들러로 등록
$button.addEventListener('click', function () {
	console.log('button click');
	// 이벤트 핸들러를 제거함
	// 따라서 : 핸들러는 단 한 번만 호출됨
	// arguments.callee는 호출된 함수
	// 즉 : 함수 자신을 가리킴
	$button.removeEventListener('click', arguments.callee);
});
```

- `arguments.callee : 코드 최적화를 방해하므로`
- ┣ `strict mode에서는 사용이 금지됨`
- ┣ 따라서 가급적 이벤트 핸들러의 참조를
- ┗ `변수, 자료구조에 저장하여 제거하는 편이 좋음`

- 이벤트 핸들러 프로퍼티 방식으로
- ┣ 등록한 이벤트 핸들러 :
- ┣ `removeEventListener로 제거가 불가능함`
- ┣ 이벤트 핸들러 프로퍼티 방식으로
- ┣ `등록한 이벤트 핸들러를 제거하려면` :
- ┗ `이벤트 핸들러 프로퍼티에 null을 할당함`

```js
const $button = document.querySelector('button');

const handleClick = () => console.log('button click');

// 이벤트 핸들러 프로퍼티 방식으로
// 이벤트 핸들러 등록
$button.onclick = handleClick;

$button.onclick = null;
```

## 40.5 이벤트 객체

- `이벤트가 발생하면` :
- ┣ 이벤트에 관련한 다양한 정보를 담고 있는
- ┣ `이벤트 객체가 동적으로 생성됨`
- ┣ 생성된 이벤트 객체 :
- ┗ `이벤트 핸들러의 첫 번째 인수로 전달됨`

```html
<p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
<em class="message"></em>
<script>
	const $msg = document.querySelector('.message');
	// 클릭 이벤트에 의해 생성된 이벤트 객체
	// 핸들러의 첫 번째 인수로 전달됨
	function showCoords(e) {
		$msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
	}

	document.onclick = showCoords;
</script>
```

- 클릭 이벤트 의해 생성된 이벤트 객체에 :
- ┣ `이벤트 핸들러의 첫 번째 인수로 전달되어`
- ┣ `매개변수 e에 암묵적으로 할당됨`
- ┣ 이는 브라우저가 이벤트 핸들러를 호출할 때
- ┣ `이벤트 객체를 인수로 전달하기 때문`

- ┣ `이벤트 객체를 전달받으려면` :
- ┣ 이벤트 핸들러를 정의할 때
- ┣ `이벤트 객체를 전달받을 매개변수를`
- ┣ `명시적으로 선언해야 함`
- ┗ 위 예제 e 사용 다른거 사용 무관

```html
<!-- 이벤트 핸들러 어트리뷰트 방식 
event가 아닌 다른 이름으로 이벤트 객체 전달받지 못함 -->
<body onclick="showCoords(event)">
	<p>클릭하세요. 클릭한 곳의 좌표가 표시됨</p>
	<em class="message"></em>
	<script>
		const $msg = document.querySelector('.message');

		// 클릭 이벤트에 의해 생성된 이벤트 객체:
		// 이벤트 핸들러의 첫 번째 인수로 전달됨
		function showCoords(e) {
			$msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
		}
	</script>
</body>
```

- 이벤트 핸들러 어트리뷰트 방식의 경우 :
- ┣ 이벤트 객체를 전달 받기 위해서
- ┣ `이벤트 핸들러의 첫 번째 매개변수 이름이`
- ┣ 반드시 `event 이여야함`
- ┣ 만약 event가 아닌 다른 이름을 사용하면
- ┗ 전달받지 못하게 됨

- ┣ 이유 :
- ┣ `이벤트 핸들러 어트리뷰트의 값은`
- ┣ `사실 암묵적으로 생성되는`
- ┣ `이벤트 핸들러의 함수 몸체`를 의미함
- ┣ 즉: `onclick="showCoords(event)"` 어트리뷰트
- ┣ 파싱되어 다음과 같은 `함수를 암묵적으로 생성하여`
- ┗ `onclick 이벤트 핸들러 프로퍼티에 할당함`

```js
function onclick(event) {
	showCoords(event);
}
```

- 이때 `암묵적으로 생성된 onclick`
- ┣ 이벤트 핸들러의 첫 번째 매개변수 이름이
- ┣ `event로 암묵적으로 명명됨`
- ┣ 고로 : event가 아닌 다른 이름으로
- ┗ `전달받는 것이 불가능함`

### 40.5.1 이벤트 객체의 상속 구조

- 이벤트가 발생하면 이벤트 타입에 따라
- ┣ 다양한 이벤트 객체가 생성됨
- ┗ `이벤트 객체 : 상속 구조를 가짐`

- `Event`, `UIEvent`, `MouseEvent` :
- ┣ 모두 생성자 함수임
- ┣ 따라서 다음과 같이 생성자 함수를
- ┗ `호출하여 이벤트 객체를 생성 가능함`

```js
// Event 생성자 함수를 호출하여
// foo 이벤트 타입의 Event 객체를 생성함
let e = new Event('foo');
console.log(e);
// Event {isTrusted: false, type: "foo", target: null, ...}
console.log(e.type); // "foo"
console.log(e instanceof Event); // true
console.log(e instanceof Object); // true

// FocusEvent 생성자 함수를 호출하여
// focus 이벤트 타입의 FocusEvent 객체를 생성함
e = new FocusEvent('focus');
console.log(e); // FocusEvent {isTrusted: false, relatedTarget: null, view: null, ...}

// MouseEvent 생성자 함수를 호출하여 click 이벤트 타입의 MouseEvent 객체를 생성함
e = new MouseEvent('click');
console.log(e);
// MouseEvent {isTrusted: false, screenX: 0, screeY: 0, clientX: 0, ...}
```

- 이처럼 `이벤트가 발생하면` :
- ┣ 암묵적으로 생성되는
- ┣ `이벤트 객체도 생성자 함수에 의해 생성됨`
- ┣ 그리고 생성된 `이벤트 객체` :
- ┣ `생성자 함수와 더불어 생성되는 프로토타입으로`
- ┣ `구성된 프로토타입 체인의 일원이 됨`

- ┣ Ex) click 이벤트 발생 :
- ┣ `암묵적으로 생성되는 MouseEvent 타입의 이벤트 객체` :
- ┗ 프로토타입 체인의 일원이 됨

- 이벤틑 객체 중 일부 :
- ┣ 1. `사용자 행위에 의한 것`
- ┣ 2. `JS 코드에 의해 인위적인 생성`
- ┣ Ex) MouseEvent 타입의 이벤트 객체 :
- ┣ 사용자가 마우스 클릭, 이동 했을 때 생성
- ┣ CustomEvent 타입 이벤트 객체 :
- ┗ JS 코드에 의해 인위적으로 생성됨

- `Event 인터페이스` :
- ┣ `DOM 내에서 발생한 이벤트에 의해`
- ┣ `생성되는 이벤트 객체`를 나타냄

- ┣ `Event 인터페이스` : `모든 이벤트 객체의`
- ┣ `공통 프로퍼티가 정의`되어 있고
- ┣ 1. FocusEvent
- ┣ 2. MouseEvent
- ┣ 3. KeyboardEvent
- ┣ 4. WheelEvent
- ┣ 같은 `하위 인터페이스` :
- ┣ `이벤트 타입에 따라 고유한 프로퍼티가 정의`
- ┣ 즉 : 다음 예제와 같이 이벤트 객체의 프로퍼티 :
- ┗ `발생한 이벤트 타입에 따라 달라짐`

```js
const $input = document.querySelector('input[type=text]');
const $checkbox = document.querySelector('input[type=checkbox]');
const $button = document.querySelector('button');

// load 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성
window.onload = console.log;

// change 이벤트가 발생하면
// Event 타입의 이벤트 객체가 생성
$checkbox.onchange = console.log;

// focus 이벤트가 발생하면
// Event 타입의 이벤트 객체가 생성
$checkbox.onfocus = console.log;

// input 이벤트가 발생하면
// Event 타입의 이벤트 객체가 생성
$checkbox.oninput = console.log;

// keyup 이벤트가 발생하면
// Event 타입의 이벤트 객체가 생성
$checkbox.onkeyup = console.log;

// click 이벤트가 발생하면
// Event 타입의 이벤트 객체가 생성
$checkbox.onclick = console.log;
```

### 40.5.2 이벤트 객체의 공통 프로퍼티

- Event 인터페이스 :
- ┣ 즉 : Event.prototype에 정의되어 있는
- ┣ 이벤트 관련 프로퍼티는
- ┣ UIEvent, CustomEvent, MouseEvent 등
- ┣ `모든 파생 이벤트 객체에 상속됨`
- ┣ 즉 : `Event 인터페이스의`
- ┣ `이벤트 관련 프로퍼티` : `모든 이벤트 객체가`
- ┣ `상속받는 공통 프로퍼티임`
- ┗ 이벤트 객체의 공통 프로퍼티는 다음과 같음

| 공통 프로퍼티    | 설명                                                                                                                                                                                                                                                                         | 타입          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| type             | 이벤트 타입                                                                                                                                                                                                                                                                  | string        |
| target           | 이벤트를 발생시킨 DOM 요소                                                                                                                                                                                                                                                   | DOM 요소 노드 |
| currentTarget    | 이벤트 핸들러가 바인딩된 DOM 요소                                                                                                                                                                                                                                            | DOM 요소 노드 |
| eventPhase       | 이벤트 전파 단계 <br/> 0: 이벤트 없음 1: 캡처링 단계 2. 타깃 단계 3.버블링 단계                                                                                                                                                                                              | number        |
| bubbles          | 이벤트를 버블링으로 전파하는지 여부, 다음 이벤트는 `bubbles:false`로 <br/> 버블링하지 않음 <br/> 1. focus 이벤트 focus/blur <br/> 2. 리소스 이벤트 load/unload/abort/error <br/> 3. 마우스 이벤트 mouseenter/mouseleave                                                      | boolean       |
| cancelable       | preventDefault 메서드를 호출하여 이벤트의 기본동작을 취소할 수 있는지 여부 <br/> 다음 이벤트는 cancelable: false로 취소가 불가함 <br/> 1. 포커스 이벤트 : focus/blur <br/> 2. 리소스 이벤트 : load/unload/abort/error <br/> 3. 마우스 이벤트 : dbclick/mouseenter/mouseleave | boolean       |
| defaultPrevented | preventDefault 메소드를 호출하여 이벤트를 취고했는지 여부                                                                                                                                                                                                                    | boolean       |
| isTrusted        | 사용자의 행위에 의해 발생된 이벤트인지 여부, 예를 들어 click 메서드 <br/> 또는 `dispatchEvent`를 통해 인위적으로 발생시긴 이벤트인 경우 <br/> `isTrusted :false` 임                                                                                                          | boolean       |
| timeStamp        | 이벤트가 발생한 시각(1970/01/01/00:00:0) 부터 시작한 밀리초                                                                                                                                                                                                                  | number        |

- Ex) 체크 박스 요소 체크 상태 변경
- ┗ 현재 체크 상태를 출력

```html
<body>
	<input type="checkbox" />
	<em class="message">off</em>
	<script>
		const $checkbox = document.querySelector('input[type=checkbox]');
		const $msg = document.querySelector('.message');

		// change 이벤트가 발생하면 Event 타입의
		// 이벤트 객체가 생성됨
		$checkbox.onchange = (e) => {
			console.log(Object.getPrototypeOf(e) === Event.prototype); // true

			// e.target : change 이벤트를 발생시킨 DOM 요소
			// $checkbox를 가르키고
			// e.target.checked : 체크박스 요소의
			// 현재 체크 상태를 나타냄
			$msg.textContent = e.target.checked ? 'on' : 'off';
		};
	</script>
</body>
```

- 사용자 입력에 의해 체크박스 요소의
- ┣ 체크 상태가 변경되면
- ┣ 1. `checked 프로퍼티의 값이 변경`되고
- ┣ 2. `change 이벤트가 발생됨`
- ┗ 이때 `Event 타입의 이벤트 객체가 생성됨`

- `이벤트 객체의 target 프로퍼티` :
- ┣ 이벤트를 발생시킨 객체를 나타냄
- ┣ 따라서 `target 프로퍼티가 가리키는 객체` :
- ┣ change 이벤트를 발생시킨 `DOM 요소 $checkbox이고`
- ┗ `이 객체의 checked 프로퍼티 : 현재의 체크 상태를 나타냄`
- 이벤트 객체의 `currentTarget 프로퍼티` :
- ┣ 이벤트 핸들러가 바인딩된
- ┣ `DOM 요소를 가르킴`
- ┣ 위 예제의 경우 이벤트를 발생시킨
- ┣ DOM 요소와 이벤트 핸들러가 바인딩된 DOM 요소
- ┣ `모두 $checkbox임`
- ┣ 따라서 : `이벤트 객체의 target 프로퍼티`와
- ┣ `currentTarget 프로퍼티` :
- ┗ `동일한 객체 $checkbox를 가리킴`

```js
$checkbox.onchange = (e) => {
	// e.target : change 이벤트를 발생시킨
	// DOM 요소 $checkbox를 가리키고
	// e.currentValue :
	// 이벤트 핸들러가 바인딩된 DOM 요소
	// $checkbox를 가리킴
	console.log(e.target === e.currentTarget); // true

	$msg.textContent = e.target.checked ? 'on' : 'off';
};
```

- 이처럼 `일반적으로 이벤트 객체의 `
- ┣ target 프로퍼티와 currentTarget 프로퍼티 :
- ┣ `동일한 DOM 요소를 가리키지만`
- ┗ `나중에 살펴본 이벤트 위임에서는 이는 달라질 수 있음`

### 40.5.3 마우스 정보 취득

- click, dbclick, mosedown, mouseup, mousemove
- ┣ mouseenter, mouseleave 이벤트가 발생하면
- ┣ `생성되는 MouseEvent 타입의 이벤트 객체는`
- ┗ `다음과 같은 고유의 프로퍼티를 가짐`

- 마우스 포인터의 좌표를 나타내는 프로퍼티
- ┣ `screenX/screenY`, `clientX/clientY`, `pageX/pageY`
- ┗ `offsetX/offsetY`

- 버튼 정보를 나타내는 프로퍼티
- ┗ `altKey, ctrlKey, shiftKey, button`

- Ex) DOM 요소를 드래그하여 이동하는 예제
- ┣ 드래그 마우스 버튼을 누른 상태,
- ┣ 1. 마우스를 이동하는 것으로 시작하고
- ┣ 2. 마우스 버튼을 때면 종료함
- ┣ 따라서 드래그는 mousedown 이벤트가 발생한
- ┣ 1. 상태에서 `mousedown 이벤트가 발생한 시점에 시작`하고
- ┗ 2. `mouseup 이벤트가 발생한 시점에 종료`함

- 드래그가 시작되면 드래그 시작 시점
- ┣ 즉 : mousedown 이벤트가 발생했을 때의
- ┣ `마우스 포인터 좌표와 드래그를 하고 있는 시점`
- ┣ 즉 : mousedown 이벤트가 발생 할때마다의
- ┣ `마우스 포인터 좌표를 비교하여`
- ┗ `드래그 대상의 이동 거리를 계산함`

- mouseup : 이벤트 발생하면
- ┣ 드래그가 종료한 것임
- ┣ 이때 드래그 대상 요소를 이동시키는
- ┣ `이벤트 핸들러를 제거하여`
- ┗ `이동을 멈추게 됨`

- clientX/clientY :
- ┣ 뷰포트(viewport)
- ┣ 즉 : `웹페이지의 가시 영역을 기준으로`
- ┗ `마우스 포인터 좌표를 나타냄`

```js
// 드래그 대상 요소
const $box = document.querySelector('.box');

// 드래그 시작 시점의 마우스 포인터 위치
const initialMousePos = { x: 0, y: 0 };
// 오프셋: 이동할 거리
const offset = { x: 0, y: 0 };

// mousemove 이벤트 핸들러
const move = (e) => {
	// 오프셋 = 현재(드래그 하고 있는 시점)
	// ┣ 마우스 포인터 좌표 - 드래그 시작 시점의
	// ┣ 마우스 포인터 좌료
	offset.x = e.clientX - initialMousePos.x;
	offset.y = e.clientY - initialMousePos.y;

	// translate3d : GPU를 사용하므로
	// absolute의 top, left를 사용하는 것보다 빠름
	// top, left는 레이아웃의 영향을 줌
	$box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
};

// mousedown 이벤트가 발생하면
// 드래그 시작 시점의 마우스 포인터 좌표를 지정함
$box.addEventListener('mousedown', (e) => {
	// 이동 거리를 계산하기 위해
	// mousedown 이벤트가 발생(드래그 시작)하면
	// 드래그 시작 시점의 마우스 포인터 좌표 :
	// 뷰포트 상에서 현재 마우스 포인터 좌표를 기억해둠
	// 한 번 이상 드래그로 이동한 경우 move에서
	// translate3d로 이동한 상태이므로
	// offset.x와 offset.y를 빼주어야함
	initialMousePos.x = e.clientX - offset.x;
	initialMousePos.y = e.clientY - offset.y;

	// mousedown 이벤트가 발생한 상태에서
	// mousemove 이벤트가 발생하면
	// box 요소를 이동시킴
	document.addEventListener('mousemove', move);
});

// mouseup 이벤트가 발생하면
// mousemove 이벤트를 제거해 이동을 멈춤
document.addEventListener('mouseup', () => {
	document.removeEventListener('mousemove', move);
});
```

### 40.5.4 키보드 정보 취득

- `keydown, keyup, kepress` 이벤트가 발생하면
- ┣ 생성되는 `keyboardEvent` 타입의 이벤트 객체는
- ┣ `altKey, ctrlKey, shiftKey, metaKey,`
- ┗ `key, keyCode` 같은 고유의 프로퍼티를 가짐

```js
const $input = document.querySelector('input[type=text]');
const $msg = document.querySelector('.message');

$input.onkeyup = (e) => {
	// e.key : 입력한 키 값을 문자열로 반환
	// 입력한 키가 'Enter' 즉 엔터 키가 아니면
	// 무시함
	if (e.key !== 'Enter') return;

	// 엔터키가 입력되면 입력 필드에 입력된
	// 값을 출력함
	$msg.textContent = e.target.value;
	e.target.value = '';
};
```

- keyup 이벤트가 발생하면
- ┣ 생성되는 keyboardEvent 타입의 객체는
- ┣ 입력한 키 값을 문자열로 반환하는
- ┗ key 프로퍼티를 제공함

> input 요소 입력 필드 한글

    keyup 엔터 두 번 호출
    ┣ 이를 방지하기 위해서
    ┗ keydown 이벤트를 캐치함

## 40.6 이벤트 전파

- `DOM 트리 상에 존재하는 DOM 요소 노드에서`
- ┣ 발생한 이벤트 : DOM 트리를 통해 전파됨
- ┗ 이를 `이벤트 전파(event propagation)`라고 함

```html
<ul>
	<li id="apple">Apple</li>
	<li id="banana">banana</li>
	<li id="orange">orange</li>
</ul>
```

- ul 요소의 두 번째 자식 요소인
- ┣ li 요소를 클릭하면 클릭 이벤트가 발생함
- ┣ 이때 생성된 이벤트 객체 : 이벤트를 발생시킨
- ┣ `DOM 요소인 이벤트 타깃(event target)` 중심으로
- ┗ `DOM 트리를 통해 전파됨`

- 이벤트 전파 : 이벤트 객체가 전파되는
- ┗ `방향에 따라 다음과 같이 3단계로 구분 가능`

1. 캡처링 단계 : capturing phase

- ┣ 이벤트가 `상위 요소에서`
- ┗ `하위 요소 방향으로 전달`

2. 타깃 단계 : target phase

- ┣ 이벤트가 `이벤트 타깃에`
- ┗ `도달`

3. 버블링 단계 : bubbling phase

- ┣ 이벤트가 `하위 요소에서`
- ┗ `상위 요소 방향으로 전파`

- 다음과 같이 ul 요소에 이벤트 핸들러를
- ┣ 바인딩하고 ul 요소의 하위 요소인
- ┣ li 요소를 클릭하여
- ┣ 이벤트를 발생
- ┣ 이때 `이벤트 타깃 : li 요소`
- ┗ `커런트 타깃 : ul 요소`

```html
<body>
	<ul id="fruits">
		<li id="apple">Apple</li>
		<li id="banana">Banana</li>
		<li id="orange">Orange</li>
	</ul>
	<script>
		const $fruits = document.getElementById('fruits');

		// #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
		$fruits.addEventListener('click', (e) => {
			console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
			console.log(`이벤트 타깃: ${e.target}`); // [object HTMLElement]
			console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLListElement]
		});
	</script>
</body>
```

- `li 요소를 클릭`하면 :
- ┣ `클릭 이벤트가 발생`하여 →
- ┣ `클릭 이벤트 객체가 생성`되고
- ┗ `li 요소가 이벤트 타깃이 됨`

- 이때 클릭 이벤트 객체 : `window 에서 시작되어`
- ┣ `이벤트 타깃 방향으로 전파됨`
- ┣ 이것이 `캡쳐링 단계`

- ┣ 이후 이벤트 객체는
- ┣ `이벤트를 발생시킨 이벤트 타깃에 도달함`
- ┣ 이것이 `타겟 단계`

- ┣ 이후 이벤트 객체 : `이벤트 타깃에서 시작해서`
- ┣ `window 방향으로 전파됨`
- ┗ 이것이 `버블링 단계`

- `이벤트 핸들러 어트리뷰트/프로퍼티 방식`으로
- ┣ 등록한 이벤트 핸들러 :
- ┣ `1. 타깃 단계와 2. 버블링 단계의 이벤트만`
- ┣ 캐치가 가능함
- ┣ 하지만 `addEventListener 메서드 방식`으로
- ┣ 등록한 이벤트 핸들러 :
- ┣ `1. 타깃 단계와 2. 버블링 단계 뿐만 아니라`
- ┣ `3. 캡처링 단계의 이벤트도 선별적으로 캐치 가능`
- ┣ 캡처링 단계 이벤트 캐치 : `메서드 3번째 인수로`
- ┣ `true를 전달해야 함`
- ┣ 생략, false : 타깃 단계와 버블링 단계의 이벤트만
- ┗ 캐치가 가능함

- 위 예제 : 이벤트 핸들러
- ┣ 버블링 단계의 이벤트를 캐치함
- ┣ 만약 이벤트 핸들러가
- ┣ 캡처링 단계의 이벤트를 캐치하도록
- ┣ 설정되어 있디면
- ┣ 이벤트 핸들러 : window에서 시작해서
- ┣ `이벤트 타깃 바향으로 전파되는 이벤트 객체를 캐치하고`
- ┣ 이벤트를 발생시킨 이벤트 타깃과
- ┣ `이벤트 핸들러가 바인딩된 타깃이 같은 DOM 요소라면`
- ┗ `이벤트 핸들러는 타깃 단계의 이벤트 객체를 캐치함`

```html
<body>
	<ul id="fruits">
		<li id="apple">Apple</li>
		<li id="banana">Banana</li>
		<li id="orange">Orange</li>
	</ul>
	<script>
		const $fruits = document.getElementById('fruits');
		const $banana = document.getElementById('banana');
		// #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
		// 캡처링 단계의 이벤트를 캐치함
		$fruits.addEventListener('click', (e) => {
			console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
			console.log(`이벤트 타깃: ${e.target}`); // [object HTMLElement]
			console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLListElement]
		});

		// 타깃 단계의 이벤트를 캐치함
		$banana.addEventListener('click', (e) => {
			console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
			console.log(`이벤트 타깃: ${e.target}`); // [object HTMLElement]
			console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLListElement]
		});

		// 버블링 단계의 이벤트를 캐치함
		$fruits.addEventListener('click', (e) => {
			console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
			console.log(`이벤트 타깃: ${e.target}`); // [object HTMLElement]
			console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLListElement]
		});
	</script>
</body>
```

- 이처럼 이벤트 : 이벤트를 발생시킨
- ┣ 이벤트 타깃은 물론 상위 DOM 요소에서도
- ┣ 캐치가 가능함
- ┣ 즉 : `DOM 트리를 통해 전파되는 이벤트` :
- ┣ `이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로)`
- ┣ `Event.prototype.composePath` 메서드로
- ┣ 확인이 가능함)
- ┗ 에 위치한 `모든 DOM 요소에서 캐치가 가능함`

- 대부분의 이벤트 : 캡처링과 버블링을 통해 전파
- ┣ 하지만 `다음 이벤트는 버블링을 통해 전파 X`
- ┣ 이 이벤트 들은 버블링을 통해 이벤트를 전파하는지
- ┣ 여부를 나타내는 이벤트 객체의 공통 프로퍼티
- ┗ `event.bubbles`의 값이 `모두 false임`

1. 포커스 이벤트 : `focus/blur`

2. 리소스 이벤트 : `load/unload/abort/error`

3. 마우스 이벤트 : `mouseenter/mouseleave`

- 위 이벤트들은 버블링되지 않으므로 이벤트 타깃의
- ┣ 상위 요소에서 위 이벤트를 캐치하려면
- ┣ 캡처링 단계의 이벤트를 캐치해야함
- ┣ 하지만 위 이벤트를 상위 요소에서
- ┣ 캐치해야 할 겨우는 그리 많지 않지만
- ┣ 반드시 위 이벤트를 상위 요소에서 캐치해야
- ┗ 하는 경우 : `대체 가능한 이벤트가 존재함`

- `focusin/focusout, mouseover/mouseout` :
- ┣ 버블링을 통해 전파됨
- ┣ 따라서 캡처링 단계에서
- ┗ `이벤트를 캐치해야 할 경우는 거의 없음`

```html
<body>
	<p>버블링과 캡처링 이벤트 <button>버튼</button></p>
	<script>
		// 버블링 단계의 이벤트를 캐치
		document.body.addEventListener('click', () => {
			console.log('Handler for body');
		});

		// 캡처링 단계의 이벤트를 캐치
		document.querySelector('p').addEventListener(
			'click',
			() => {
				console.log('Handler fo paragraph');
			},
			true
		);

		// 버블링 단계의 이벤트를 캐치
		document.querySelector('button').addEventListener('click', () => {
			console.log('Handler for button');
		});
	</script>
</body>
```

- 위 예제 : `body, button 요소는`
- ┣ `버블링 단계의 이벤트만 캐치하고`
- ┣ `p 요소 : 캡처링 단계의 이벤트만 캡쳐함`
- ┣ 이벤트 : `캡처링 - 타깃 - 버블링 단계로`
- ┣ 전파되므로
- ┣ 만약 버튼 요소에서 클릭 이벤트가 발생하면
- ┣ 먼저 캡처링 단계를 캐치하는 p 요소의 이벤트 핸들러 호출
- ┣ 그후 버블링 단계의 이벤트를 캐치하는 button, body 요소의
- ┣ 이벤트 핸들러가 순차적으로 호출됨
- ┗ 다음과 같이 출력

1. paragraph
2. button
3. body

- 만약 p 요소에서 클릭 이벤트가 발생하면
- ┣ 캡처링 단계를 캐치하는 `p 요소의 이벤트 `
- ┣ 핸들러가 호출되고 버블링 단계를 캐치하는
- ┣ `body 요소의 이벤트 핸들러가 순차적으로`
- ┗ 호출됨

1. paragraph
2. body

## 40.7 이벤트 위임

- 사용자가 내비게이션 아이템
- ┣ li 요소를 클릭하여 선택하면
- ┣ 현재 선택된 내비게이션 아이템에
- ┣ active 클래스를 추가하고
- ┣ 그 외의 모든 네비게이션 아이템의
- ┗ active 클래스는 제거하는 예제

```html
<html>
	<head>
		<style>
			#fruits {
				display: flex;
				list-style-type: none;
				padding: 0;
			}
			#fruits li {
				width: 100px;
				cursor: pointer;
			}
			#fruits .active {
				color: red;
				text-decoration: underline;
			}
		</style>
	</head>
	<body>
		<nav>
			<ul id="fruits">
				<li id="apple">Apple</li>
				<li id="banana">Banana</li>
				<li id="orange">Orange</li>
			</ul>
		</nav>
		<div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
		<script>
			const $fruits = document.getElementById('fruits');
			const $msg = document.querySelector('.msg');

			// 사용자 클릭에 의해 선택된 내비게이션 아이템(li)요소에
			// active 클래스를 추가하고
			// 그 외의 모든 내비게이션 아이템의
			// active 클래스를 제거함
			function activate({ target }) {
				[...$fruits.children].forEach(($fruit) => {
					$fruit.classList.toggle('active', $fruit == target);
					$msg.textContent = target.id;
				});
			}

			// 모든 내비에게이션 아이템에 이벤트 핸들러를 등록함
			document.getElementById('apple').onclick = activate;
			document.getElementById('banana').onclick = activate;
			document.getElementById('orange').onclick = activate;
		</script>
	</body>
</html>
```
