# GraphQL

## 개요

React 개발 Facebook

- REST API 개발

  - 단점과 비효율 개선하기 위해 나온 것

- 기본적인 endpoint 독립적인 요청

- graph , query language
- 별도의 도메인 특화 언어 지원 이유

> 규모가 작은 프로그램의 경우 불편함 못느낌

- over fetching

  - 특정한 유저정보 얻기위한 api 요청 가정
  - 유저 데이터 외에 불필요한 정보까지 같이 옴

- under fetching

  - api call 에 대한 목적 데이터 존재 가정
  - 단독적인 데이터를 요청하는 것이 어렵다

> REST API의 단점

    서버 퍼포먼스에 부작용을 초래

- 하나의 단일 End Point
  - 불필요한 정보를 요청하게 될 일이 없음
  - 단일 endpoint 로 요청하게 되면 모든 데이터에 접근이 가능하다는 것이 장점이다.

## Graph vs REST

- 차이점

- REST API

  - end point 라고 불리는 api call을 만들어서 요청을 처리
  - over fetch, under fetching 의 문제가 발생하지 않음
  - 작은 프로그램의 경우에는 문제가 없음
  - 프런트앤드 개발, 백앤드 개발 분리 시 새로운 개발을 할 때 마다 계속 협의
  - 문서화를 계속 관리를 잘 하더라도 버전 관리가 제대로 안할 시 일관성을 지키 못하는 경우가 생김

- Graph QL
  - 모든 데이터가 하나의 데이터로 이루어져 있음
  - 해당하는 데이터 만큼만 반환을 해준다.
  - 모든 데이터는 그래프로 연결이 되어있기 때문에 이런 점이 가능하다.
  - endpoint를 하나만 가진다는 것이 가장 큰 장점

## 기본 사용법 및 스키마 작성, resolve 작성

> 설치

    npm i body-parser --save
    npm i body-parser apollo-server-express graphql-tools --save

- graphql-tools : 스키마 작성 용이

- graphql : type 설정가능
  - 느낌표(!) 붙여서 필수 표현 가능

```javascript
const typeDefs = `
    // 단순 타입 설정 스키마
    type Lang {
        id: Int,
        name: String!
    }
    // 쿼리문을 뜻함
    type Query {
        getLangs(name: String): [Lang]
    }
`;
```

- 위의 추상화 데이터 타입에 따라서 데이터를 설정

```javascript
const langs = [
  {
    id: 0,
    name: 'Node',
  },
  {
    id: 1,
    name: 'Python',
  },
];
```

> typeDef 에서 정의를 하면 resolvers 에서 쿼리를 바로 사용 가능함

```js
const resolvers = {
  Query: {
    getLangs: () => langs,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

- 그러고 각자 endpoint 설정

- graphiql
  - 아래 graphql에 대한 쿼리문을 작성하고 return 되 있는 data를 확인하기 위한 endpoint 작성

```js
server.use(
  '/graphql',
  bodyParser.json(),
  graphExpress({
    schema,
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpoint: '/graphiql',
  })
);
```
