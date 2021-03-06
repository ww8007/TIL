# 7. 캡슐화

- 모듈을 분리하는 가장 중요한 기준
- ┣ 자신을 제외한 다른 부분에
- ┣ 드러내지 않아야 할 부부을 잘 숨기는 것
- ┣ 1. 레코드 캡슐화 하기
- ┣ 2. 컬렉션 캡슐화 하기로 숨길 수 있음
- ┣ 3. 기본형을 객체로 바꾸기도 가능

- 리팩터링에서 임시 변수가 자주 걸리적
- ┣ 정확한 순서로 계산해야 하고
- ┣ 리팩터링 후에도 그 값을 사용하는 코드에서 접근

> 이를 임시 변수를 질의 함수로 바꾸기로 변경(7.4)

- 클래스 : 본래 정보를 숨기는 용도
- ┣ 1. 클래스 추출하기
- ┣ 2. 클래스 인라인 하기 사용

- 가장 큰 캡슐화 단위 : 클래스, 모듈
- ┣ 함수도 구현을 캡슐화 해야함
- ┣ 알고리즘 교체의 경우
- ┣ 알고리즘 전체를 함수 하나에 담은 뒤
- ┣ 알로그리즘 교체하기를 적용하면 됨

## 7.1 레코드 캡슐화 하기

- 대부분 프로그래밍 언어 :
- ┣ 데이터 레코드를 표현하는 구조를 제공
- ┣ 간단한지만 단순한 레코드에는 문제가 있음
- ┣ 특히 : 계산해서 얻을 수 있는 값
- ┣ 그렇지 않은 값을 명확히 구분해서 저장해야 함

> 고로 레코드보다 객체를 선호

- 객체를 사용하면
- ┣ 어떻게 저장했는지를 숨긴 채
- ┣ 세 가지 값을 각각의 메서드로 제공
- ┣ 사용자는 무엇이 저장된 값이고
- ┣ 무엇이 계산된 값인지 알 필요 없음
- ┣ 캡슐화 하면 이름을 바꿀 때도 좋음

- 필드 이름을 바꿔도 기존 이름과
- ┣ 새 이름 모두를 각각의 메서드로 제공할
- ┣ 수 있어서
- ┣ 사용자 모두가 새로운 메서드로 옮겨갈 때가지
- ┣ 점진적으로 수정 가능

> 가변의 경우 객체로 처리

- 값이 불변인 경우
- ┣ 시작, 끝, 길이를 모두 구해서
- ┣ 레코드로 저장
- ┣ 이름 : 그저 필드를 복제

- 레코드 구조는 두개로 분리 가능
- ┣ 1. 필드 이름을 노출하는 형태
- ┣ 2. 필드를 외부로 숨겨서
- ┣ 내가 원하는 이름을 쓸 수 있는 형태
- ┣ 2번의 경우 해시, 맵, 해시맵, 딕셔너리
- ┣ 연관 배열등의 이름으로 많이 제공됨

- 코드를 작성하다 보면 중첩된 리스트나
- ┣ 해시맵을 받아서 JSON이나
- ┣ XML같은 포맷으로 직렬화 하는 경우가 많음
- ┣ 이를 캡슐화 하면
- ┣ 1. 포맷을 바꾸거나
- ┣ 2. 추적일어려운 데이터에 대한
- ┣ 수정이 쉬워짐

- 레코드 캡슐화의 경우
- ┣ 1. lodash의 cloneDeep을 통해
- ┣ 객체를 복사해서 던지면서
- ┣ 원본 데이터에 대한 접근을 의도적으로 막는 것
- ┣ get과 set을 어우러지게 사용하는 것이 중요

## 컬렉션 캡슐화 하기

- 가변 데이터를 모두 캡슐화 하는 편
- ┣ 데이터 구조가 언제 어떻게 수정되는지
- ┣ 파악하기 쉬워져 필요한 시점에
- ┣ 데이터 구조를 변경하기도 쉬워지기 때문

> 실수

- 컬렉션 변수로의 접근을 캡슐화 하면서
- ┣ 게터가 컬렉션 자체를 반환 하도록 하면
- ┣ 컬렉션을 감싼 클래스가 눈치채지 못하면서
- ┣ 컬렉션의 원소들이 바뀔 수 있음

- 이러한 문제를 방지하기 위해서
- ┣ 컬렉션을 감싼 클래스에
- ┣ add(), remove() 같은
- ┣ 컬렉션 변경자 메서드를 만듬

- 내부 컬렉션을 직접 수정하지 못하게
- ┣ 막는 방법으로
- ┣ 절대로 컬렉션 값을 변환하지 않게 할 수 있음

```js
aCustomer.orders.size();

aCustomer.numberOfOrders();
// 다음과 같이 변경
```

- 하지만 책 저자는 이 방식에 동의 X
- ┣ 최신 언어는 다양한 언어를
- ┣ 다양한 컬렉션 클래스들을 표준화
- ┣ 인터페이스로 제공하며
- ┣ 컬렉션 파이프라인과 같은
- ┣ 패턴을 적용하여 다채롭게 조합이 가능함
- ┣ 표준 대신 전용 인터페이스를 사용하면
- ┣ 부가적인 코드가 늘어나며 컬렉션 연산들을
- ┣ 조합해 쓰기도 어려워짐

- 가장 흔히 사용하는 방식 :
- ┣ 컬렉션 게터를 제공하되
- ┣ 내부 컬렉션의 복제본을 반환하는 것
- ┣ 복제본을 수정해도 원본 컬렉션
- ┣ 아무런 영향을 주지 않음

> 컬렉션이 큰 경우 문제가 될 수 있음

- 코드베이스에서 일관성을 주는 것이 가장 중요
- ┣ 앞에 나온 방식 중에서 한 가지만 적용해서
- ┣ 컬렉션 접근 함수의 동작 방식을 통일함

## 7.3 기본형을 객체로 바꾸기

```js
orders.filter((o) => 'high' === o.priority || 'rush' === o.priority);

// after
orders.filter((o) => o.priority.higherTan(new Priority('normal')));
```

- 개발 초기에는 단순한 정보를 숫자나 문자열 같은
- ┣ 간단한 데이터 항목으로 표한하는 경우가 많았음

### 절차

1. 아직 변수를 캡슐화 하지 않았으면 캡슐화 함

2. 단순한 값 클래스(value class) 만듬

- ┣ 기존 값을 인수로 받아서 저장하고
- ┣ 이 값을 반환하는 게터를 추가함

3. 정적 검사를 수행

4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록

- ┣ 세터를 수정함
- ┣ 이미 있다면 필드의 타입을 적절히 변경함

5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정

6. 테스트

## 임시 변수를 질의 함수로 바꾸기

```js
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;

get basePrice() {this._quantity * this._itemPrice}

if (this._basePrice > 1000) return this._basePrice * 0.95;
else return this._basePrice * 0.98;
```

- 함수 안에서 어떤 코드의 결괏값을 뒤에서
- ┣ 다시 참조할 목적으로 임시 변수를 쓰기도 함
- ┣ 임시 변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고
- ┣ 값의 의미를 설명할 수도 있어서 유용함

- ┣ 긴 함수의 한 부분을 별도 함수로 추출하고자 할 때
- ┣ 먼저 변수들을 각각의 함수로 만들면
- ┣ 일이 수월해짐
- ┣ 추출한 함수에 변수를 따로 전달할 필요가
- ┣ 없어지기 때문임
- ┣ 또한 이 덕분에 추출한 함수와 원래 함수의
- ┣ 경계가 더 분명해짐

> 이는 클래스에서 가장 효과적

- 임시 변수를 질의 함수로 바꾼다고 다 좋아지는 것은 아님
- ┣ 자고로 변수는 한 번만 계산하고 그 뒤로는 읽기만 함
- ┣ 가장 단순한 예로 변수에 값을 한 번 대입한 뒤
- ┣ 더 복잡한 코드 덩어리에서
- ┣ 여러 차례 다시 대입하는 경우는 모두 질의 함수로 추출
- ┣ 변수가 다음번에 사용될 때 수행해도
- ┣ 똑같은 결과를 내야함
- ┣ 옛날 주소처럼 스냅숏 용도로 쓰이는 변수에는
- ┣ 이 리팩터링을 적용하면 안됨

### 절차

1. 변수가 사용되기 전에 값이 확실히 결정되는지

- ┣ 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지 않는지 확인

2. 읽기 전용으로 만들 수 있는 변수는 읽기 전용으로 만듬

3. 테스트

4. 변수 대입문을 함수로 추출함

5. 테스트

6. 변수 인라인 하기로 임시 변수를 제거

## 7.5 클래스 추출하기

- 클래스는 반드시 면확하게 추상화하고
- ┣ 소수의 주어진 역할만 처리해야 한다는
- ┣ 가이드라인을 들어본 적이 있음

- 메서드와 데이터가 너무 많은 클래스는 이해가 힘드니
- ┣ 이를 적절히 분리하는 것이 좋음

- 특히 일부 데이터와 메서드를 따로 묶을 수 있다면
- ┣ 어서 분리하라는 신호임
- ┣ 함께 변경되는 일이 많거나 서로
- ┣ 의존하는 데이터들도 분리함
- ┣ 특정 데이터나 메서드 일부를 제거하면
- ┣ 어떤 일이 일어나는지 자문해보면 판단에 도움이 됨

## 7.6 클래스 인라인하기

```js
class Person {
	get officeAreaCode() {
		return this._telephoneNumber.areaCode;
	}
    get officeNumber() {
        return this._telephoneNumber.number;
    }
}
class TelephoneNumber {
    get officeAreaCode {
        return this._officeAreaCode;
    }
    get officeNumber() {
        return this._officeNumber;
    }
}
```

- 클래스 인라인하기는
- ┣ 클래스 추출하기를 거꾸로 돌리는 리팩터링임
- ┣ 제 역할을 못해서 그대로 두면 안되는 클래스를
- ┣ 인라인 해버림
- ┣ 역할을 옮기는 리팩터링을 하고 나니
- ┣ 특정 클래스에 남은 역할이 거의 없을 때
- ┣ 이런 현상이 자주 발생

## 7.7 위임 숨기기

```js
manager = aPerson.department.manager;

// after
manager = aPerson.manager;

class Person {
	get manager() {
		return this.department.manager;
	}
}
```

- 모듈화 설계를 제대로 하는 핵심은
- ┣ 캡슐화임
- ┣ 어쩌면 가장 중요한 요소일 수도 있음
- ┣ 캡슐화 : 모듈들이 시스템의 다른 부분에 대해
- ┣ 알야야 할 내용을 줄여줌
- ┣ 캡슐화가 잘 되어 있다면 무언가를 변경해야 할 때
- ┣ 고려해야 할 모듈 수가 적어져서 코드를 변경하지 쉬움

- 객체 지향을 처음 배울 때는
- ┣ 캡슐화는 필드를 숨기는 것
- ┣ 경험이 쌓이면 그 보다 역할을 많다는 것을 알게됨

- 서버 객체의 필드가 가르키는 객체(위임 객체(delegate))
- ┣ 메서드를 호출하려면 클라이언트는 이 위임 객체를
- ┣ 알아야함
- ┣ 위임 객체의 인터페이스가 바뀌면
- ┣ 이 인트페이스를 사용하는 모든 코드를 수정해야 함
- ┣ 이런 의존성을 없애기 위해서
- ┣ 서버 자체에 위임 메서드를 만들어서
- ┣ 존재 자체를 숨기면됨

### 절차

1. 위임 객체의 각 메서드에 해당하는 위임 메서드를

- 서버에 생성함

2. 클라이언트가 위임 객체 대신 서버를 호출하도록 수정함

- 하나씩 바꿀 때마다 테스트함

3. 모두 수정했다면 서버로부터 위임 객체를 얻는 접근자를 제거함

4. 테스트

```js
constructor(name) {
    this._name = name;
}
get name() {return this._name;}
get department() {return this._department;}
set department(arg) {this._department =arg;}

// Department 클래스
get chargeCode() {return this._chargeCode;}
set chargeCode(arg) {this._chargeCode = arg;}
get manager() {return this._manger;}
set manager(arg){this._manager = arg;}
```

- 클라이언트에서 어떤 사람이 속한 부서의 관리자를
- ┣ 알고 싶을 경우 부서 객체부터 얻어 와야함

- 보다시피 클라이언트는 부서 클래스의 작동 방식
- ┣ 다시 말해 부서 클래스가 관리자 정보를
- ┣ 제공한다는 사실을 알야앟
- ┣ 이러한 의존성을 줄이러면
- ┣ 클라이언트가 부서 클래스를 볼수 없게 숨기고
- ┣ 대신 사람 클래스에 간단한 위임 메서드를 만들면 됨

```js
// Person 클래스
get manager() {return this._department.manager;}

// 이제 모든 클라이언트가 이 메서드를 사용하도록
manager = aPerson.manager;

// 클라이언트 코드를 다 고쳤으면
// department() 접근자를 삭제함
```

## 7.8 중개자 제거하기

- 앞절에서 위임 객체를 캡슐화 하는 이점에
- ┣ 대해서 설명을 하였음
- ┣ 하지만 그 이점이 거저 주어지는 것이 아닌
- ┣ 또 다른 기능을 사용하고 싶은 경우
- ┣ 서버에 위임 메서드를 추가해야 함
- ┣ 고로 서버가 단순히 전달만 하는
- ┣ 위임 메서드들이 점점 많아짐

> 서버 클래스가 중개자 역할로 전락 가능
