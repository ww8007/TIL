# Grid 공부

- 부모 요소 : Grid Container - 그리드 컨테이너
- 자식 요소 : Grid Item - 그리드 아이템

## 설정

- flex 와 동일하게 display: grid; 를 설정하는 것으로 시작
- display : grid;

## 용어 정리

1. Grid Container
   - display : grid를 적용하는 Grid의 전체 영역
2. Grid Item
   - Grid 컨테이너의 자식 요소들
3. Grid Track
   - Grid의 행(Row) 열(Column)
4. Grid Cell
   - Grid의 한 칸을 가르킴
5. Grid Line
   - Grid 셀을 구분하는 선
6. Grid Number
   - Grid 라인의 각 번호
7. Grid Gap
   - Grid 셀 사이의 간격

## 그리드 형태 정의

- grid-template-rows

  - 컨테이너 Grid 트랙의 크기들을 지정하는 속성

- minmax
  - 최솟값과 최댓값을 지정할 수 있는 함수
  - minmax(100px, auto)의 의미는 최소한 100px 최대는 자동으로 atuo
  - 아무리 내용의 양이 적더라도 최소한 높이 100px 확보

## 간격 만들기

- row-gap
- column-gap
- gap

> 그리드 셀 사이의 간격을 설정

## 그리드 형태 자동 정의

- grid-auto-columns
- grid-auto-rows

- grid-template-columns의 통제를 벗어난 위치에 있는 트랙의 크기를 지정하는 속성

## 정렬

### align-items

- 아이템을 세로(column)방향으로 정렬
  > 컨테이너에 적용

> stretch 가 아닌 start, center, end 적용 시 요소의 크기가 작아짐

```css
.container {
  align-items: stretch;
  /* start center end*/
}
```

### justify-items

- 아이템들을 가로(row축) 방향으로 정렬
  > 컨테이너에 적용

> stretch 가 아닌 start, center, end 적용 시 요소의 크기가 작아짐

```css
.container {
  justify-items: stretch;
  /* start center end*/
}
```

### place-items

- align-items(세로), justify-contents(가로)의 속성을 동시 적용
- align -> justify 순서로 작성
- 하나만 적어도 동시 적용

### align-content

- Grid 아이템들의 높이를 모두 합한 값이 Grid 컨테이너의 높이보다 작을 때 Grid 아이템들을 통째로 정렬
- Grid 컨테이너의 아이템 값들이 고정값일 경우 적용이 됨
