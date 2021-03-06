# 4. 지연평가

- `map, filter, reject` : 지연 평가를 시작
- ┗ `take, some, every, find` : 끝을 내는 함수

- 코드가 모두 돌고 결과를 내는 것과
- ┣ 지연 평가를 통해 최적화된 결과를 내는 것이
- ┣ 차이점이 존재함

- 함수형 프로그래밍의 장점
- ┣ `순수 함수`이기 때문에
- ┣ `평가 시점에 상관 없이`
- ┣ `순서를 내부적으로 재배치`를 해서
- ┗ `최적화가 가능함`

```js
import pkg from 'partial-js';

const { L, _ } = pkg;

var mi = 0;
var fi = 0;
pkg.go(
	pkg.range(100),
	L.map(function (val) {
		++mi;
		return val * val;
	}),
	L.filter(function (val) {
		++fi;
		return val % 2;
	}),
	L.take(5),
	console.log
);
console.log(mi, fi);
```

## 함수형 자바스크립트 요약

- ┣ 1. `함수를 되도록 작게` 만들기
- ┣ 2. `다형성 높은 함수` 만들기
- ┣ 3. `상태를 변경하지 않거나` 정확히 다루어
- ┣ `부수효과를 최소화` 하기
- ┣ 4. 복잡한 객체 하나를 인자로 사용하기보다
- ┣ 되도록 `일반적인 값 여러 개를 인자로 사용하기`
- ┣ 5. `동등한 인자를 받으면 항상 동일한 결과`를
- ┣ 리턴하는 `순수 함수` 만들기
- ┣ 6. `큰 로직` : `고차 함수`로 만들고
- ┣ `세부 로직`을 `보조 함수로 완성`하기
- ┣ 7. 어느곳에서든 바로 혹은 미뤄서 실행할 수 있도록
- ┣ `일반 함수이자 순수 함수로 선언`하기
- ┣ 8. 모델이나 컬렉션 등의 커스텀 객체보다는
- ┣ `기본 객체를 이용하기`
- ┣ 9. 로직의 흐름을 최대한 `단방향으로 흐르게 하기`
- ┗ 10. `작은 함수를 조합`하여 `큰 함수를 만들기`

- 상태를 지속적으로 변경해 나가는 것이 아닌
- ┣ `맨 마지막에 목적`으로
- ┣ 부수효과를 일으키는 식으로
- ┗ `함수를 설정하는 것이 중요함`

### 데이터 흐름 프로그래밍의 중요성

- `Clojure`, `Elixir` 읽기

- 지연평가 + 병렬성 + 동시성
- ┣ `순수 함수`가 있기 때문에 가능한
- ┗ `함수형 프로그래밍의 강점`

- 동시에 다른 스레드에서 평가를 하더라도
- ┣ `같은 결과를 도출하기 때문에`
- ┗ 장점이 존재함

#### pmap

- 병렬적으로 다른 스레드에서 동작이 가능함

#### fold

- for문 이라고 생각하지 말고
- ┣ reduce를 접어가는 함수라고 생각하면 좋음
- ┗ 클로저스에 r/fold 라는 함수가 존재함

![image](https://user-images.githubusercontent.com/54137044/152272235-5e04f260-50ca-4963-9e8a-0fc778ba09eb.png)
