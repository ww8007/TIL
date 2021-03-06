# 30. DNS 서버의 구조 (이름 해석)

- 응용 계층 : 이름 해석을 통해 도메인 이름을
- ┣ `IP 주소로 변환하는 역할`을 하는
- ┗ `DNS가 존재`

## 30.1 도메인 이름이란?

- 기본적으로 컴퓨터(server)에는 IP 주소가 있어야
- ┣ 인터넷을 통한 웹 서버 접속 후 → 웹 사이트 볼 수 있음
- ┗ 그러나 모든 사이트들은 URL를 사용

- `DNS` : `URL을 IP주소로 변환하는 서비스(시스템)`

> 숫자로 된 IP의 경우 사람들이 기억을 못함

    이 이유로 DNS의 이름 해석 사용

- www.google.com 접속
- ┣ DNS 서버의 `이름 해석(name resolution)`
- ┗ 을 이용하여 IP주소로 변환

- www.google.com
- ┣ 컴퓨터나 네트워크를 식별하기 위해 붙여진 이름
- ┣ `도메인 이름`
- ┣ 도메인 이름 앞에 있는 wwww
- ┣ `호스트 이름(서버 이름)`

> 도메인 이름에 해당하는 IP 주소의 유추

    1. 컴퓨터 → DNS 서버
    ┣ IP 주소 요청
    2. DNS 서버 → 컴퓨터
    ┣ IP 주소 응답
    3. 컴퓨터
    ┗ IP 주소로 접속

> 하지만 한 번에 IP 주소를 알 수 없는 경우도 존재

    이 경우 DNS 1, 2 서버로 요청을 하여
    ┣ IP 주소를 알 때 까지 요청함
    ┣ 전 세게에 흩어져 있고
    ┗ 계층적으로 연결되어 있음

## 30. 정리

1. DNS 서버 : 이름 해석을 사용하여 → 도메인 이름 → IP 주소 변환

2. URL : `호스트 이름`과 `도메인 이름`이 있음

- ┣ www.google.com 에서
- ┣ google.com : `도메인 이름`
- ┗ www : `호스트 이름`

3. 요청받은 DNS 서버가 해당 도메인 이름의

- IP 주소를 모르는 경우에는
- ┗ `다른 DNS 서버에 요청`하여 알아냄

4. DNS 서버 : 전 세계에 흩어져 있으므로 연계하면서 동작
