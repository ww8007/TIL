# 28. 응용 계층의 역할

- OSI 모델의 응용 계층의 역할에 대해서 학습

## 28.1 응용 계층의 역할

- 애플리케이션 : 사용자가 하고 싶은 일을 할 수 있도록
- ┣ 도와주는 역할을 하도록 함
- ┣ 1. `서비스를 요청하는 측(사용자 측)`
- ┣ 2. `사용하는 애플리케이션`
- ┗ 2가지로 분류가 가능함

- 서비스를 요청하는 측이 있다는 것
- ┣ → 서비스를 제공하는 측도 존재 한다는 의미
- ┣ 서비스 요청 : 클라이언트
- ┗ 서비스 제공 : 서버

- 서비스 제공의 서버의 경우
- ┣ 1. `웹 서버 프로그램`
- ┣ 2. `메일 서버 프로그램`
- ┣ 애플리케이션이 동작 → 응용 계층에 속함
- ┣ 응용 계층 : 5계층의 세션 계층, 6계층의 표현 계층
- ┣ 응용 계층에서 `client 측의 요청을 전달`하기 위해서

- ┣ 통신 대상(서버)이 이해할 수 있는
- ┣ 1. `메시지(데이터)로 변환`
- ┣ 2. `전송 계층으로 전달`하는 역할
- ┣ 클라이언트 측 애플리케이션(웹 브라우저, 메일 프로그램)이
- ┣ 서버 측 애플리케이션(웹 서버 프로그램, 메일 서버)과 통신
- ┗ `응용 계층의 프로토콜`을 사용해야 함

- 웹 사이트 볼 때 : `HTTP`
- ┣ 파일을 전송 : `FTP`
- ┣ 메일을 보낼 때 : `SMTP`
- ┣ 메일을 받을 때 : `POP3`
- ┗ 등의 `프로토콜`을 사용함

> 네트워크에서 컴퓨터, 네트워크 장비에 붙인 이름 기반

    IP 주소를 알아내는 것
    ┣ → 이름 해석 위해서
    ┣ (name resolution)
    ┗ DNS를 사용하게 됨

| 프토토콜 | 내용           |
| -------- | -------------- |
| HTTP     | 웹 사이트 접속 |
| DNS      | 이름 해석      |
| FTP      | 파일 전송      |
| SMTP     | 메일 송신      |
| POP3     | 메일 수신      |

- 응용 계층의 프토콜이 5개만 존재하는 것은 X
- ┗ 대표적인 5개의 프로토콜만 소개한 것

- 응용 게층 : 각각의 애플리케이션에 대응되는
- ┣ 데이터를 전송하는 역할을 함
- ┣ 응용 계층에서 보내려는 데이터 :
- ┣ 하위 계층 → 1. `전송 계층` 2. `네트워크 계층`
- ┗ 3. `데이터 링크 계층` 4. `물리 계층 순서`로 처리

- 응용 계층 : HTTP | DNS | FTP | SMTP | POP3
- 전송 계층 : TCP | UDP
- 네트워크 계층 : IP 등
- 데이터 링크 계층 : 이더넷
- 물리 계층 : 전기 신호 변환

## 28. 정리

1. 서비스를 `요청`하는 측 : `client`

- 서비스를 `제공`하는 측 : `server`

2. 클라이언트에서 사용하는 애플리케이션과

- ┣ 서버에서 사용하는 서버 프로그램 간의 통신 :
- ┗ 응용 계층 → `프로토콜`을 사용

3. 응용 계층의 주요 프로토콜

- `HTTP, FTP, DNS, SMTP, POP3` 등이 존재
