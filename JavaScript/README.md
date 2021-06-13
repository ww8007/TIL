# JavaScript 테스팅의 기초

### Jest

페이스북 팀에서 Jasmine 기반으로 만든 테스팅 프레임워크

### 작업환경 설정

1. yanr init -y
1. yarn add jest
1. yarn add @types/jest

### 아주 간단한 test 코드

```js
const sum = require("./sum");

test("1+2=3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### test 대신 it

- test 키워드가 아닌 it이라는 키워드를 사용 가능
- it을 사용하게 되면 영어로 작성하게 되는 경우 말이 되게 만들 수 있음

### describe를 사용해서 여러 테스트 케이스를 묶기

```js
const { sum, sumOf } = require("./sum");

describe("sum", () => {
  it("cal 1 + 2 ", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("cal all numbers", () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumOf(array)).toBe(15);
  });
});
```
