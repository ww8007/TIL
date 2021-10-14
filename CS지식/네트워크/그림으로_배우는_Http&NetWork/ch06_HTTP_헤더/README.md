# 6. HTTP 헤더

- 평소에는 볼 수 없지만
- ┣ HTTP request, HTTP response 내용에 반드시
- ┗ 헤더가 포함되어 있음

## 6.1 HTTP 메시지 헤더

- HTTP 프로토콜의 request, response
- ┣ 반드시 메시지 헤더가 포함되어 잇음
- ┣ 메시지 헤더 : client, server 리스폰스를
- ┗ 처리하기 위한 정보가 들어있음

### 리퀘스트의 HTTP 메시지

- ┣ 1. `메소드`, 2. `URI`, 3. `HTTP 버전`
- ┣ 4. `HTTP 헤더 필드`로 구성
- ┣ 개행 문자(CR+LF)
- ┗ 메시지 바디

| 메시지 헤더      |
| ---------------- |
| 개행 문자(CR+LF) |
| 메시지 바디      |

### response의 HTTP 메시지

- ┣ 1. HTTP 메시지, 2. HTTP 버전
- ┣ 3. 상태코드(코드와 설명)
- ┗ 4. HTTP 헤더 필드로 구성

| 메시지 헤더      |
| ---------------- |
| 개행 문자(CR+LF) |
| 메시지 바디      |

> 다양한 정보를 가지고 잇는 HTTP 헤더 필드

    헤더 필드 : request, response 양쪽에 존재
    ┣ HTTP 메시지에 대한 정보를 가지고 있음
    ┣ 헤더 필드 : HTTP 버전 확장 사양에 따라서
    ┣ 지원하는 내용이 달라지지만
    ┗ 여기에서는 HTTP/1.1과 일반적 사용만 다룸

## 6.2 HTTP 헤더 필드

### 6.2.1 HTTP 헤더 필드는 중요한 정보를 전달한다

- HTTP 헤드 필드 : HTTP 메시지를 구성하는 요소의 하나
- ┣ 헤더 필드 : HTTP 프로토콜 중에서 client <-> server
- ┣ 통신에 `request, response` 모두에서 사용
- ┗ 부가적으로 → 중요한 정보를 전달하는 역할을 담당

> 또한

    1. 메시지 바디의 크기
    2. 사용하고 있는 언어
    3. 인증 정보를 브라우저에, 서버에 제공

### 6.2.2 HTTP 헤더 필드의 구조

- HTTP 헤드 필드 : 헤더 `필드명`, `필드 값`으로 구성
- ┗ `콜론 (.)`으로 나뉘어져 있음

> 헤더 필드 명 : 필드 값

- ex ) 바디의 오브젝트의 타입을 가리키는
- ┣ Content-Type을 예시로 가능
- ┗ `Content-Type:text/html`

- 다음과 같이 하나의 `HTTP 헤더 필드가 여러 개`의
- ┗ `필드 값`을 가질 수 있음

```html
Keep-Alive:timeout=15,max=100
```

> HTTP 헤더 필드가 중복된 경우

     HTTP 헤더 필드 명이 같은게 2개 이상
     ┣ 이 경우에는 브라우저마다 다르게 동작
     ┣ 어떤 브라우저의 경우 최초 처리
     ┗ 어떤 브라우저 : 마지막 처리

### 6.2.3 4종류의 HTTP 헤더 필드

- HTTP 헤더 필드 : 용도에 따라서 4종류로 구분 가능

1. 일반적 헤더 필드(General Header Fields)

- request 메시지와 response 메시지 둘 다 사용되는 헤더

2. 리퀘스트 헤더 필드(Request Header Fields)

- `client 측`에서 서버 측으로 송신된 → `request`
- ┣ 메시지에 사용되는 헤더임
- ┣ 1. `request의 부가적 정보`
- ┣ 2. `client의 정보`
- ┗ 3. response 콘텐츠에 관한 `우선 순위 정보`를 부가

3. 리스폰스 헤더 필드(Response Header Fields)

- server → client 측으로 송신한 response 메시지에 사용
- ┣ 1. `response의 정보`
- ┣ 2. `server의 정보`
- ┗ 3. `클라이언트의 추가 정보 요구` 등을 부가

4. 엔티티 헤더 필드(Entity Header Fields)

- request 메시지와 response 메시지에 포함된
- ┣ 엔티티에 사용되는 헤더로
- ┗ 콘텐츠 갱신 시간등의 `엔티티 정보를 부가`

### 6.2.4 HTTP/1.1 헤더 필드 일람

- HTTP/1.1에 정의되어 있는 헤더 필드에는 47종류가 존재

#### 일반 헤더 필드

| 헤더 필드 명      | 설명                              |
| ----------------- | --------------------------------- |
| Cache-Control     | 캐싱 동작 지정                    |
| Connection        | Hop-by-hop 헤더, 커넥션 관리      |
| Date              | 메시지 생성 날짜                  |
| Pragma            | 메시지 제어                       |
| Trailer           | 메시지 끝에 있는 헤더의 일람      |
| Transfer-Encoding | 메시지 바디의 전송 코딩 형식 지정 |
| Upgrade           | 다른 프로토콜에 업그레이드        |
| Via               | 프록시 서버에 관한 정보           |
| Warning           | 에러 통지                         |

#### 리퀘스트 헤더 필드

| 헤더 필드 명                | 설명                                                             |
| --------------------------- | ---------------------------------------------------------------- |
| Accept                      | 유저 에이전트가 처리 가능한 미디어 타입                          |
| Accept-Charset              | 문자셋 우선 순위                                                 |
| Accept-Encoding             | 콘텐츠 인코딩 우선 순위                                          |
| Accept-Language             | 언어(자연어) 우선 순위                                           |
| Authorization               | 웹 인증을 위한 정보                                              |
| Expect                      | 서버에 대한 특정 동작의 기대                                     |
| From                        | 유저의 메일 주소                                                 |
| If-Match 엔티티 태그의 비교 |
| If-Modified-Since           | 리소스의 갱신 시간 비교                                          |
| If-None-Match               | 앤티티 태그의 비교(If-Math의 반대)                               |
| If-Range                    | 리소스가 갱신되지 않은 경우에 인티티의 바이트 범위의 요구를 송신 |
| If-Unmodified-Since         | 리소스의 갱신 시간 비교(If-Modified-Since의 반대)                |
| Mat-Forwards                | 최대 전송 홉 수                                                  |
| Proxy-Authorization         | 프록시 서버의 클라이언트 인증을 위한 정보                        |
| Range                       | 엔티티 바인트 번위 요구                                          |
| Refer                       | request 중의 URI 취득                                            |
| TE                          | 전송 이코딩의 우선 순위                                          |
| User-Agent                  | HTTP 클라우이언트의 정보                                         |

#### response 헤더 필드

| 헤더 필드 명       | 설명                                              |
| ------------------ | ------------------------------------------------- |
| Accept-Ranges      | 바이트 단위의 요구를 수신할 수 있는지/없는지 여부 |
| Age                | 리소스의 지정 경과 시간                           |
| Etag               | 리소스 특정하기 위한 정보                         |
| Location           | client에 지정한 URI에 리다이렉트                  |
| Proxy-Authenticate | 프록시 서버의 클라이언트 인증을 위한 정보         |
| Retry-After        | 리퀘스트 재시행의 타이밍 요구                     |
| Server             | HTTP 서버 정보                                    |
| Vary               | 프록시 서버에 대한 캐시 관리 정보                 |
| WWW-Authenticate   | 서버의 클라이언트 인증을 위한 정보                |

#### 엔티티 헤더 필드

| 헤더 필드 명     | 설명                                 |
| ---------------- | ------------------------------------ |
| Allow            | 리소스에 제공하는 HTTP 메서드        |
| Content-Encoding | 엔티티 바디에 적용되는 콘텐츠 인코딩 |
| Content-Language | 엔티티의 자연어                      |
| Content-Length   | 엔티티 바디의 사이즈(단위: 바이트)   |
| Content-Location | 리소스에 대응하는 대체 URI           |
| Content-MD5      | 엔티티 바디의 메시지 다이제스트      |
| Content-Range    | 엔티티 바디의 범위 위치              |
| Content-Type     | 엔티티 바디의 미디어 타입            |
| Expires          | 엔티티 바디의 유효기간 날짜          |
| Last-Modified    | 리소스의 최종 갱신 날짜              |

### 6.2.5 HTTP/1.1 이외의 헤더 필드

- HTTP에서 교환되는 HTTP 헤더 필드가
- ┣ RFC2616에서 정의된 47종류만 존재하는 것은 아님
- ┣ `쿠키 - Set-Cookie`
- ┣ `Content-Disposition`과 같은
- ┣ RFC에 정의되어 폭 넓게 사용되고 있는 것도 있음
- ┣ 이러한 비표준 헤더 필드의 경우
- ┗ `RFC4229 HTTP Header Field Registrations`에 정리

### 6.2.6 End-to-end 헤더와 Hop-by-hop 헤더

- HTTP 헤더 필드 : `캐시와 비캐시 프록시의 동작을 구분`위해
- ┗ 두가지 카테고리로 분리가 되어있음

#### End-to-end 헤더

- 이 카테고리의 헤더는 `request, response 최종 수신자`에게
- ┣ 전송이 됨
- ┣ `캐시에서 구축된 response 중 보존`되야 하고
- ┗ 다시 전송되지 않으면 안되도록 설정이 되어있음

#### Hop-by-hop 헤더

- `한 번 전송에 대해서만 유효`하고
- ┣ 캐시와 프록시에 의해서는 `전송되지 않는 것도 있음`
- ┣ HTTP/1.1과 이 이후에서 사용되는
- ┗ Hop-by-hop 헤더 : `Connection 헤더 필드에 열거`

- HTTP/1.1에서 hop-by-hop 헤더에는 8개 헤드 필드 존재

1. Connection
2. Keep-Alive
3. Proxy-Authenticate
4. Proxy-Authorization
5. Trailer
6. TE
7. Transfer-Encoding
8. Upgrade

> 이외의 것들은 모두 End-by-end 헤더에 분류가 됨
