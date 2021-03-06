# 3. 그리디

- `그리디(Greedy) 알고리즘` : 단순하지만 강력한 문제 해결 방법임
- ┣ 탐욕법으로 소개됨
- ┣ 어떠한 문제가 존재 → `단순`, `무식`, `탐욕적으로 문제`를 푸는 방법
- ┣ 탐욕적이라는 말 : 현재 상황에서 지금 당장 좋은 것만 고르는 방법
- ┣ 그리디 알고리즘 이용 → 매 순간 가장 보이는 것을 선택
- ┗ 현재 선택이 나중에 미칠 영향에서는 고려 X

- 코딩 테스트 그리디 : 외우지 않아도 풀 수 있는 가능성 높은 문제
- ┣ 정렬, 최단 경로 등의 알고리즘 유형은 사용 방법을 정확히
- ┗ 알고 있어야 함

> 다익스트라 알로리즘과 같은 특별한 케이스
> 단순 암기를 통한 문제 해결 가능

## 3.1 거스름돈

- 당신은 음식점의 계산을 도와주는 점원이다.
- ┣ 카운터에서는 거스름으로 사용할 500원, 100원, 50원
- ┣ 10원짜리 동전이 무한히 존재한다고 가정한다.
- ┣ 손님에게 거슬러 줘야 할 돈이 N원일 때 거슬러 줘야 할 동전의
- ┣ 최소 개수를 구하여라
- ┗ 단, 거슬러 줘야 할 돈 N은 항상 10의 배수이다.

### 해설

- 이 문제는 그리디 알고리즘을 이용해 풀 수 있는 가장 대표적인 문제
- ┣ 간단한 아이디어만을 떠올릴 수 있으면 문제를 해결 가능함
- ┣ > `가장 큰 단위부터 돈을 거슬러 주는 것`
- ┣ N원을 거슬러 줘야 한다고 생각할 때
- ┗ 단위 순서대로 이를 생각하면 됨

- [문제로 이동](거스름돈/problem.cpp)

## 그리디 알고리즘의 정당성

- 그리디 알고리즘의 경우 `모든 알고리즘 문제에 적용할 수 있는 것은 아님`
- ┣ 대부분의 문제의 경우 알고리즘을 이용할 경우
- ┣ `최적의 해를 찾을 수 없는 가능성이 다분`
- ┣ 탐욕적으로 문제에 접근했을 때 정확한 답을 찾을 수 있다는 보장
- ┗ 매우 `효과적이고 직관적`

- 그리디의 경우 `해법이 정당한지 검토`
- ┣ 동전의 경우 : 가지고 있는 동전 중에서 `큰 단위`가
- ┗ `항상 작은 단위의 동전들을 종합`해 `다른 해가 나올 수 없음`

- `그리디 알고리즘 문제`에서는 `문제 풀이를 위한 최소한의 아이디어`를
- ┗ 떠올리고 이것이 정당한지 검토할 수 있어야 답을 도출 가능

> 무작위로 단위가 주어지는 경우 해결불가

## 3.2 큰 수의 법칙

- 큰 수의 법칙 : 일반적으로 통계 분야에서 다루어지는 내용임
- ┣ 그러나 알고리즘에서는
- ┣ 다양한 수로 이루어진 배열이 있을 때
- ┣ 주어진 수들을 M번 더해서 가장 큰 수를 만드는 법칙
- ┣ 단 : 배열의 특정한 인덱스(번호)에 해당하는 수가 연속해서
- ┗ K번을 초과하여 더해질 수 없는 것이 이 법칙의 특징

### 입력 조건

- 첫째 줄에 N(2<= N <= 10,000), M(1<= M <= 10,000), K (1<=10,000)
- ┗ 의 자연수가 주어지며, 각 자연수는 공백으로 구분

- 둘째 줄에 `N개의 자연수가 주어짐`
- ┣ 각 자연수는 공백으로 구분
- ┗ 각각의 자연수는 `1 이상 10,000 이하로 수로 주어짐`

- N: 숫자 개수 , M : 숫자가 더해지는 횟수, K : 최대 사용 개수

- 입력으로 주어지는 K는 항상 M보다 작거나 같다.

### 출력 조건

- 첫째 줄에 큰 수의 법칙에 따라 답을 출력

### 입력 예시

1. 5 8 3
2. 2 4 5 4 6

### 출력 예시

46

### 구현

[이동](2_큰_수의_법칙/problem.cpp)

#### 해결

- 반복되는 수열에 대해서 파악
- ┣ 큰 수와 두 번째로 큰 수가 더해지면
- ┣ 특정한 수열 형태로 일정하게 반복해서 더해지는 특징
- ┣ `반복횟수 + 1` `M을 (K+1)`로 나눈 몫이 수열이 반복되는 횟수
- ┣ `K를 곱해주면` 가장 `큰 수가 등장하는 횟수`
- ┗ `int(M / (K+1)) * K + M % (K + 1)`

## 3.3 숫자 카드 게임

- 숫자 카드 게임 : 여러 개의 카드 중에서
- ┣ 가장 높은 숫자가 쓰인 카드 한 장을 뽑는 게임
- ┗ 게임의 룰을 지키며 카드를 뽑아야 하고 룰은 다음과 같음

1. 숫자가 쓰인 카드들이 N X N 형태로 놓여 있음

   - ┗ N : 행의 개수, M : 열의 개수

2. 먼저 뽑고자 하는 카드가 포함되는 행을 선택한다.

3. 선택된 행에 포함된 카드를 중 가장 숫자가 낮은 카드를 뽑아야 함

4. 처음에 카드를 골라낼 행을 선택할 때, 이후에 해당 행에서
   - ┗ 숫자가 가장 낮을 카드를 뽑을 것을 고려하여 최종 → 가장 높은 숫자

### 입력 조건

- 첫째줄에 숫자 카드들이 놓인 행의 개수와 N과 열의 개수 M이 공백으로 기준으로
- ┗ 하여 각각 자연수로 주어짐

### 출력 조건

- 첫째 줄에 게임의 룰에 맞게 선택한 카드에 적힌 숫자를 출력

### 입력 예시

> 1

- 3 3
- 3 1 2
- 4 1 4
- 2 2 2

> 2

- 2 4
- 7 3 1 8
- 3 3 3 4

### 구현

[이동](./3_숫자_카드_게임/problem.cpp)

### 문제 해설

- 각 행마다 가장 작은 수를 찾은 뒤에 그 수 중에서 가장 큰수를 찾는 것
- ┗ 문제중에는 쉽다고 볼 수 있음

## 3.4 1이 될 때까지

- 어떠한 수 N이 될 때까지 다음의 두 과정 중 하나를 반복적으로
- ┣ 수행하려고 함
- ┗ 두 번째 연산 : N이 K로 나누어떨어질 때만 선택 가능

1. N에서 1을 뺌
2. N을 K로 나눔

- EX) N : 17, K : 4라고 가정
- ┣ 1번 과정을 한 번 수행하면 N : 16
- ┣ 이후 2번 과정을 수행하면 N은 1이 됨
- ┣ 결과적으로 전체 실행한 횟수는 3임
- ┗ 이는 N을 1로 만드는 최소 횟수

- 문제 : N과 K과 주어질 때 N이 1이 될 때 까지 1번 혹은 2번의 과정을
- ┗ 수행해야 하는 최소 횟수를 구하는 프로그램을 작성하시오.

### 입력 조건

- N : 2 <= N <= 100,000
- K : 2 <= K <= 100,000
- 각각 자연수 이며, 입력으로 주어지는 N은 항상 K보다 크거나 같음

### 출력 조건

- 첫째 줄에 N이 1이 될 때까지 1번 혹은 2번의 과정을 수행해야하는 횟수의 최솟값

### 입력 예시

25 5

### 출력 예시

2

### 구현

- 문제에서 N의 범위가 10 미만이므로 일일이 1씩 빼도 문제를 해결 가능
- ┗ 그러나 값이 커질 경우를 대비하여 효율적으로 한 번에 빼는 방식을 사용

- [이동](4_1이_될_때까지/solve.cpp)
