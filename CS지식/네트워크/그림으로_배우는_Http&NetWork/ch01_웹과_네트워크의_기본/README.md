# 1. 웹과 네트워크 기본

- [웹과 네트워크 기본]

## 목차

- [1. 웹과 네트워크 기본](#1-%EC%9B%B9%EA%B3%BC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B8%B0%EB%B3%B8)
  - [1.1 웹은 HTTP로 나타낸다](#11-%EC%9B%B9%EC%9D%80-http%EB%A1%9C-%EB%82%98%ED%83%80%EB%82%B8%EB%8B%A4)
  - [1.2 HTTP는 이렇게 태어났고 성장](#12-http%EB%8A%94-%EC%9D%B4%EB%A0%87%EA%B2%8C-%ED%83%9C%EC%96%B4%EB%82%AC%EA%B3%A0-%EC%84%B1%EC%9E%A5)
    - [1.2.1 웹은 지식 공유를 위해 고안](#121-%EC%9B%B9%EC%9D%80-%EC%A7%80%EC%8B%9D-%EA%B3%B5%EC%9C%A0%EB%A5%BC-%EC%9C%84%ED%95%B4-%EA%B3%A0%EC%95%88)
    - [1.2.2 웹이 성장한 시대](#122-%EC%9B%B9%EC%9D%B4-%EC%84%B1%EC%9E%A5%ED%95%9C-%EC%8B%9C%EB%8C%80)
    - [1.2.3 진보 안하는 HTTP](#123-%EC%A7%84%EB%B3%B4-%EC%95%88%ED%95%98%EB%8A%94-http)
  - [1.3 네트워크의 기본은 TCP/IP](#13-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%9D%98-%EA%B8%B0%EB%B3%B8%EC%9D%80-tcpip)
    - [1.3.1 TCP/IP는 프로토콜의 집합](#131-tcpip%EB%8A%94-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EC%9D%98-%EC%A7%91%ED%95%A9)
    - [1.3.2 계층으로 관리하는 TCP/IP](#132-%EA%B3%84%EC%B8%B5%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EB%8A%94-tcpip)
      - [애플리케이션 계층](#%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EA%B3%84%EC%B8%B5)
      - [트랜스포트 계층](#%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%ED%8A%B8-%EA%B3%84%EC%B8%B5)
      - [네트워크 계층(혹은 인터넷 계층)](#%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%84%EC%B8%B5%ED%98%B9%EC%9D%80-%EC%9D%B8%ED%84%B0%EB%84%B7-%EA%B3%84%EC%B8%B5)
      - [링크 계층(데이터 링크 계층, 네트워크 인터페이스 계층)](#%EB%A7%81%ED%81%AC-%EA%B3%84%EC%B8%B5%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%A7%81%ED%81%AC-%EA%B3%84%EC%B8%B5-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EA%B3%84%EC%B8%B5)
    - [1.3.3 TCP/IP 통신의 흐름](#133-tcpip-%ED%86%B5%EC%8B%A0%EC%9D%98-%ED%9D%90%EB%A6%84)
  - [1.4 HTTP와 관계가 깊은 프로토콜 → IP/TCP/DNS](#14-http%EC%99%80-%EA%B4%80%EA%B3%84%EA%B0%80-%EA%B9%8A%EC%9D%80-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C-%E2%86%92-iptcpdns)
    - [1.4.1 배송을 담당하는 IP](#141-%EB%B0%B0%EC%86%A1%EC%9D%84-%EB%8B%B4%EB%8B%B9%ED%95%98%EB%8A%94-ip)
      - [통신은 APR을 이용하여 MAC 주소에 함](#%ED%86%B5%EC%8B%A0%EC%9D%80-apr%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-mac-%EC%A3%BC%EC%86%8C%EC%97%90-%ED%95%A8)
      - [그 누구도 인터넷 전체를 파악하고 있지는 않음](#%EA%B7%B8-%EB%88%84%EA%B5%AC%EB%8F%84-%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%A0%84%EC%B2%B4%EB%A5%BC-%ED%8C%8C%EC%95%85%ED%95%98%EA%B3%A0-%EC%9E%88%EC%A7%80%EB%8A%94-%EC%95%8A%EC%9D%8C)
    - [1.4.2 신뢰성을 담당하는 TCP](#142-%EC%8B%A0%EB%A2%B0%EC%84%B1%EC%9D%84-%EB%8B%B4%EB%8B%B9%ED%95%98%EB%8A%94-tcp)
      - [상대에게 데이터를 확실하게 보내는 것이 일](#%EC%83%81%EB%8C%80%EC%97%90%EA%B2%8C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%99%95%EC%8B%A4%ED%95%98%EA%B2%8C-%EB%B3%B4%EB%82%B4%EB%8A%94-%EA%B2%83%EC%9D%B4-%EC%9D%BC)
  - [1.5 이름 해결을 담당하는 DNS](#15-%EC%9D%B4%EB%A6%84-%ED%95%B4%EA%B2%B0%EC%9D%84-%EB%8B%B4%EB%8B%B9%ED%95%98%EB%8A%94-dns)
  - [1.6 각각과 HTTP와의 관계](#16-%EA%B0%81%EA%B0%81%EA%B3%BC-http%EC%99%80%EC%9D%98-%EA%B4%80%EA%B3%84)
  - [1.7 URI와 URL](#17-uri%EC%99%80-url)
    - [1.7.1 URI는 리소스 식별자](#171-uri%EB%8A%94-%EB%A6%AC%EC%86%8C%EC%8A%A4-%EC%8B%9D%EB%B3%84%EC%9E%90)
      - [Uniform](#uniform)
      - [Resource](#resource)
      - [Identifier](#identifier)
    - [1.7.2 포맷](#172-%ED%8F%AC%EB%A7%B7)
    - [실제 사양대로 되지 않을수 있음](#%EC%8B%A4%EC%A0%9C-%EC%82%AC%EC%96%91%EB%8C%80%EB%A1%9C-%EB%90%98%EC%A7%80-%EC%95%8A%EC%9D%84%EC%88%98-%EC%9E%88%EC%9D%8C)

## 1.1 웹은 HTTP로 나타낸다

- 웹 브라우저 `주소 입력란` : `URL` 입력
- ┣ 지정된 URL에 의지해 `웹 서버`로부터 `리소스`라고 불리는
- ┣ `파일 정보`들을 얻고 있다고 보면됨
- ┣ 서버에 의뢰를 하는 웹 브라우저 등을 `클라이언트(Client)`
- ┣ 클라이언트에서 서버까지 일련의 흐름을 결정하는 것이
- ┣ 웹에서 HTTP(HyperText Transfer Protocol)이라고 불리는 프로토콜
- ┗ 프트토콜 : 약속 이라는 의미

> 웹 : HTTP 라는 약속을 사용한 통신으로 이루어져 있음

## 1.2 HTTP는 이렇게 태어났고 성장

- HTTP에 대해서 자세하게 배우기전
- ┣ HTTP가 등장한 배경 설명
- ┗ 배경을 알게되면 초기 HTTP 목적을 쉽게 이해 가능

### 1.2.1 웹은 지식 공유를 위해 고안

- 1989년 3월 HTTP 탄생
- ┣ CREN의 팀 버너리 리 박사 멀리 떨어진 동료 연구자와 `지식을 공유`
- ┣ `목적`을 이루기 위해서 시스템을 고안
- ┣ 최초 고안 : `여러 문서`를 `상호간`에 `관련` 짓는 `하이퍼텍스트(HyperText)`
- ┗ 의해 상호간에 참조할 수 있는 `WWW(World Wide Web)` 기본 개념

- WWW 구성하는 기술로서 `문서 기술 언어`로는 `SGML`을 베이스로 한
- ┣ `HTML(HyperText Markup Language)`,
- ┣ `문서 전송` 프로토콜 : `HTTP`
- ┣ 문서의 `주소 지정` : `URL(Uniform Resource Locator)`
- ┗ 위 3가지가 제안됨

- `WWW`는 지금으로 말하면 `웹 브라우저`
- ┣ 과거에는 `하이퍼텍스트를 열람` 가능한
- ┣ `클라이언트 애플리케이션`의 명칭
- ┣ 오늘날 일련의 시스템(구조)의 명칭으로 사용되어
- ┗ `WWW` 혹은 단순히 `웹(Web)`이라 불리고 있음

### 1.2.2 웹이 성장한 시대

- 90년 11월 CREN에서 세계 최초의 웹 서버, 웹 브라우저 개발
- ┣ 그로부터 3년뒤 대한민국의 최초 홈페이지 개발
- ┣ 90년대에 `HTML1 초안(드래프트)` 검토 → 애매한 부분 많아 `폐기`
- ┣ 93년 1월 NCSA에서 현재 사용하는 브라우저의 신조인 `모자이크(Mosaic)` 개발
- ┣ 이미지 표시 인라인, 세련된 그래픽이 특징
- ┣ 그 해 가을 윈도우 판, 매킨토시 등장
- ┗ `CGI` 를 사용할 수 있는 웹 서버와 `NCSA` `HTTPd 1.0` 등장도 이 무렵

- 그 다음 해 94년 12월 `넷스케이스(Netscape)` 사에서 넷스케이프
- ┣ `네비게이터(Netscape Navigator) 1.0`을 출시하고 95년 마이크로소프트
- ┗ `인터넷 익스플로러(Internet Explorer)` 1.0과 2.0을 출시

- 이 무렵 현재 웹 서버 표준의 하나인 `아파치(Apache)`도 아파치 0.2로 등장
- ┣ HTML 2.0도 발행되며 웹이 약진하는 한 해
- ┣ 95년경 MS와 네스케이프사에 의해서 브라우저 경쟁이 과열
- ┣ 두 회사는 독자적으로 HTML 확장 → HTML 사용 유저들 곤란하게 함
- ┣ 브라우저 벤더끼리 경쟁 과열 → 웹 표준화를 모조리 무시
- ┣ 새로운 기능에 대한 문서(도큐먼트)도 없는 상황이 종종 존재
- ┣ 브라우저 경쟁은 넷스케이프사의 쇠퇴와 함께 일단락
- ┣ 그러나 Firefox의 등장으로 다시 브라우저 전쟁
- ┗ 인터넷 익스플로러의 경우 지금 사용을 잘 안하게 됨

### 1.2.3 진보 안하는 HTTP

- `HTTP/0.9`
- HTTP의 등장 : 90년대
- ┣ 정식 사양서는 아니였음
- ┗ HTTP는 1.0 이전이라는 의미에서 HTTP/0.9

- `HTTP/1.0`
- HTTP가 정식 사양으로 등장 → 96년 5월
- ┣ HTTP/1.0 으로 `RFC1945` 발행
- ┗ 초기 사양이지만 현재에도 아직 많은 서버상에서 현역으로 가동

- `RFC1945` - HyperText Transfer Protocol -- HTTP/1.0

- `HTTP/1.1`
- 97년 1월 공개된 HTTP/1.1 버전이 가장 많이 사용되는 버전
- ┣ 그 당시 사양 : RFC2068
- ┗ 개정판 : RFC2616

- 웹 문서 전송 프로토콜 등장 : HTTP 거의 버전이 업그레이드 되지 않음
- ┗ 차세대 HTTP/2.0이 책정 → 상용화까지는 좀 더 시간

- HTTP 등장한 당시 : 주로 `텍스트 전송`을 위한 `프로토콜`
- ┣ 프로토콜 자체가 심플 → 기능이 계속해서 추가
- ┗ 지금은 웹이라는 틀을 넘어서 다양하게 사용되는 프로토콜

## 1.3 네트워크의 기본은 TCP/IP

- HTTP 이해하기 위해서는 TCP/IP 프로토콜에 대한 이해가 동반
- ┣ 인터넷을 포함하여 일반적으로 사용하고 있는 네트워크는
- ┣ TCP/IP라는 프로토콜에 의해서 움직이고 있음
- ┗ HTTP는 그 중 하나

- HTTP를 이해하는데 꼭 알아 두어야 할 TCP/IP 개념만 설명

### 1.3.1 TCP/IP는 프로토콜의 집합

- 컴퓨터와 네트워크 기기가 상호간에 통신하기 위해서
- ┣ 서로 같은 방법으로 통신하지 않으면 안됨
- ┣ 1. 어떻게 상대를 `찾고`
- ┣ 2. 어떻게 상대에게 이야기를 `시작`하고
- ┣ 3. `어떠한 언어`로 이야기를 하며
- ┣ 4. 어떻게 이야기를 `종료`할까
- ┗ 위와 같은 규칙을 결정할 필요가 있음

- 서로 다른 하드웨어와 운영체제를 가지고
- ┣ 서로 통신을 진행하기 위해서는
- ┗ 모든 요소에 규칙을 필요하게 됨

> 위와 같은 규칙 : 프로토콜

- 프로토콜에는 여러 가지 존재
- ┣ 1. 케이블 규격, 2. IP 주소 지정 방법
- ┣ 3. 떨어진 상대를 찾기 위한 방법
- ┣ 4. 수신지에 도달하는 순서
- ┗ 5. 웹을 표시하기 위한 순서

- 인터넷과 관련된 프로토콜들을 모은 것 : `TCP/IP`
- ┣ TCP 와 IP 프토콜을 가리켜 → `TCP/IP`
- ┣ IP 프토토콜을 사용한 통신에서 사용되고 있는 프로토콜 총칭
- ┗ TCP/IP 라는 이름이 사용되고 있음

### 1.3.2 계층으로 관리하는 TCP/IP

- TCP/IP에서 중요한 개념 중 하나 : `계층(Layer)`
- ┣ `1. 애플리케이션 계층`
- ┣ `2. 트랜스포트 계층`
- ┣ `3. 네트워크 계층`
- ┣ `4. 링크 계층`
- ┗ 위와 같이 4계층으로 나누어져 있음

- TCP/IP가 `계층화` 된것은 `메리트`가 있기 때문
- ┣ 인터넷이 `하나의 프로토콜`일 경우 :
- ┣ `어디선가 사양`이 `변경`되었을 때 `전체를 바꾸지 않으면 안됨`
- ┣ `계층화` → `사양이 변경된 해당 계층만 변경`
- ┣ 계층은 `계층이 연결되어 있는 부분만 결정`
- ┗ 각 계층의 내부는 `자유롭게 설계가 가능`

- 계층화의 또 다른 장점
- ┗ 설계를 편하게 가능

> 결론적으로 자기 계층에 대한 고려만 하면 됨

#### 애플리케이션 계층

- `애플리케이션 게층` : `유저에게 제공되는 애플리케이션`에서
- ┣ `사용하는 통신의 움직임`을 결정
- ┣ `TCP/IP`에는 `여러 가지의 공통 애플리케이션`이 준비
- ┣ `FTP, DNS` 등도 애플리케이션의 한 가지
- ┗ `HTTP`도 이 계층에 `포함`

#### 트랜스포트 계층

- `트랜스포트 계층` : 애플리케이션 계층에
- ┣ 네트워크로 접속되어 있는 2대의 `컴퓨터 사이의 데이터 흐름` 제공
- ┣ `1. TCP(Transmission Control Protocol)`
- ┣ `2. UDP(User Data Protocol)`
- ┗ 위 `두 가지 다른 성질을 가진 프로토콜` 존재

#### 네트워크 계층(혹은 인터넷 계층)

- `네트워크 계층` : 네트워크 상에서 `패킷의 이동`을 다룸
- ┣ `패킷` : 전송하는 `데이터의 최소 단위`
- ┣ 어떠한 `경로(절차)을 거쳐 상대의 컴퓨터까지 패킷을 보낼지`를 결정
- ┣ 인터넷의 경우 `여러대의 컴퓨터를 거쳐 상대방`에게
- ┗ 여러 가지 `선택지 중 하나의 길`을 결정 → 네트워크 계층의 역할

#### 링크 계층(데이터 링크 계층, 네트워크 인터페이스 계층)

- 네트워크에 접속하는 `하드웨어적인 면`
- ┣ `운영체제가 하드웨어를 제어`
- ┣ 디바이스 `드라이버`, `네트워크 인터페이스 카드(NIC)`
- ┣ 케이블 등과 같이 `물리적으`로 보이는 부분(커넥트 등을 포함)
- ┗ `하드웨어적 측면` : `링크 계층`의 역할

### 1.3.3 TCP/IP 통신의 흐름

- TCP/IP 계층의 순서대로 거쳐 상대와 통신
- ┣ `송신측` : 애플리케이션 계층부터 `내려감`
- ┗ `수신측` : 애플리케이션 계층으로 `올라감`

> 1. 애플리케이션 계층

- HTTP 예 : `송신측 클라이언트의 애플리케이션 계층(HTTP)`
- ┗ 어느 웹 페이지를 보고 싶다라고 `HTTP 리퀘스트 지시`

> 2. 트랜스포트 계층

- `트랜스포트 계층(TCP)` : 데이터(HTTP 메시지) `통신하기 쉽게 낸 뒤`
- ┗ `안내 번호`, `포트 번호`를 붙여 `네트워크 계층에 전달`

> 3. 네트워크 계층

- `네트워크 계층(IP)` : 수신지 MAC 주소를 추가 한 뒤
- ┗ 링크 계층에 전달

> 위와 같은 준비를 통해서 데이터 네트워크 송신 준비를 마침

- 수신측의 경우 송신측의 반대로 행동하게 됨

- 각 계층을 거칠 때는 반드시 `헤더`를 해당 계층에 필요한 정보 추가
- ┗ 수신측 : 해당 계층마다 사용한 헤더를 삭제!!!

## 1.4 HTTP와 관계가 깊은 프로토콜 → IP/TCP/DNS

- TCP/IP 중에서 HTTP와 관계가 깊은 IP, TCP, DNS 세 개의 프로토콜

### 1.4.1 배송을 담당하는 IP

- `IP(Internet Protocol)`는 계층으로 말하자면 네트워크 층에 해당
- ┣ `Internet Protocol` 이라는 과장된 이름이 지어져 있지만
- ┣ 실제 이름 그대로 인터넷에 활용하는 거의 대부분 시스템
- ┗ `IP를 이용`하고 있음

> IP는 TCP/IP 명칭의 일부가 되는 중요한 프로콜

> 간혹 IP 주소와 IP 혼동 하지만 IP === 프로토콜

- IP의 역할 :
- ┣ `패킷을 상대방에게 전달`
- ┣ 전달에는 여러 요소가 필요
- ┗ 그 중 IP주소, MAC 주소(Media Access Control Address) 중요

- `IP 주소` : `각 노드`에 `부여`된 `주소`를 가르킴
- ┣ `MAC 주소` : 각 `네트워크 카드`에 할당된 `고유의 주소`
- ┣ IP 주소는 MAC 주소와 `연관`
- ┣ `IP 주소` : `변경 가능`
- ┗ `MAC 주소` : `변경 불가`

#### 통신은 APR을 이용하여 MAC 주소에 함

- IP 통신 : MAC 주소에 의존해서 통신
- ┣ 인터넷에서 통신 상대가 같은 랜선 → 경우의 수가 너무 작음
- ┣ 중계하는 동안에는 다음으로 중계할 곳의 MAC 주소를 사용하여
- ┣ 목적지를 찾아가게 됨
- ┗ 이 때 `APR(Address Resolution Protocol) 프로토콜` 사용

- `APR` : 주소를 해결하기 위한 프로토콜 중 하나
- ┗ `수신지의 IP 주소`를 바탕으로 `MAC 주소를 조사 가능`

#### 그 누구도 인터넷 전체를 파악하고 있지는 않음

- 목적지까지 중계를 하는 도중에 컴퓨터와 라우터 등의
- ┣ 네트워크 기기는 목적지에 도착하기까지 대략적인 목적지만 암
- ┣ 이 시스템 : `라우팅` → 택배 배송과 흡사
- ┗ 대략적인 시스템만 이해하고 있지 전체를 상세하게 파악하고 있지 못하다는 것

### 1.4.2 신뢰성을 담당하는 TCP

- `TCP(Transfer Control Protocol)`는 계층으로 말하자면
- ┣ `트랜스포트 층`에 해당
- ┣ `신뢰성 있는 바이트 스트림 서비스`를 제공
- ┣ `바이트 스트림 서비스` : `용량`이 `큰 데이터`를 보내기 쉽게
- ┣ `세그먼트`라고 불리는 `단위 패킷`으로 `작게 분해`하여 관리
- ┣ `신뢰성 있는 서비스` : 상대방에게 보내는 서비스
- ┣ 결국 `TCP` : `대용량의 데이터`를 `보내기 쉽게` `1. 작게 분리`하여 보냄
- ┗ `2. 정확하게 도착했는지 확인`하는 역할을 담당

#### 상대에게 데이터를 확실하게 보내는 것이 일

- 상대에게 확실하게 데이터를 보내기 위해서
- ┣ TCP : `쓰레웨이 핸드셰이킹(three way handshaking)` 방법 사용
- ┣ 패킷을 바로 보내고 나서 끝내는 것이 아닌, 보내졌는지 여부 확인
- ┗ 이것은 `SYN`, `ACK` 라는 `TCP 플래그` 사용

- `송신측` : `최초 SYN 플래그`로 `상대에게 접속함과 동시에 패킷`을 보냄
- ┣ `수신측` : `SYN/ACK` 플래그로 `송신측`에 `접속함과 동시에 패킷 수신 사실 전달`
- ┗ 마지막으로 `송신측` : `ACK 플래그`를 보내 패킷 교환 완료 알림

> 이 과정중 어디선가 통신이 도중에 끊어지면 TCP
> 같은 순서로 패킷을 재전송

> TCP : 쓰리웨이 핸드쉐이킹 이외에도 통신의 신뢰성 보장을 위해 힘씀

## 1.5 이름 해결을 담당하는 DNS

- `DNS(Domain Name System)` : HTTP와 같이 `응용 계층 시스템`에서
- ┣ 도메인 이름과 IP 주소 이름 확인을 제공
- ┣ 컴퓨터 : IP 주소와는 별도로 호스트 이름과 도메인 이름 붙일 수 있음
- ┣ ex ) https:google.com
- ┣ 주로 사용자 : IP 주소 대신 이름을 이용하여 상대의 컴퓨터를 지정
- ┣ 인간 : 숫자 나열 보다 영어, 숫자 가독성이 좋음
- ┣ 컴퓨터 : 숫자 나열이 좀 더 해석 쉬움
- ┗ 이 문제를 해결하기 위해 DNS 존재

> DNS : 도메인명 → IP 주소를 조사
> IP 주소 → 도메인명을 조사

## 1.6 각각과 HTTP와의 관계

- HTTP와 관계가 깊은 TCP/IP 프로토콜에 대해서 살펴봄
- ┗ IP, TCP, DNS가 HTTP를 이용해 통신 할 때 각각 어떤 역할 하는지 학습

## 1.7 URI와 URL

- URI 보다 URL(Uniform Resource Locator)이 익숙
- ┣ 웹 브라우저 등으로 웹 페이지를 표시하기 위해 입력하는 주소
- ┗ 이것을 URL 이라고 부름

### 1.7.1 URI는 리소스 식별자

- URI(Uniform Resource Identifiers)의 약자
- ┗ RFC2396에서는 각각의 단어가 다음과 같이 정의

#### Uniform

- `통일(Uniformity)`된 `서식을 결정`하는 것
- ┣ 여러 가지 종류의 `리소스 지정 방법`을 같은 맥락에서
- ┣ `구별없이 취급`할 수 있게 함
- ┗ `새로운 스키마(http, ftp)도입`을 `용이`하게 함

#### Resource

- `리소스` : `식별 가능한 모든 것` 이라고 정의되어 있음
- ┣ 도큐먼트 파일 뿐만 아닌 `이미지와 서비스(ex: 일기예보)`
- ┣ `다른 것과 구별할 수 있는` 것 : 모두 리소스
- ┣ 리소스는 `단일한 부분만 아니라 `
- ┗ `복수의 집합`도 `리소스`로 파악 가능

#### Identifier

- `식별 가능한 것을 참조`하는 `오브젝트` : `식별자`로 불림
- ┣ 결국 URI : `스키마`를 나타내는 리소스를 식별하기 위한 식별자
- ┗ 스키마는 `리소스를 얻기 위한 수단에 이름`을 붙이는 `방법`

- `HTTP`의 경우 `'http'` 사용
- ┗ `'ftp'`, `'mailto'`, `'telnet'`, `'file'`등이 존재

- `URI` : 리소스를 식별하기 위한 문자열 전반을 나타냄
- `URL` : 리소스의 장소(네트워크 상의 위치)를 나타냄
- ┣ `URL`은 `URI`의 `서브셋`
- ┗ 이후에 URI라는 말을 URL로 변경해도 무상관

### 1.7.2 포맷

- URI
- ┣ 1. `완전 수식 절대 URI` : 필요한 정보 전체를 지정하는
- ┣ 2. `완전 수식 절대 URL`
- ┣ 3. `상대 URL` : 기준 URI에서 상대적 위치를 `*/image/log.gif` 같이 지정
- ┗ 들과 같은 URI들이 존재

- 절대 URI 포맷

| http:// | user:pass                 | @   | www.google.com | :80      | dir/index.htm     | ?   | uid=1       | #   | ch1                     |
| ------- | ------------------------- | --- | -------------- | -------- | ----------------- | --- | ----------- | --- | ----------------------- |
| 스키마  | 자격정보 <br/> (크리덴셜) |     | 서버주소       | 서버포트 | 계층적 파일 <br/> |     | 쿼리 문자열 |     | 프래그먼트 <br/> 식별자 |

1. `http:`, `https:` 같은 `스키마`를 사용하여 `리소스를 얻기 위해`

   - ┣ `사용하는 프로토콜`을 지시
   - ┣ `대문자, 소문자 무시`, `마지막`에 `콜론(:)`
   - ┗ `data.`, `javascript:` 같이 데이터와 프로그램을 지정가능

2. `자격정보(크리덴셜)`

   - ┣ `서버로부터 리소스`를 취득하기 위해
   - ┣ `자격정보(크리덴셜)`이 필요함
   - ┗ 유저명, 패스워드 지정 가능 이는 `옵션`

3. `서버 주소`

   - ┣ `완전 수식 형식`인 `URI`에서는 `서버 주소를 지정할 필요가 없이`
   - ┣ `DNS 이름`, `192.168.1.1` 과 같은 `IPv4` 주소나
   - ┗ `[0:0:0:0:0:0:0:1]` 고 같은 `Ipv6` 주소를 대괄호로 묶어서 지정

4. `서버 포트`

   - ┣ 서버의 접속 대상이 되는 `네트워크 포트 번호를 지정`
   - ┗ `생략`하면 `디폴트 포트`가 사용

5. `계층적 파일 패`스

   - ┣ 특정 리소스를 식별하기 위해서 `서버상의 파일 패스`를 지정
   - ┗ `UNIX 디렉토리 지정 방법과 비슷`

6. `쿼리 문자열`

   - ┣ 파일 패스로 지정된 리소스에 `임의의 파라미터 넘겨주기 위해`
   - ┗ 사용되며 이는 `옵션`

7. `프래그먼트 식별자`

   - ┣ 주로 취득한 리소스에서 `서브 리소스(도큐먼트 중간에 위치)`를 가리킴
   - ┣ `프래그먼트 식별자`가 사용됨
   - ┗ 이는 `옵션`

### 실제 사양대로 되지 않을수 있음

- HTTP의 경우 기술 사양을 정한 몇 가지 `RFC(Request for Comments)` 문서가 존재
- ┣ 보통 RFC 사양에 정해져 있는 내용대로 구성하지만
- ┣ (RFC를 사용하지 않고서는 HTTP 사용불가 → HTTP 사용은 무조건 RFC)
- ┣ 특별한 경우 따르지 않고 독자적으로 확장 경우도 존재
- ┗ RFC를 따르지 않으면 구태여 독자적인 사양에 맞출 필요가 없음
