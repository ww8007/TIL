# 39. DOM

- 38.3 HTML 파싱과 DOM 생성에서 살펴본 바와 같이
- ┣ 브라우저의 렌더링 엔진은 HTML 문서를 파싱하여
- ┣ 브라우저가 이해할 수 있는 자료구조인 DOM을 생성함

- ┣ `DOM(Document Object Model)` : HTML 문서의
- ┣ 계층적 구조와 정보를 표현하며 이를 제어할 수 있는
- ┣ `API, 즉 프로퍼티와 메서드를 제공하는`
- ┗ `트리 자료구조임`

## 39.1 노드

### 39.1.1 HTML 요소와 노드 객체

- HTML 요소(HTML element) : HTML 문서를 구성하는
- ┗ 개별적인 요소를 의미함

```html
<div class="greeting">Hello</div>
```

- HTML 요소 :
- ┣ 렌더링 엔진에 의해 파싱되어
- ┣ HTML을 구성하는 요소 노드 객체로 변환됨
- ┣ 이때 `HTML 요소의 어트리뷰트` :
- ┣ 1. `어트리뷰트 노드`
- ┣ 2. `HTML 요소의 텍스트 콘텐츠`
- ┗ 3. `텍스트 노드`로 변환됨

- 요소 노드 : `div`
- ┣ 어트리뷰트 노드 : `class="greeting"`
- ┗ 텍스트 노드 : `"Hello"`

- HTML 문서 : HTML 요소의 집합으로 이루어짐
- ┣ HTML 요소 → `중첩 관계를 가짐`
- ┣ 즉 : HTML 요소의 콘텐츠 영역
- ┣ (시작 태그와 종료 태그 사이)에는
- ┗ `텍스트뿐만 아니라 다른 HTML 요소도 포함 가능함`
- 이때 HTML 요소 간에는 중첩 관계에 의해서
- ┣ `계층적인 부자(parent-child)` 관계가 형성됨
- ┣ 이러한 HTML 요소 간의 부자 관계를 반영하여
- ┣ HTML 문서의 구성 요소인 HTML 요소를 객체화한
- ┗ `모든 노드 객체들을 트리 자료 구조로 구성함`

### 트리 자료구조

- 트리 자료구조(tree data structure) :
- ┣ 노드들의 계층 구조로 이루어짐
- ┣ 즉 : 트리 자료구조는
- ┣ 1. `부모 노드(parent node)`
- ┣ 2. `자식 노드(child node)`로 구성되어
- ┣ 노드 간의 계층적 구조(부자, 형제 관계)를
- ┣ `표현하는 비선형 자료구조를 말함`

- ┣ 트리 자료구조 :
- ┣ `트리 자료구조는 하나의 최상위 노드에서 시작함`
- ┣ 최상위 노드 : 부모 노드가 없으며
- ┣ `루트 노드(root node)라고 부름`
- ┣ 루트 노드는 0개 이상의 자식 노드를 가짐
- ┗ `자식 노드가 없는 노드 → 리프 노드(leaf node)`

- 노드 객체들로 구성된 트리 자료구조 :
- ┣ `DOM(Document Object Model)`이라고 함
- ┣ 노드 객체의 트리로 구조화되어 있기 때문에
- ┗ `DOM을 → DOM 트리라고 부름`

### 39.1.2 노드 객체의 타입

> 공백 텍스트 노드

    HTML 요소 사이의 개행이나
    ┣ 공백의 경우 :
    ┗ 텍스트 노드가 됨

- 이처럼 `DOM` :
- ┣ 노드 객체의 계층적인 구조로
- ┣ 구성이 됨
- ┣ `노드 객체는 종류가 있고`
- ┣ `상속 구조를 가짐`
- ┗ `노드 객체 : 총 12개의 종류(노드 타입) 존재`

> 중요한 노드 타입

#### 문서 노드(document node)

- 문서 노드 :
- ┣ DOM 트리의 최상위에 존재하는
- ┣ 루트 노드로서 document 객체를 가리킴
- ┣ `document 객체` : `브라우저가 렌더링한`
- ┣ HTML 문서 전체를 가리키는 객체로서
- ┣ `전역 객체(window, document) 프로퍼티가`
- ┣ `바인딩 되어 있음`
- ┗ `따라서 → 문서 노드 window.document, document로 참조`

- 브라우저의 환경의 모든 JS 코드
- ┣ `script` 태그에 분리되어 있어도
- ┣ `하나의 전역 객체 window를 공유하게 됨`
- ┣ 따라서 `모든 JS 코드` : 전역 객체 window의
- ┣ `document 프로퍼티에 바인딩 되어 있는`
- ┗ `하나의 document 객체를 바라봄`

> HTML 문서당 document 객체는 유일함

- 문서 노드 :
- ┣ 즉 → document 객체는
- ┣ DOM 트리의 루트 노드이므로
- ┣ `DOM 트리의 노드들에 접근하기 위한`
- ┣ `진입점(entry point) 역할을 함`
- ┣ 즉 : 1. `요소`, 2. `어트리뷰트`, 3. `텍스트 노드`
- ┗ 접근하기 위해서는 문서 노드를 통해야 함

#### 요소 노드(element node)

- 요소 노드 : HTML 요소를 가리키는 객체임
- ┣ `요소 노드는 HTML 요소 간의 중첩에 의해`
- ┣ `부자 관계를 가지며 `
- ┣ 이 부조가 관계를 통해 정보를 구조화함
- ┗ 따라서 → `요소 노드 : 문서의 구조를 표현함`

#### 어트리뷰트 노드(attribute node)

- 어트리뷰트 노드 :
- ┣ `HTML 요소의 어트리뷰트를 가리키는 객체임`
- ┣ 어트리뷰트 노드는 어트리뷰트가 지정된
- ┣ `HTML 요소의 요소 노드와 연결되어 있음`
- ┣ 단 : 요소 노드 → 부모 노드와 연결되어 있지만
- ┣ `어트리뷰트 노드는 부모 노드와 연결되어 있지 않고`
- ┣ `요소 노드에만 연결되어 있음`

- 즉 : `어트리뷰트 노드` :
- ┣ 부모 노드가 없으므로 `노드의 형제(sibling) 노드는 아님`
- ┣ 따라서 어트리뷰트 노드에 어트리뷰트를 참조, 변경
- ┗ 하기 위해서는 `먼저 요소 노드에 접근해야 함`

#### 텍스트 노드(text node)

- 텍스트 노드 : HTML 요소의 텍스트를 가리키는 객체
- ┣ 요소 노드가 문서의 구조를 표현 한다면
- ┣ `텍스트 노드 → 문서의 정보를 표현함`
- ┣ 텍스트 노드 : 1. `요소 노드의 자식 노드`이며
- ┣ 2. `자식 노드를 가질 수 없는 리프 노드(leaf node)`
- ┣ 즉 : 텍스트 노드 → DOM 트리의 최종단임
- ┗ 따라서 : `텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드 접근`

- 외에에도
- ┣ 1. `주석을 위한 Comment 노드`
- ┣ 2. `DOCTYPE을 위한 DocumentType 노드`
- ┣ 3. `복수의 노드를 추가 생성 DocumentFragment`
- ┗ 총 12가지 존재 이는 39.6.4 에서 학습

### 39.1.3 노드 객체의 상속 구조

- DOM : 1. `HTML 문서의 계층적 구조와`
- ┣ `정보를 표현`하며
- ┣ 2. 이를 제어할 수 있는 `API`
- ┣ 즉 : `프로퍼티와 메서드를 제공하는`
- ┗ `트리 자료구조임`

- 즉 : DOM을 구성하는 노드 객체 :
- ┣ 자신의 구조와 정보를 제어할 수 있는
- ┣ `DOM API를 사용할 수 있음`
- ┣ 이를 통해 노드 객체는
- ┣ 1. `자신의 부모, 형제, 자식을 탐색이 가능하고`
- ┗ 2. `자신의 어트리뷰트, 텍스트 조작이 가능함`

- DOM을 구성하는 노드 객체 :
- ┣ ECMAScript 사양에 정의된
- ┣ `표준 빌트인 객체(standard built-in objects)`가
- ┣ 아닌 브라우저 환경에서 추가적으로 제공하는
- ┣ `호스트 객체(host objects)`
- ┣ 하지만 `노드 객체도 JS 객체이기 때문에`
- ┗ `프로토타입에 의한 상속 구조를 가짐`

- `모든 노드 객체` :
- ┣ `Object`, `EventTarget`, `Node` 인터페이스를
- ┣ 상속받게됨

- ┣ `문서 노드` :
- ┣ `Document`, `HTMLDocument` 인터페이스 상속

- ┣ `어트리뷰트 노드` : `Attr`
- ┗ `텍스트 노드` : `CharacterData` 인터페이스를 상속

- ┣ `요소 노드` : `Element` 인터페이스 상속
- ┣ 요소 노드는 추가적으로
- ┣ HTMLElement 태그의 종류벌로 세분화 된
- ┣ 1. `HTMLHtmlElement`
- ┣ 2. `HTMLHeadElement`
- ┣ 3. `HTMLBodyElement`
- ┣ 4. `HTMLUListElement`
- ┗ 등의 인터페이스를 상속받음

- 이를 프로토타입 체인 관점에서 살펴보면
- ┣ Ex) input 요소를 파싱하여 객체화한
- ┣ input 요소 노드 객체는
- ┣ 1. `HTMLInputElement`
- ┣ 2. `HTMLElement`
- ┣ 3. `Element`
- ┣ 4. `Node`
- ┣ 5. `EventTarget`
- ┣ 6. `Object의 prototype에 바인딩되어 있는`
- ┣ `프로토타입 객체를 상속`받음
- ┣ 즉 : input 요소 노드 객체는 프로토타입 체인에 있는
- ┗ `모든 프로토타입의 프로퍼티나 메서드를 상속 받아 사용가능`

> 배열이 객체인 동시에 배열인 것 처럼

    input 요소 객체도
    ┣ 다음과 같이 다양한
    ┣ 특성을 가지는 객체이며
    ┣ 이러한 특성을 나타내는
    ┗ 기능들을 상속받음

| input 요소 노드의 객체의 특성                                                     | 프토토타입을 제공하는 객체 |
| --------------------------------------------------------------------------------- | -------------------------- |
| 객체                                                                              | `Object`                   |
| 이벤트를 발생시키는 객체                                                          | `EventTarget `             |
| 트리 자료구조의 노드 객체                                                         | `Node `                    |
| 브라우저가 렌더링할 수 있는 웹 문서의 요소 <br/> (HTML, XML, SVG)를 표현하는 객체 | `Element `                 |
| 웹 무서의 요소 중에서 HTML을 표현하는 객체                                        | `HTMLElement `             |
| HTML 요소 중에서 input 요소를 표현하는 객체                                       | `HTMLInputElement `        |

> 노드 객체의 상속 구조

    개발자 도구의 Elements
    ┗ 패널 우측의 Properties 패널 확인

- 노드 객체 : 노드 객체의 종류
- ┣ 즉 : 노드 타입에 상관없이
- ┣ `모든 노드 객체가 공통으로 갖는 기능`,
- ┣ `노드 타입에 따라 고유한 기능도 있음`

- ┣ Ex) 모든 노드 객체는
- ┣ 공통적으로 이벤트를 발생시킬 수 있음
- ┣ 이벤트 관련된 기능
- ┣ 1. `EventTarget.addEventListener`
- ┣ 2. `EventTarget.removeEventListener`
- ┗ 들은 EventTarget 인터페이스가 제공함

- 또한 모든 노드 객체 :
- ┣ 트리 자료구조의 노드로서
- ┣ 공통적으로 `트리 탐색 기능`
- ┣ 1. `Node.parentNode`
- ┣ 2. `Node.childNodes`
- ┣ 3. `Node.previousSibling`
- ┣ 4. `Node.nextSibling`
- ┣ 이나 `노드 정보 제공 기능`
- ┣ 1. `Node.nodeType`
- ┣ 2. `Node.nodeName`
- ┗ 이와 같은 `정보는 Node 인터페이스가 제공함`

- HTML 요소가 객체화된 요소 노드 객체는
- ┣ HTML 요소가 갖는 공통적인 기능이 있음
- ┣ Ex) `input 요소 노드 객체와`
- ┣ `div 요소 노드 객체` :
- ┣ 모두 HTML 요소의 스타일을 나타내는
- ┣ `style 프로퍼티가 존재함`
- ┣ 이처럼 HTML 요소가 갖는 공통적인 기능들
- ┗ `HTMLElement 인터페이스가 제공함`

> 하지만 고유한 기능도 존재

    div 요소 노드 : value X
    ┣ input : value 필요
    ┣ HTMLInputElement
    ┗ HTMLDivElement 다른 이유

- 이처럼 노드 객체 :
- ┣ `공통된 기능일수록`
- ┣ `프로토타입 체인의 상위`
- ┣ `고유한 기능`일수록
- ┣ `프로토타입 체인의 하위에`
- ┗ `프로토타입 체인을 구축함`

- 지금까지 살펴본 바와 같이
- ┣ DOM : HTML 문서의 계층적 구조와
- ┣ 정보를 표현하는 것은 물론 노드 객체의 종류
- ┣ 즉 : `노드 타입에 따라 필요한 기능을`
- ┣ `프로퍼티와 메서드의 집합인`
- ┣ `DOM API(Application Programming Interface)`로
- ┣ 제공하게 됨
- ┣ 이 `DOM API를 통해 → HTML 구조나 내용 또는 스타일 동적으로`
- ┗ 조작이 가능함

- DOM API를 사용하기 위해
- ┣ 지금까지 살펴본 노드 객체의 상속 구조를
- ┣ 자세히 알아야 할 필요성은 없음
- ┗ 모르더라도 사용이 가능함

- 중요점 :
- ┣ DOM이 제공하는
- ┣ 1. `프로퍼티`, 2. `메서드를 사용`하여
- ┣ `노드에 접근하고 `
- ┣ `HTML의 구조나 내용 또는 스타일 등을`
- ┣ `동적으로 변경하는 방법을 익히는 것`
- ┣ 프런트앤드 개발자에게 HTML이란
- ┣ 단순히 태그와 어트리뷰트를 선언적으로
- ┣ 배치하여 뷰를 구성하는 것 이상의 의미를 가짐
- ┗ 즉 : `HTML을 DOM과 연관 지어 바라보야함`

## 39.2 요소 노드 취득

- HTML의 구조나 내용 또는 스타일 등을
- ┣ 동적으로 조작하려면
- ┣ 1. 먼저 요소 노드를 취득해야 함
- ┣ `텍스트 노드` : `요소 노드의 자식 노드`
- ┣ `어트리뷰트 노드` : 요소 노드와 연결되어 있음
- ┣ `텍스트 노드나 어트리뷰트 노드를 조작하고자 할 때도`
- ┗ 마찬가지임

- 예를 들어 문서 내의 h1 요소의
- ┣ 텍스트를 변경하고 싶은 경우
- ┣ 이 경우 먼저 DOM 트리 내에 존재하는
- ┣ `h1 요소 노드를 취득할 필요성이 있음`
- ┣ 그리고 취득한 요소 노드의 자식 노드인
- ┗ `텍스트 노드를 변경하면 해당 h1 요소의 텍스트가 변경됨`

> 이처럼 요소 노드의 취득 :

    HTML 요소를 조작하는 시점
    ┣ 이를 위해 DOM은
    ┣ 요소 노드를 취득할 수 있는
    ┗ 다양한 메서드를 제공함

### 39.2.1 id를 이용한 요소 노드 취득

- `Document.prototype.getElementById` 메서드 :
- ┣ 인수로 전달한 id 어트리뷰트 값(이하 id 값)을
- ┣ 갖는 `하나의 요소 노드를 탐색하여 반환함`
- ┣ getElementById 메서드 : `Document.prototype`의
- ┣ 프로퍼티임
- ┗ 따라서 → `반드시 문서 노드인 document를 통해 호출함`

```html
<script>
	// id 값이 "banana"인 요소 노드를 탐색하여 반환함
	// 두 번째 li 요소가 파싱되어 생성된 노드가 반환됨
	const $elem = document.getElementById('banana');

	// 취득한 요소 노드의 style.color 프로퍼티 값을
	// 변경함
	$elem.style.color = 'red';
</script>
```

- `id 값` : `HTML 문서 내의 유일한 값`
- ┣ class 어트리뷰트와 달리
- ┣ `공백 문자로 구분하여 여러 개의 `
- ┣ `값을 가질 수 없음`
- ┣ 단 : HTML 문서 내의 `중복된 id 값을 가지는`
- ┣ `HTML 요소가 존재한다 하더라도`
- ┗ `어떠한 에러도 발생하지 않음`

> 이러한 경우

    인수로 전달된 id 값을
    ┣ 가지는 첫 번째 요소 노드만
    ┣ 반환을 진행함
    ┣ 즉 : 언제나 단 하나의
    ┗ 요소 노드를 반환함

- 만약 인수로 전달된 id 값을 가지는
- ┣ `HTML 요소가 존재하지 않는 경우`
- ┣ getElementById 메서드 :
- ┗ `null을 반환함`

- HTML 요소에 `id 어트리뷰트를 할당`하면
- ┣ 1. `id 값과 동일한 이름의 전역 변수가`
- ┣ `암묵적으로 선언되고`
- ┗ 2. `해당 노드 객체가 할당되는 부수 효과가 있음`

```html
<html>
	<div id="foo"></div>
	<script>
		// id 값과 동일한 이름의 전역 변수가
		// 암묵적으로 선언되고
		// 해당 노드 객체가 할당됨
		console.lg(foo === document.getElementById('foo')); // true

		// 암묵적으로 생성된 전역 프로퍼티는
		// 삭제되지만
		// 전역 변수는 삭제 되지 않음
		delete foo;
		console.log(foo); // <div id="foo"></div>
	</script>
</html>
```

- 단 : `id 값과 동일한 이름의 전역 변수가`
- ┣ `이미 선언되어 있으면`
- ┣ 이 전역 변수에 `노드 객체가 재할당`
- ┗ `되지 않음`

```html
<html>
	<div id="foo"></div>
	<script>
		let foo = 1;

		// id 값과 동일한 이름의 전역변수가
		// 이미 선언되어 있으면
		// 노드 객체가 재할당 되지 않음
		console.log(foo); // 1
	</script>
</html>
```

### 39.2.2 태그 이름을 이용한 요소 노드 취득

- `Document.prototype/Element.prototype.getElementByTagNae`
- ┣ 메서드 : 인수로 전달된 태그 이름을 갖는
- ┣ 모든 요소 노드들을 탐색하여 반환함
- ┣ 메서드 이름에 포함된 Elements가 복수형인 것에서 알 수 있듯
- ┣ 여러 개의 요소 노드 객체를 갖는
- ┗ `DOM 컬렉션인 HTMLCollection 객체를 반환함`

```html
<html>
	<body>
		<ul>
			<li id="apple">Apple</li>
			<li id="banana">Banana</li>
			<li id="orange">Orange</li>
		</ul>
		<script>
			// 태그 이름이 li인 요소 노드들을
			// 모두 탐색하여 반환함
			// 탐색된 요소 노드들은 HTMLCollection
			// 객체에 담겨 반호나됨
			// HTMLCollection 객체 :
			// 유사 배열 객체이면서 이터러블임
			const $elements = document.getElementsByTagName('li');

			// 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경함
			// HTMLCollection 객체를 배열로 변환하여 순회하며
			// color 프로퍼티 값을 변경함
			[...$elements].forEach((elem) => {
				elem.style.color = 'red';
			});
		</script>
	</body>
</html>
```

- 함수 : 하나의 값만 반환이 가능하므로
- ┣ 여러 개의 값을 반환하려면
- ┣ 배열이나 객체와 같은 자료구조에 담아서
- ┣ 반환해야 함
- ┣ `getElementByTagName` 메서드가 반환하는
- ┣ `DOM 컬렉션 객체인 HTMLCollection 객체는`
- ┗ `유사 배열인 객체이면서 이터러블임`

- HTML 문서의 모든 요소 노드를 취득하려면
- ┣ getElementsByTagName 메서드의 인수로
- ┗ `('*')` 를 전달함

- getElementsByTagName 메서드 :
- ┣ `Document.prototype에 정의된 메서드`와
- ┣ `Element.prototype에 정의된 메서드`가 있음
- ┣ `Document.prototype.getElements 메서드` :
- ┣ DOM의 루트 노드인 문서 노드
- ┣ `즉 : document를 통해 호출하여`
- ┣ `DOM 전체에서 요소 노드를 탐색하여 반환함`
- ┣ 하지만 `Element.prototype.getElementsByTagName 메서드`
- ┣ `특정 요소 노드를 통해 호출하여`
- ┣ 특정 노드의 자식 노드 중에서
- ┗ `요소 노드를 탐색하여 반환함`

> 만약 인수로 전달된 태그 이름

    가지는 요소가 존재 않하는 경우
    ┣ getElementsByTagName 메서드
    ┗ 빈 HTMLCollection 객체를 반환

### 39.2.3 class를 이용한 요소 노드 취득

- `Document.prototype/Element/prototype.getElementsByClassName`
- ┣ 메서드 : 인수로 전달한 class 어트리뷰트 값(이하 class)을 갖는
- ┣ `모든 요소 노드들을 탐색하여 반환함`
- ┣ `인수로 전달할 class 값은 공백으로 구분하여`
- ┣ `여러 개의 class를 지정할 수 있음`
- ┣ getElementsByTagName 메서드와 마찬가지로
- ┣ 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인
- ┗ `HTMLCollection 객체를 반환함`

> getElementsByTagName과 동일

    Element, document 구분함
    ┣ 목록이 없을 경우
    ┗ 빈 HTMLCollection 객체 반환

### 39.2.4 CSS 선택자를 이용한 요소 노드 취득

- `CSS 선택자(selector)` :
- ┣ 스타일을 적용하고자 하는
- ┗ `HTML 요소를 특정할 때 사용하는 문법`임

```js
/* 전체 선택자 : 모든 요소를 선택 */
* {...}
/* 태그 선택자 : 모든 p 태그 요소를 선택 */
p {...}
/* id 선택자 : id 값이 'foo'인 모든 요소를 선택 */
#foo {...}
// class 선택자 : class 값이 foo 인 요소를 모두 선택
.foo {...}
// 어트리뷰트 선택자 : input 요소 중에
// type 어트리뷰트 값이 'text'인 요소를 모두 선택
input[type=text] {...}
// 후손 선택자: div 요소의 후손 요소 중
// p 요소를 모두 선택
div p {...}
// 자식 선택자 : div 요소의 자식 요소 중
// p 요소를 모두 선택
div > p {...}
// 인접 형제 선택자 : p 요소의 형제 요소 중
// p 요소 바로 뒤에 위치하는 ul 요소를 선택
p + ul {...}
// 일반 형제 선택자 : p 요소의 형제 요소 중에
// p 요소 뒤에 위치하는 ul 요소를 모두 선택
p ~ ul {...}
// 가상 클래스 선택자 : hover 상태인
// a 요소를 모두 선택
a:hover { ...}
// 가상 요소 선택자 : p 요소의 콘텐츠 앞에
// 위치하는 공간을 선태
// 일반적으로 content 프로퍼티와 함께 상요됨
p::before{...}
```

- `Document.prototype/Element.prototype.querySelector`
- ┣ 메서드 : 인수로 전달한 CSS 선택자를 하나의 요소 노드를
- ┗ 탐색하여 반환함

1. 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가

- ┗ 여러 개인 경우 첫 번째 요소 노드만 반환함

2. 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가

- ┗ 존재하지 않는 경우 null을 반환함

3. 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우

- ┗ DOMException 에러가 발생함

- `Document.prototype/Element.prototype.querySelectorAll`
- ┣ 메서드 : 인수로 전달한 CSS 선택자를 만족 시키는
- ┣ 모든 요소 노드를 타맥하여 반환함
- ┣ 여러 개의 요소 노드 객체를 갖는
- ┣ DOM 컬렉션 객체인 NodeList 객체를 반환함
- ┗ `NodeList 객체 : 유사 배열 객체이면서 이터러블임`

> 인수로 전달한 CSS 선택자

    문법에 맞지 않는 경우 :
    ┗ DOMException 에러 발생

```html
<html>
	<body>
		<ul>
			<li class="apple">Apple</li>
			<li class="banana">Banana</li>
			<li class="orange">Orange</li>
		</ul>
		<script>
			// ul 요소의 자식 요소인
			// li 요소를 모두 탐색하여 반환함
			const $elements = document.querySelectorAll('ul > li');

			// 취득한 모든 요소 노드들은 NodeList 객체에
			// 담겨서 반환됨
			console.log($elements); // NodeList(3) [li.apple, li.banana, li.orange]

			// 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경
			// NodeList는 forEach 메서드를 제공함
			$elements.forEach((elem) => {
				elem.style.color = 'red';
			});
		</script>
	</body>
</html>
```

> getElementsByTagName과 동일

    Element, document 구분함
    ┗ 모든 선택자 선택 (*)

- CSS 선택자 문법을 사용하면
- ┣ `속도가 다소 느린것으로 알려져 있음`
- ┣ 하지만 1. `일관된 방식으로 요소 노드를 취하는 것과`
- ┣ 2. `구체적인 조건으로 요소 노드를 취하는 것은`
- ┣ 장점으로 존재함
- ┣ `따라서 id 어트리뷰트가 있는 요소 노드를 취하는 경우`
- ┣ `getElementById 사용 하고 그 외 →`
- ┗ `querySelector, querySelectorAll 사용 권장`

### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

- `Element.prototype.matches` 메서드
- ┣ 인수로 전달한 CSS 선택자를 통해
- ┗ 특정 요소 노드를 취득할 수 잇는지 확인함

- `이벤트를 위임을 사용할 때 유용함`

### 39.2.6 HTMLCollection과 NodeList

- DOM 컬렉션 객체인 `HTMLCollection`과
- ┣ `NodeList`는 DOM API가 여러 개의 결과 값을
- ┣ 반환하기 위한 DOM 컬렉션 객체인
- ┣ `모두 유사 배열객체 이면서 이터러블임`
- ┣ `따라서 for...of 문으로 순회가 가능하며`
- ┗ `스프레드 문법을 사용해서 간단히 배열로 변환 가능`

#### HTMLCollection

- `getElementByTagName`
- ┣ `getElementsByClassName`
- ┣ 메서드가 반환하는 HTMLCollection 객체는
- ┣ `노드 객체의 상태 변화를 실시간으로 반영하는`
- ┣ 살아있는 DOM 컬렉션 객체임
- ┣ `따라서 HTMLCollection 객체를 살아 있는`
- ┗ 객체라고 함

```html
<html>
	<body>
		<ul>
			<li class="red">Apple</li>
			<li class="red">Banana</li>
			<li class="red">Orange</li>
		</ul>
		<script>
			// class 값이 'red'인 모든 요소 노드를 탐색하여
			// HTMLCollection 객체에 담아 반환한다.
			const $elements = document.getElementsByClassName('red');

			console.log($elements); // NodeList(3) [li.red, li.red, li.red]

			// HTMLCollection 객체의 모든 요소의 class 값을
			// blue로 변경함
			// NodeList는 forEach 메서드를 제공함
			for (let i = 0; i < $elements.length; i++) {
				$elements[i].className = 'blue';
			}

			// HTMLCollection 객체의 요소가 3개에서
			// 1개로 변경되었음
			console.log($elements); // HTMLCollection(1) [li.red]
		</script>
	</body>
</html>
```

- 하지만 우리 생각대로 동작하지 않음

1. 첫번째 반복

- ┣ `$elem[0]은 첫 번째 li 요소임`
- ┣ 이 요소는 className 프로퍼티에 의해
- ┣ class 값이 'red'에서 'blue'로 변경됨
- ┣ 이때 첫 번째 li 요소는 class 값이
- ┣ 'red'에서 'blue'로 변경되었으므로
- ┣ `실시간으로 $elements에서 제거됨`
- ┣ 이처럼 HTMLCollection 객체 :
- ┣ `실시간으로 노드 객체의 상태 변경을 반영하는`
- ┗ `살아있는 live DOM 컬렉션 객체임`

2. 두 번째 반복

- 첫 번째 반복에서 첫 번째 li 요소
- ┣ elements에서 제거되었음
- ┣ 따라서 elements에는 두 번째 li 요소 노드만을
- ┣ 남겨 두었음
- ┣ `이로써 $elements[1] : 3번째 요소임`
- ┣ `고로 HTMLCollection 객체에서 제거가 이루어짐`
- ┣ `이때 $elements.length 요소가 for문의 조건문`
- ┣ `i < $elements.length가 false로 평가되기 때문에`
- ┗ `for 문 실행이 종료됨`

> 이 문제는 for 문을 역방향으로 순회하는

    방법을 이용하여 회피가 가능함

```js
// for문을 역방향으로 순회
for (let i = $elements.length - 1; i >= 0; i--) {
	$elements[i].className = 'blue';
}
```

- 또는 while 문을 사용하여 HTMLCollection에
- ┣ `노드 객체가 남아있지 않을 때 까지`
- ┗ `무한 반복을 하는 경우도 존재함`

```js
// while 문으로 HTMLCollection에
// 요소가 남아 있지 않을 때 까지
// 무한 반복함
let i = 0;
while ($elements.length > i) {
	$elements[i].className = 'blue';
}
```

- 더 간단한 해결책 :
- ┣ 문제를 일으키는 HTMLCollection 객체를
- ┣ 사용하지 않는 방법
- ┣ `이를 배열로 변환하면`
- ┣ `부작용이 없고`
- ┗ `배열 고차 함수를 사용이 가능함`

```js
// 유사 배열 객체이면서 이터러블인
// HTMLCollection을 배열로 변환하여 순회
[...$elements].forEach((elem) => (elem.className = 'blue'));
```

#### NodeList

- HTMLCollection 객체의 부작용을 해결하기 위해
- ┗ `querySelectorAll 메서드를 사용하는 방법도 존재함`

- `querySelectorAll 메서드` :
- ┣ `DOM 컬렉션 객체인 NodeList 객체를 반환함`
- ┣ 이때 NodeList 객체는 실시간으로 노드 객체의
- ┗ `상태를 변경하지 않는 non-live 객체임`

```js
// querySelectorAll :
// DOM 컬렉션 객체인 NodeList를 반환함
const $elems = document.querySelectorAll('red');

// NodeList 객체 :
// NodeList.prototype.forEach 메서드를 상속받아 사용 가능
$elemes.forEach((elem) => (elem.className = 'blue'));
```

- `childNodes 프로퍼티가 반환하는`
- ┣ `NodeList 객체는 HTMLCollection 객체와 같이`
- ┣ 실시간으로 노드 객체의 상태를 변경하는
- ┣ `live 객체로 동작하므로`
- ┗ 주의가 필요함

- 따라서 : 안전하게 DOM 컬렉션을 사용하려면
- ┣ 배열로 변환하여 사용하는 것을 권장함
- ┗ `다양한 배열 고차 함수 사용 가능함`

- `HTMLCollection과 NodeList 객체`
- ┣ 모두 유사 배열이면서 이터러블임
- ┣ `고로 스프레드 문법, Array.from 메서드를 사용하여`
- ┗ `간단하게 배열로 변환이 가능함`

```js
const { childNodes } = $fruits;

// 스프레드 문법을 사용하여
// NodeList 객체를 배열로 변환함
[...childNodes].forEach((childNode) => {
	$fruits.removeChild(childNode);
});
```

## 39.3 노드 탐색

- 요소 노드를 취득한 다음
- ┣ `취득한 요소 노드를 기점으로`
- ┣ DOM 트리의 노드를 옮겨 다니며
- ┣ 부모, 형제, 자식 노드 등을 탐색해야
- ┗ `(traversing node walking)` 해야 할 때가 있음

```html
<ul id="fruits">
	<li class="apple">Apple</li>
	<li class="banana">Banana</li>
	<li class="orange">Orange</li>
</ul>
```

- `ul#fruits` 요소 :
- ┣ 3개의 자식 요소를 가짐
- ┣ 이때 먼저 ul#fruits 요소 노드를 취득한 다음
- ┣ 자식 노드를 모두 탐색하거나
- ┣ 자식 노드 중 하나만 탐색이 가능함
- ┣ `li.banana1` 요소 : 1. `2개의 형제 요소`와
- ┣ 2. `부모 요소를 갖는다.`
- ┣ `li.banana 요소 노드를 취득한 다음`

- ┣ 형제 노드나 부모 노드를 탐색이 가능함
- ┣ 이처럼 DOM 트리 상의 노드를 탐색할 수 있도록
- ┣ `Node, Element 인터페이스는`
- ┗ `트리 탐색 프로퍼티를 제공함`

- parentNode, previousSibling, firstChild
- ┣ 프로퍼티 : Node.prototype이 제공
- ┣ 프로퍼티 키에 Element가 포함된
- ┣ 1. `previousElementSibling`
- ┣ 2. `next ElementsSibling`
- ┣ 3. `children 프로퍼티` :
- ┗ `Element.prototype이 제공함`

- `노드 탐색 프로퍼티` :
- ┣ `모두 접근자 프로퍼티임`
- ┣ 단 : 노드 탐색 프로퍼티는
- ┣ setter 없이 getter만 존재하여
- ┣ 참조만 가능한 읽기 전용 접근자 프로퍼티임
- ┗ `읽기 전용 값 할당 → 에러 없이 무시됨`

### 39.3.1 공백 텍스트 노드

- 지금까지 언급하지 않았지만 HTML 요소 사이의
- ┣ `스페이스`, `탭`, `줄바꿈(개행)`등의 `공백`
- ┣ `(white space)` 문자는
- ┣ 텍스트 노드를 생성함
- ┗ 이를 공백 텍스트 노드라고 함

- 텍스트 에디터에서 HTML 문서에
- ┣ 1. 스페이스
- ┣ 2. 탭
- ┣ 3. 엔터 키 등을 입력하면
- ┗ `공백 문자가 추가됨`
- 이처럼 HTML 문서의 공백 문자는
- ┣ 공백 텍스트 노드를 생성함
- ┣ 따라서 `노드를 탐색할 때는`
- ┣ `공백 문자가 생성한 공백 텍스트 노드에`
- ┣ `주의를 해야함`
- ┣ 다음과 같이 인위적으로 HTML 문서의
- ┣ 공백 문자를 제거하면
- ┣ 공백 텍스트 노드를 생성하지 않음
- ┗ `하지만 가독성이 좋지 않으므로 권장 X`

### 39.3.2 자식 노드 탐색

- 자식 노드를 탐색하기 위해서는
- ┗ 다음과 같은 `노드 탐색 프로퍼티를 사용함`

| 프로퍼티                             | 설명                                                                                                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Node.prototype.childNodes`          | 자식 노드를 모두 탐색하여 DOM 컬렉션 객체인 NodeList에 담아 <br /> 반환함. childNodes 프로퍼티가 반환한 NodeList에는 요소 <br/> 노드뿐만 아니라 텍스트 노드도 포함되어 있을 수 있음 |
| `Element.prototype.children`         | 자식 노드 중에서 요소 노드만 모두 탐색하여 DOM 컬렉션 객체인 <br/> HTMLCollection에 담아 반환함 children 프로퍼티가 반환한 <br/> HTMLCollection에는 텍스트 노드가 포함되지 않음     |
| `Node.prototype.firstChild`          | 첫 번째 자식 노드를 반환함. firstChild 프로퍼티가 반환한 노드는 <br/> 텍스트 노드이거나 요소 노드임                                                                                 |
| `Node.prototype.lastChild`           | 마지막 자식 노드를 반환함. lastChild 프로퍼티가 반환한 노드는 <br/> 텍스트 노드이거나 요소 노드임                                                                                   |
| `Element.prototype.firstElement`     | 첫 번째 자식 요소 노드를 반환함. firstElementChild 프로퍼티는 <br/> 요소 노드만 반환함                                                                                              |
| `Element.prototype.lastElementChild` | 마지막 자식 요소 노드를 반환함. lastElementChildChild 프로퍼티는 <br/> 요소 노드만 반환함                                                                                           |

### 39.3.3 자식 노드 존재 확인

- 자식 노드가 존재하는지 확인하려면
- ┣ `Node.prototype.hasChildNodes 메서드`를 이용함
- ┣ hasChildNodes 메서드 : 자식 노드가 존재하면
- ┣ true를 반환하고 아니면 false를 반환함
- ┣ 단 : childNodes 프로퍼티와 마찬가지로
- ┗ `텍스트 노드를 포함하여 자식 노드의 존재를 확인함`

- 자식 노드 중에 텍스트 노드가 아닌 요소 노드가
- ┣ 존재하는지 확인하려면
- ┣ hasChildNodes 메서드 대신
- ┣ 1. `children.length 또는`
- ┣ 2. `Element 인터페이스`의
- ┗ `childElementCount 프로퍼티를 사용`

### 39.3.4 요소 노드의 텍스트 노드 탐색

- `요소 노드의 텍스트 노드` :
- ┣ `요소 노드의 자식 노드임`
- ┣ 따라서 → 요소 노드의 텍스트 노드 :
- ┣ `firstChild 프로퍼티로 접근이 가능함`
- ┣ firstChild 프로퍼티는 첫 번째 자식 노드를 반환함
- ┣ firstChild 프로퍼티가 반환한 노드는
- ┗ `텍스트 노드이거나 요소 노드임`

```html
<body>
	<div id="foo">Hello</div>
	<script>
		// 요소 노드의 텍스트 노드는
		// firstChild 프로퍼티로 접근이 가능함
		console.log(document.getElementById('foo').firstChild); // #text
	</script>
</body>
```

### 39.3.5 부모 노드 탐색

- 부모 노드를 탐색하려면
- ┣ `Node.prototype.parentNode` 프로퍼티를 사용함
- ┣ `텍스트 노드` :
- ┣ `DOM 트리의 최종단 노드인 leaf Node 이므로`
- ┗ `부모 노드가 텍스트 노드인 경우는 없음`

### 39.3.6 형제 노드 탐색

- 부모 노드가 같은 형제 노드를 탐색하려면
- ┣ 다음과 같은 `노드 탐색 프로퍼티를 사용함`
- ┣ 단 : `어트리뷰트 노드는 요소 노드와 연결되어 있지만`
- ┣ 부모 노드가 같은 형제 노드가 아니기 때문에
- ┣ `반환되지 않음`
- ┗ 즉 : `아래 프로퍼티는 텍스트 노드 또는 요소 노드만 반환함`

| 프로퍼티 | 설명 |
| `Node.property.previousSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 <br/> 탐색하여 반환함. previousSibling 프로퍼티가 반환하는 형제 <br/> 노드는 요소 노드 뿐만 아니라 텍스트 노드일 수도 있음 |
| `Node.property.nextSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 <br/> 탐색하여 반환함. previousSibling 프로퍼티가 반환하는 형제 <br/> 노드는 요소 노드 뿐만 아니라 텍스트 노드일 수도 있음 |
| `Element.property.nextElementSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 <br/> 탐색하여 반환함. nextElementSibling 프로퍼티가 반환하는 형제 <br/> 프로퍼티는 요소 노드만 반환함 |
| `Element.property.nextElementSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 <br/> 탐색하여 반환함. previousElementSibling 프로퍼티가 반환하는 형제 <br/> 프로퍼티는 요소 노드만 반환함 |

## 39.4 노드 정보 취득

- 노드 객체에 대한 정보를 취득하려면
- ┗ `다음과 같은 노드 정보 프로퍼티를 사용함`

| 프로퍼티                | 설명                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Node.prototype.nodeType | 노드 객체의 종류, 즉 : 노드 타입을 나타내는 상수를 반환함 <br/> 노드 타입 상수 : Node에 정의되어 있음 |
|                         | Node.ELEMENT_NODE: 요소 노드 타입을 나타내는 상수 1을 반환                                            |
|                         | Node.TEXT_NODE: 텍스트 노드 타입을 나타내는 상수 3을 반환                                             |
|                         | Node.DOCUMENT_NODE:문서 노드 타입을 나타내는 상수 9을 반환                                            |
| Node.prototype.nodeName | 노드의 이름을 문자열로 반환함                                                                         |
|                         | 요소 노드 : 대문자 문자열로 태그 이름("UL, LI")반환                                                   |
|                         | 텍스트 노드 : 문자열 "#text"를 반환                                                                   |
|                         | 문서 노드 : 문자열 "#document"를 반환                                                                 |

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

- 지금까지 살펴본 노드 탐색, 노드 정보 프로퍼티 :
- ┣ 모두 읽기 전용 접근자 프로퍼티임
- ┣ 지금부터 살펴볼 `Node.prototype.nodeValue 프로퍼티`
- ┣ 모두 setter, getter 모두 존재하는
- ┣ `접근자 프로퍼티임`
- ┗ `따라서 nodeValue 프로퍼티는 참조와 할당이 모두 가능함`

- 노드 객체의 nodeValue 프로퍼티를
- ┣ 참조하면 노드 객체의 값을 반환함
- ┣ 노드 객체의 값이란 :
- ┣ `텍스트 노드의 텍스트임`
- ┣ 따라서 텍스트 노드가 아닌 노드,
- ┣ 즉 : `문서 노드나 요소 노드의 `
- ┣ `nodeValue 프로퍼티를 참조하면`
- ┗ `null을 반환함`

```html
<html>
	<body>
		<div id="foo">Hello</div>
	</body>
	<script>
		// 문서 노드의 nodeValue 프로퍼티를 참조함
		console.log(document.nodeValue); // null

		// 요소 노드의 nodeValue 프로퍼티를 참조함
		const $foo = document.getElementById('foo');
		console.log($foo.nodeValue); // null

		// 텍스트 노드의 nodeValue 프로퍼티를 참조함
		const $textNode = $foo.firstChild;
		console.log($textNode.nodeValue); // Hello
	</script>
</html>
```

- 텍스트 노드의 nodeValue 프로퍼티에
- ┣ 값을 할당하면 텍스트 노드의 값
- ┣ 즉 : 텍스트를 변경할 수 있음
- ┣ `따라서 → 요소 노드의 텍스트를 변경하라면`
- ┗ `다음과 같은 순서의 처리가 필요함`

1. 텍스트를 변경할 요소 노드를 취득한 다음

- ┣ 취득한 요소 노드의 텍스트 노드를 탐색함
- ┣ `텍스트 노드는 요소 노드의 자식 노드 이므로`
- ┗ `firstChild 프로퍼티를 사용하여 탐색함`

2. 탐색한 텍스트 노드의 `nodeValue 프로퍼티를 사용하여`

- ┗ `텍스트 노드의 값을 변경함`

```js
$textNode.nodeValue = 'world';
```
