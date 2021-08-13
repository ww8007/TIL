# 콘텍스트와 ref 속성

- React 프레임워크에서 의미하는 콘텍스트와 이와 관련된
  1. createContext API
  2. useContext hook
  3. ref 속성
  4. forwardRef API

> 위 의 내용을 학습

## 콘텍스트 이해하기

- React 패키지는 `createContext` 라는 `API` 제공

  - → `createContext` 함수 호출로 얻은 값 : `context(콘텍스트)`

- 스위치 기능을 통해서 react-native-paper 패키지의 기본모드, 다크 모드 테마 설정 가능

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-appearance
