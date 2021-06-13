# 리액트 테스트의 소개

- 리액트 컴포넌트를 테스트 할 때 주로 어떠한 결과가 화면상에 잘 타나났는지 어떠한 이벤트 혹이 함수가 호출 됐을 때 원하는 업데이트가 잘 반영이 되는지를 확인
- 이를 수행하는 가장 기본적 방법은 **react-dom/test-utils** 안에 들어있는 유틸 함수 사용

### Enzyme

- 컴포넌트의 내부 기능을 자주 접근
  - props와 state 확인
  - 컴포넌트의 내장 메서드 직접 호출

### react-test-library

- 렌더링 결과에 조금 더 집중
  - DOM에 대해서 신경 더 씀
  - 컴포넌트 인스턴스 무시
- 어떠한 이벤트가 발생했을 때 화면에 원하는 변화가 생겼는 지 확인용

- 모든 테스트를 DOM 위주로 진행
- 컴포넌트의 props나 state를 조회하는 일은 없음

> 컴포넌트 리펙토링

    주로 내부 구조, 네이밍은 많이 바뀔 수 있지만
    실제 작동 방식은 크게 바뀌지 않음

- 위의 이유로 인해서 컴포넌트 기능이 똑같이 작동한다면 내부 구현 방식이 많이 바뀌어도 테스트를 통과시키도록 설계

> yarn add @testing-library/react @testing-library/jest-dom
> yarn add @types/jest
> jest-dom은 jest 확장 DOM에 관련된 matcher 추가

- DOM 시뮬레이션을 위한 JSDOM 이라는 도구를 사용하여 document.body에 리액트 컴포넌트를 렌더링 함
- clean-up-after-each를 불러오면 각 테스트 케이스가 끝날 때 마다 기존에 가상의 화면에 남아있는 UI 정리
- jest-dom/extend-expect를 불러와서 jest에서 DOM 관련 matcher를 사용 할 수 있게 해줌

### 스냅샷 테스팅

- 렌더링된 결과가 이전에 렌더링한 결과와 일치하는지 확인하는 작업
- 컴포넌트가 렌더링 됐을 때 이 스냅샷과 일치하지 않으면 테스트가 실패함
- 스냅샷을 업데이트 하고 싶다면 테스트가 실행되고 있는 콘솔창에서
- press u

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile> matches snapshot 1`] = `
<div>
  <div>
    <b>
      ww8007
    </b>
    <span>
      (
      장동현
      )
    </span>
  </div>
</div>
`;
```

###
