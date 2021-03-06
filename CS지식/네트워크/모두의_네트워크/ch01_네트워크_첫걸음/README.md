# 1. 네트워크 첫걸음

- 네트워크를 처음 배우는 초급자가 꼭 알아야 하는 기초지식

> 목표

    1. 네트워크가 무엇인지 이해
    2. 패킷을 이해
    3. 랜(LAN), 왠(WAN)에 대해 이해

## 목차

- [1. 네트워크 첫걸음](#1-네트워크-첫걸음)
  - [목차](#목차)
  - [Lesson 00 네트워크 입문 강의](#lesson-00-네트워크-입문-강의)
  - [Lesson 01 네트워크의 구조](#lesson-01-네트워크의-구조)
  - [정리](#정리)

## Lesson 00 네트워크 입문 강의

> 네트워크 입문 강의

- 웹 브라우저에서 `웹 사이트를 볼 수` 있는게
- ┣ 다양한 `네트워크 기술`이 있기 때문
- ┣ `문제가 생겨 접속 X` → `원인`, `문제`에 대해서
- ┣ 스스로 찾아낼 수 있음
- ┣ 네트워크에 대한 문제가 발생 했을 때
- ┗ `원인`이 무엇인지 파악하는 건 `매우 중요`

- 네트워크 : 다양한 기능이 결합
- ┣ 기능 → 여러 `계층(레이어)` 형태로 구성
- ┣ `계층 구조`를 이해하면
- ┣ 문제가 발생한 `원인`이
- ┗ `네트워크 장비` 인지 `Application` 인지 `판단 가능`

## Lesson 01 네트워크의 구조

> 컴퓨터 네트워크란?

- `네트워크` : 흔히 컴퓨터 간의 연결을 생각
- ┣ 그러나 용어상 으로는 다양한 곳에서 쓰임
- ┣ 한 대 X, 여러대 → 컴퓨터 네트워크가 되고
- ┗ 컴퓨터 간에 필요한 `데이터(정보)`를 서로 `주고 받을 수 있음`

- 네트워크를 이용해서
- ┗ `데이터(파일) 전송`, `웹 사이트 열람`, `메일 송/수신 가능`
- 인터넷 : 전 세계의 큰 네트워크부터 작은 네트워크까지 연결하는
- ┗ 거대한 `네트워크` → 전 세계가 네트워크로 연결되어 있음

> 패킷이란?

- 네트워크나 인터넷에서 데이터를 주고 받기 위해서는
- ┣ 규칙이 존재함
- ┣ 규칙 : 사진과 문자를 보여주 주기 위해 필요한 규칙
- ┗ `패킷(packet)`을 이용함!

- `패킷` : 컴퓨터 간에 데이터를 주고받을 때
- ┣ `네트워크를 통해 전송되는` 데이터의 `작은 조각`
- ┣ 큰 데이터가 있더라도 작게 나누어서 보내는게 규칙
- ┣ 큰 데이터의 `문제점` : 네트워크의 `대역폭` 많이 차지하여
- ┗ 다른 패킷의 `흐름을 막을 위험`이 존재하게 됨

> 네트워크를 도로망 같이 생각!

- `데이터 전송 방법`
- ┣ 1. `패킷`으로 `분할`
- ┗ 2. 모두 패킷으로 만든다.

> 하지만 패킷으로 분할하면 그 역순도 생각해야 함

- 원래 데이터대로 되돌리는 작업을 해야함
- ┣ 보낸 패킷들이 순서를 보장하지 않거나
- ┣ 네트워크 지연등의 요소로 → 패킷 누락도 가능
- ┣ 이를 방지하기 위해서 `송신측` → `수신측`
- ┗ 패킷 보낼 때 : 각 패킷에 순서대로 `번호`를 붙임

> 번호를 붙여서 보내면 수신측에서 다시 조합의 문제가 없음

## 정리

1. `컴퓨터` 간의 `연결` : `컴퓨터 네트워크`

2. `인터넷` : 전 셰게의 `큰 네트워크` 부터 `작은 네트워크`까지 연결하는
   ┗ `거대한 네트워크`

3. `패킷` : 컴퓨터 간의 `데이터`를 `주고 받을` 때 `네트워크를 통해`
   ┗ 흘러 들어가는 `작은 데이터 조각`

4. `큰 데이터` : `작은 패킷`으로 `분할`
