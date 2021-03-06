# 24. TCP의 구조

- 전송 게층에서 신뢰할 수 있는 정확한 통신을 제공하는
- ┗ TCP 프로토콜의 구조에 대해 알아봄

## 24.1 TCP란?

- 신뢰성, 정확성 보장 → 연결형 통신인 TCP

> 캡슐화

    응용 계층 ~ 물리 계층
    ┣ 계층별로 데이터를 전달할 때
    ┗ 헤더를 붙이는 것 : 캡슐화

> 역캡슐화

    데이터 수신측
    ┣ 물리 계층 → 응용 계층
    ┣ 계층별로 데이터를 전달할 때
    ┗ 헤더를 제거하는 것 : 역캡슐화

- 이와 동일하게 TCP 전송 헤더
- ┣ → `TCP 헤더`라고 부름
- ┣ TCP 헤더가 붙은 데이터 : `세그먼트(segment)`
- ┣ TCP 헤더에도 동일하게 여러 정보들이 나열되어 있음
- ┗ 1 ~ 11 꺼지의 여러 정보들 존재

1. `출발지` 포트 번호(16비트)
2. `목적지` 포트 번호(16비트)
3. `일련번호`(32비트)
4. `확인 응답 번호`(32비트)
5. `헤더 길이`(4비트)
6. `예약 영역`(6비트)
7. `코드 비트`(6비트)
8. `윈도우 크기`(16비트)
9. `체크섬`(16비트)
10. `긴급 포인터`(16비트)
11. `옵션`

- 연결형 통신 : 상대방을 확인하면서 데이터를 전송
- ┣ 데이터를 전송하기 전 진행해야 하는 사전 작업이 존재
- ┗ 연결(connection) : `가상의 독점 통신로를 확보`

- TCP 헤더 7. 코드 비트
- ┣ `코드 비트` : TCP 헤더의
- ┣ 107번째 비트부터 ~ 112번째 비트 까지의
- ┗ 6비트로 `연결의 제어 정보가 기록`되는 곳

| URG | ACK | PSH | RST | SYN | FIN |
| --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 0   | 0   |

> 코드 비트 역할

    초기값 : 0
    ┣ 활성화 : 1
    ┣ 연결 확립 → SYN, ACK 필요
    ┣ SYN : 연결 요청
    ┗ ACK : 확인 응답

## 24.2 3-way 핸드셰이크란?

- 연결(connection) : SYN, ACK를 사용하여 확립 가능
- ┣ 신뢰할 수 있는 연결 : 데이터를 전송하기 전에
- ┗ 패킷을 교환 → `3번을 교환`하게 됨

1. 연결 확립 요청 `(SYN)`

- 통신을 하려면 컴퓨터 2에게 허가를 받아야함
- ┣ 컴퓨터 1 → 컴퓨터 2에게 연결 확립 허가를
- ┗ 받기 위해서 요청(SYN)을 보내게 됨

2. 연결 확립 응답 + 연결 확립 요청 `(SYN + ACK)`

- 컴퓨터 2 : 컴퓨터 1이 보낸 요청을 받은 후에
- ┣ 허가한다는 `응답을 회신`하기 위해
- ┣ `연결 확립 응답(ACK)`를 보내게 됨
- ┣ 동시에 컴퓨터 2 : 컴퓨터 1에게 허가 받기위해
- ┗ `연결 확립 요청(SYN)`을 보내게 됨

3. 연결 확립 응답 `(ACK)`

- 컴퓨터 2의 요청 받은 : 컴퓨터 1
- ┣ 컴퓨터 2로 허가 한다는 응답으로
- ┗ `연결 확립 응답(ACK)를 전송`

> SYN, ACK 이 과정에서 0 → 1로 비트 변경

- 이처럼 데이터를 보내기 전에 연결을 확립하기 위해
- ┣ 패킷 요청 3번 교환하는 것을
- ┗ `3-way 핸드셰이크(three-way handshake)`

- 확실하게 데이터가 전송되었는지 확인하면서
- ┣ 이루어지는 통신 수단이라고 볼 수 있음
- ┣ 연결을 끊을 때 : `FIN, ACK 사용`
- ┗ `FIN → 연결 종료`를 의미

> 아까 일련의 과정에서 SYN이 FIN으로 변환된다고 생각

- TCP : 신뢰성과 정확성을 중요시 여기는 프로토콜 이므로
- ┗ 이와 같이 상대방이 문제가 없는지 호가실하게 확인

## 24 정리

1. `전송 계층 : TCP 헤더`가 붙음

2. TCP 헤더가 붙은 데이터 : `세그먼트`

3. 연결(connection) `확립` 위해 TCP `헤더의 코드 비트를 사용`

4. 코드 비트 중 :

- ┣ 1. `SYN` : 연결 요청
- ┣ 2. `ACK` : 연결 응답
- ┗ 3. `FIN` : 연결 종료

5. 연결 확립을 위해 패킷 교환을 3번 진행

- ┗ 이를 `3-way 핸드셰이크`라고 부름

6. 연결을 확립 : `SYN, ACK` 사용

- 연결을 종료 : `FIN, ACK` 사용
