# 10 케이블의 종류와 구조

- 네트워크 전송 매체의 종류에는 유선과 무선이 있음
- ┗ 유선 전송 매체로 사용도는 네트워크 커넥터에 대해 학습

## 목차

- [10 케이블의 종류와 구조](#10-%EC%BC%80%EC%9D%B4%EB%B8%94%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EA%B5%AC%EC%A1%B0)
  - [10.1 트위스트 페어 케이블이란?](#101-%ED%8A%B8%EC%9C%84%EC%8A%A4%ED%8A%B8-%ED%8E%98%EC%96%B4-%EC%BC%80%EC%9D%B4%EB%B8%94%EC%9D%B4%EB%9E%80)
  - [10.2 다이렉트 케이블과 크로스 케이블이란?](#102-%EB%8B%A4%EC%9D%B4%EB%A0%89%ED%8A%B8-%EC%BC%80%EC%9D%B4%EB%B8%94%EA%B3%BC-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EC%BC%80%EC%9D%B4%EB%B8%94%EC%9D%B4%EB%9E%80)
  - [정리](#%EC%A0%95%EB%A6%AC)

## 10.1 트위스트 페어 케이블이란?

- 네트워크 전송 매체
- ┣ `전송 매체` : `데이터가 흐르는 물리적인 선로`
- ┣ 유선, 무선으로 나눠짐
- ┣ `유선` : `트위스트 페어 케이블`, `광케이블`
- ┗ `무선` : `라디오파`, `마이크로파`, `적외선`

> 트위스트 페어 케이블(twisted pair cable)에 대해 설명

- 종류 : UTP 케이블, STP 케이블 이 존재

- `UTP 케이블` :
- ┣ `구리 선` : `여덟 개 두개 씩 꼬아서` 만듬
- ┣ 네 쌍의 전선으로 `실드(shield)로 보호되어 있지 않은` 케이블
- ┗ UTP의 경우 실드로 보호되어 있지 않기 때문에 저렴함

- `실드` : `금속 호일이나 금속의 매듭과 같은 것`
- ┗ 외부에서 발생되는 `노이즈 막는` 역할을 함

- `STP 케이블` :
- ┣ `두 개씩` 꼬아 만든 선을 `실드로 보호한 케이블`임
- ┣ UTP 케이블과 달리 `노이즈의 영향을 매우 적게 받지`만
- ┗ `비싸기` 때문에 `보편적으로 사용하지는 않음`

- `UTP의 경우 케이블`의 경우
- ┣ 노이즈의 영향을 크게 받지만 저렴하기 때문에
- ┣ 일반적으로 UTP 케이블을 사용하게 됨
- ┗ UTP 케이블 : 데이터 전송 품질에 따라 다음과 같이 분류

| 분류  | 규격        | 속도    |
| ----- | ----------- | ------- |
| Cat3  | 10BASE-T    | 10Mbps  |
| Cat5  | 100BASE-TX  | 100Mbps |
| Cat5e | 1000BASE-T  | 100Mbps |
| Cat6  | 1000BASE-TX | 100Mbps |
| Cat6a | 100BASE-T   | 100Mbps |
| Cat7  | 100BASE-T   | 10GMbps |

- `트위스트 페어 케이블(UTP, STP)`은 일반적으로
- ┣ `랜 케이블(LAN cable, 랜선)`이라고 함
- ┣ 보통은 `랜 케이블`이라는 용어를 더 많이 사용
- ┗ 이제 랜 케이블로 부름

> 랜 케이블의 경우 쉽게 살 수 있지만
> 목적에 맞게 Cat5, Cat5e가 지원하는 속도가 다르기 때문에
> 잘 알아보고 사야함

- 랜 케이블의 `양쪽 끝` : `RJ-45`라고 부르는 커넥터가 붙어있음
- ┗ 커넥터를 랜 포트나 네트워크 기기에 연결

## 10.2 다이렉트 케이블과 크로스 케이블이란?

- `랜 케이블` : `1. 다이렉트 케이블`, `2. 크로스 케이블`
- ┣ 1. `다이렉트 케이블` : 구리 선 여덟개 `같은 순서로 연결`
- ┣ 2. `크로스 케이블` : 구리 선 여덟개 중
- ┗ 한쪽 커넥터의 `1번, 2번` → `다른쪽 3번, 6번`에 연결

- 크로스 케이블 : 실제로는 1, 2, 3, 6번만 사용

- 나머지 선 네 개는 사용하지 않음
- ┣ `다이렉트 케이블` : 컴퓨터와 스위치를 연결할 때 사용
- ┣ `크로스 케이블` : 컴퓨터 간에 직접 랜 케이블로 연결할 때 사용
- ┣ 컴퓨터 간에 `직접 데이터를 보낼 때`는 양쪽 컴퓨터 모두
- ┗ `1번, 2번 선을 사용`하게 됨

- `크로스 케이블` : 일부러 중간에 `전선을 교차시켜` `송신 측`,
- ┣ `수신 측이 올바르게 연결`되도로 함
- ┗ 다이렉트 케이블과 크로스 케이블의 사용법 숙지

## 정리

1. 트위스트 페어 케이블 : `UTP(Unshielded Twisted Pair) 케이블`과

   - ┗ `STP(Shielded Twisted Par)케이블이 존재`

2. `UTP 케이블` : 실드로 보호되어 있지 않아 → 노이즈의 영향을 크게 받음

3. `STP 케이블` : 실드로 보호 → 노이즈의 영향을 적게 받음

4. `트위스트 페어 케이블` : 일반적으로 `랜 케이블이라고 부름`

5. 랜 케이블은 `통신 규격에 따라 몇 가지 분류`로 구준 가능

6. 랜 케이블 `양쪽` : `RJ-45라는 커넥터`가 존재

7. 랜 케이블 : `다이렉트 케이블`, `크로스 케이블` 존재
