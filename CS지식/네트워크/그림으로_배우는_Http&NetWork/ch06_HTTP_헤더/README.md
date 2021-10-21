# 6. HTTP 헤더

- 평소에는 볼 수 없지만
- ┣ HTTP request, HTTP response 내용에 반드시
- ┗ 헤더가 포함되어 있음

## 목차

- [6. HTTP 헤더](#6-http-헤더)
  - [목차](#목차)
  - [6.1 HTTP 메시지 헤더](#61-http-메시지-헤더)
    - [리퀘스트의 HTTP 메시지](#리퀘스트의-http-메시지)
    - [response의 HTTP 메시지](#response의-http-메시지)
  - [6.2 HTTP 헤더 필드](#62-http-헤더-필드)
    - [6.2.1 HTTP 헤더 필드는 중요한 정보를 전달한다](#621-http-헤더-필드는-중요한-정보를-전달한다)
    - [6.2.2 HTTP 헤더 필드의 구조](#622-http-헤더-필드의-구조)
    - [6.2.3 4종류의 HTTP 헤더 필드](#623-4종류의-http-헤더-필드)
    - [6.2.4 HTTP/1.1 헤더 필드 일람](#624-http11-헤더-필드-일람)
      - [일반 헤더 필드](#일반-헤더-필드)
      - [리퀘스트 헤더 필드](#리퀘스트-헤더-필드)
      - [response 헤더 필드](#response-헤더-필드)
      - [엔티티 헤더 필드](#엔티티-헤더-필드)
    - [6.2.5 HTTP/1.1 이외의 헤더 필드](#625-http11-이외의-헤더-필드)
    - [6.2.6 End-to-end 헤더와 Hop-by-hop 헤더](#626-end-to-end-헤더와-hop-by-hop-헤더)
      - [End-to-end 헤더](#end-to-end-헤더)
      - [Hop-by-hop 헤더](#hop-by-hop-헤더)
  - [6.3 HTTP/1.1 일반 헤더 필드](#63-http11-일반-헤더-필드)
    - [6.3.1 Cache-Control](#631-cache-control)
      - [Cache-Control 디렉티브 일람](#cache-control-디렉티브-일람)
      - [캐시가 가능한지 여부를 나타내는 디렉티브](#캐시가-가능한지-여부를-나타내는-디렉티브)
      - [캐시로 보존 가능한 것을 제어하는 디렉티브](#캐시로-보존-가능한-것을-제어하는-디렉티브)
      - [캐시 기한이나 검증을 지정하는 디렉티브](#캐시-기한이나-검증을-지정하는-디렉티브)
      - [Cache-Control 확장](#cache-control-확장)
    - [6.3.2 Connection](#632-connection)
    - [6.3.3 Date](#633-date)
    - [Pragma](#pragma)
    - [6.3.5 Trailer](#635-trailer)
    - [6.3.6 Transfer-Encoding](#636-transfer-encoding)
    - [6.3.7 Upgrade](#637-upgrade)
    - [6.3.8 Via](#638-via)
    - [6.3.9 Warning](#639-warning)
  - [6.4 리퀘스트 헤더 필드](#64-리퀘스트-헤더-필드)
    - [6.4.1 Accept](#641-accept)
    - [6.4.2 Accept-Charset](#642-accept-charset)
    - [6.4.3 Accept-Encoding](#643-accept-encoding)
    - [6.4.4 Accept-Language](#644-accept-language)
    - [6.4.5 Authorization](#645-authorization)
    - [6.4.6 Expect](#646-expect)
    - [6.4.7 From](#647-from)
    - [6.4.8 Host](#648-host)
    - [6.4.9 If-Match](#649-if-match)
    - [6.4.10 If-Modified-Since](#6410-if-modified-since)
    - [6.4.12 If-Range](#6412-if-range)
    - [6.4.13 If-Unmodified-Since](#6413-if-unmodified-since)
    - [6.4.14 Max-Forwards](#6414-max-forwards)
    - [6.4.15 Proxy-Authorization](#6415-proxy-authorization)
    - [6.4.16 Range](#6416-range)
    - [6.4.17 Refer](#6417-refer)
    - [6.4.18 TE](#6418-te)
    - [6.4.19 User-Agent](#6419-user-agent)
  - [6.5 리스폰스 헤더 필드](#65-리스폰스-헤더-필드)
    - [6.5.1 Accept-Ranges](#651-accept-ranges)
    - [6.5.2 Age](#652-age)
    - [6.5.3 ETag](#653-etag)
      - [강력한 ETag 값과 약한 ETag 값](#강력한-etag-값과-약한-etag-값)
    - [6.5.4 Location](#654-location)
    - [6.5.5 Proxy-Authenticate](#655-proxy-authenticate)
    - [6.5.6 Retry-After](#656-retry-after)
    - [6.5.7 Server](#657-server)
    - [6.5.8 Vary](#658-vary)
    - [6.5.9 WWW-Authenticate](#659-www-authenticate)
  - [6.6 엔티티 헤더 필드](#66-엔티티-헤더-필드)
    - [6.6.1 Allow](#661-allow)
    - [6.6.2 Content-Encoding](#662-content-encoding)
    - [6.6.3 Content-Language](#663-content-language)
    - [6.6.4 Content-Length](#664-content-length)
    - [6.6.5 Content-Location](#665-content-location)
    - [6.6.6 Content-MD5](#666-content-md5)
    - [6.6.7 Content-Range](#667-content-range)
    - [6.6.8 Content-Type](#668-content-type)
    - [6.6.9 Expires](#669-expires)
    - [6.6.10 Last-Modified](#6610-last-modified)

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

## 6.3 HTTP/1.1 일반 헤더 필드

- 일반 헤더 필드 : `request 메시지`, `response 메시지`
- ┗ `양쪽에서 사용되는 헤더`임

### 6.3.1 Cache-Control

- Cache-Control 헤더 : 디렉티브로 불리는 명령을 사용하여
- ┣ 캐싱 동작을 지정하게 됨
- ┣ 지정한 디렉티브 : 파라미터가 있는 것, 없는 것 존재
- ┣ 여러개의 데렉티브를 지정하는 경우 → `콤마(,)` 사용
- ┗ Cache-Control 디렉티브 : request, response 할 때 사용 가능

#### Cache-Control 디렉티브 일람

- 사용 가능한 디렉티브를 request, response로 나눠서
- ┗ 다음과 같이 나타냄

| 디렉티브           | 파라미터  | 설명                                                 |
| ------------------ | --------- | ---------------------------------------------------- |
| no-cache           | 없음      | 오리진 서버에 강제적인 재검증                        |
| no-store           | 없음      | 캐시는 리퀘스트, 리스폰스의 일부분을 보존해서는 안됨 |
| max-age = [초]     | 필수      | 리스폰스의 최대 age 값                               |
| max-state (= [초]) | 생략 가능 | 기한이 지난 리스폰스를 수신                          |
| min-fresh = [초]   | 필수      | 지정한 시간 이후에 변경된 리스폰스를 보냄            |
| no-transform       | 없음      | 프록시는 미디어 타입을 변환해서는 안됨               |
| only-if-cached     | 없음      | 캐시에서 리소스를 취득                               |
| cache-extension    | -         | 새로운 디렉티브를 위해서 토큰                        |

> 캐시 리소폰스 디렉티브

| 디렉티브         | 파라미터  | 설명                                                               |
| ---------------- | --------- | ------------------------------------------------------------------ |
| public           | 없음      | 어딘가에 리스폰스 캐시가 가능                                      |
| private          | 생략 가능 | 특정 유저에 대해서만 리스폰스                                      |
| no-cache         | 샹략 가능 | 유효성의 재확인 없는 캐시는 사용해서는 안됨                        |
| no-store         | 없음      | 캐시는 리퀘스트, 리스폰스의 일부분을 보존해서는 안됨               |
| no-transform     | 없음      | 캐시 가능하지만 오리진 서버에 리소스의 재확인을 요구               |
| must-revalidate  | 없음      | 캐시 가능하지만 오리진 서버에 리소스의 재확인을 요구               |
| proxy-revalidate | 없음      | 중간 캐시 서버에 대해서 캐시했던 리스폰스의 유효성의 재확인을 요구 |
| max-age = [초]   | 필수      | 리스폰스의 최대 Age 값                                             |
| s-maxage = [초]  | 필수      | 공유 캐시 서버의 리스폰스 최대 Age 값                              |
| cache-extension  | -         | 새로운 디렉티브를 위한 토큰                                        |

#### 캐시가 가능한지 여부를 나타내는 디렉티브

1. public 디렉티브

> Cache-control: public

- `public 디렉티브`가 사용되는 경우 :
- ┣ `다른 유저에게도 돌려줄 수 있는`
- ┣ 캐시를 사용해도 좋다는 것을 명시적으로
- ┗ 나타내고 있음

2. private 디렉티브

> Cache-Control: private

- `private 디렉티브`가 사용되는 경우 :
- ┣ response → `특정 유저만을 대상으로 동작`
- ┣ public 디렉티브와 기능이 반대
- ┣ 캐시 서버 : 특정 유저를 위해서 리소스 캐시 가능
- ┗ But: 다른 유저로부터 같은 response 그 캐시 반환 x

3. no-cache 디렉티브

> Cache-Control: no-cache

- `no-cache` 디렉티브 : 캐시로부터 `오래된 리소스`가
- ┣ `반환되는 것을 막기 위해`서 사용
- ┣ client의 request로 no-cache 디렉티브가 사용된 경우
- ┣ 캐시된 `리스폰스를 클라이언트가받아 들이지 않음`을 나타냄
- ┗ `중간 캐시 서버` : `오리진 서버까지 리퀘스트를 전송`해야 함

- 서버의 response에 no-cache 디렉티브 사용된 경우
- ┣ 캐시 서버 : `리소스를 저장할 수 없음`
- ┣ 오리진 서버 : 케시 서버가 이후의 request에서 리소스의
- ┗ `유효성을 재확인`하지 않고는 그 `리스폰스를 사용하지 못하도록 함`

> Cache-Control: no-cache=Location

- 서버의 response로 no-cache 필드 값에 헤더 필드 명 지정
- ┣ 이 지정된 헤더 필드만 캐시할 수 없음
- ┣ 즉 : `지정된 헤더 필드 이외` → `캐시`하는 것이 `가능`
- ┗ 이 파라미터 : response 디렉티브만 사용가능

#### 캐시로 보존 가능한 것을 제어하는 디렉티브

1. no-store 디렉티브

> Cache-Control: no-store

- no-store 디렉티브 사용:
- ┣ request(그와 대응되는 response) 혹은
- ┣ response에 기밀 정보가 포함되어 있음을 나타냄
- ┣ 캐시 : request, response 일부분을
- ┗ `로컬 스토리지에 보존 해서는 안 되도록 지정`

#### 캐시 기한이나 검증을 지정하는 디렉티브

1. s-maxage 디렉티브

> Cache-Control: s-maxage=6084800 (단위:초)

- s-maxage 디렉티브 기능 :
- ┣ max-age 디렉티브와 동일한데 다른 점 :
- ┣ `유저가 이용` 할 수 있는 `공유 캐시 서버에만 적용`
- ┣ 즉 : 같은 유저에 반복해서 리스폰스를 반환하는 캐시 서버
- ┣ 무효한 디렉티브임
- ┣ 또한 : `s-maxage 디렉티브 사용`되는 경우
- ┗ `Expires 헤더 필드와, max-age 무시`

2. max-age 디렉티브

> Cache-Control: max-age=604800 (단위:초)

- client의 request로 max-age 디렉티브가 사용되었다면
- ┣ 지정되었던 값 보다 새로운 경우에는
- ┣ 캐시되었던 리소스를 받아들일 수 있음
- ┣ 또한 : 지정한 값이 0이면 → 캐시 서버 :
- ┗ request를 항상 오리진 서버에 넘길 필요가 있음

- 서버의 `response에서 max-age 디렉티브가 사용`되는 경우
- ┣ 캐시 서버가 `유효성의 재확인을 하지 않고`
- ┣ 리소스를 캐시에 보존해 두는 `최대 시간`을 나타냄
- ┣ `HTTP/1.1` 캐시 서버 : 동시에 `Expires 헤더 필드`가 달린 경우
- ┣ `max-age 디렉티브의 지정을 우선`하고 `Expires 헤더 필드를 무시`
- ┗ `HTTP/1.0` 캐시 서버 : 반대로 `max-age → 디렉티브가 무시`

3. min-fresh 디렉티브

> Cache-Control: min-fresh=60 (단위 : 초)

- `min-fresh 디렉티브` 사용 :
- ┣ 캐시된 리소스가 적어도 지정된 시간은
- ┣ 최신 상태의 것을 반환하도록 `캐시 서버에 요구`
- ┣ ex) 60초 지정 → 60초 이내에 `유효 기간이 끝나는 `
- ┗ 리소스를 response로 반환하면 안됨

1. max-stale 디렉티브

> Cache-Control: max-stale=3600 (단위 : 초)

- `max-stale` 디렉티브가 사용되는 경우 :
- ┣ 캐시된 리소스의 유효 기간이 끝났더라도
- ┗ `받아들일 수 있음`을 의미

- 디렉티브에 값이 지정되어 있지 않은 경우 :
- ┣ client에는 `아무리 시간이 경과 했더라도`
- ┣ `response를 받아들이게 됨`
- ┣ 값이 지정되어 있는 경우 :
- ┣ `유효 기간이 지난 후로부터 지정시간 내`라면
- ┗ 받아 들인다는 뜻을 서버에 전달

2. only-if-cached 디렉티브

> Cache-Control: only-if-cached

- `only-if-cached` 디렉티브가 사용되는 경우 :
- ┣ client : 캐시 서버에 대해서 목적한 리소스가
- ┣ 로컬 캐시에 있는 경우만 `response를 반환`하도록 요구
- ┣ 즉 : 캐시 서버에서 리스폰스의 1. `리로드`, 2. `유효성`을
- ┣ `재확인 하지 않도록 요구`함
- ┣ 캐시 서버 → 로컬 캐시로부터 응답할 수 없는 경우
- ┗ `"504 Gateway Timeout"` `상태를 반환`

3. `must-revalidate` 디렉티브

- `must-revalidate` 디렉티브가 사용되는 경우 :
- ┣ response의 캐시가 현재도 유효한지 아닌지
- ┣ 여부를 `오리진 서버에 조회를 요구`함
- ┣ 프록시 : 1. 오리진 서버에 도달 X
- ┣ 2. 리소스를 다시 요구할 수 없는 경우
- ┣ 캐시 : `클라이언트에 504(Gateway Timeout)`를 반환
- ┣ 또한 : `must-revalidate` 디렉티브가 사용되는 경우
- ┣ 리퀘스트에서 max-stale 디렉티브를 사용하고 있더라도
- ┗ 무시함 → 효과를 없앰

4. proxy-revalidate 디렉티브

> Cache-Control: proxy-revalidate

- `proxy-revalidate` 디렉티브가 사용되는 경우 :
- ┣ 모든 캐시 서버에 대해서 이후의 리퀘스트로
- ┣ 해당 리스폰스를 반환할 때는
- ┗ 반드시 `유효성 재확인을 하도록 요구`

5. no-transform 디렉티브

> Cache-Control: no-transform

- `no-transform` 디렉티브가 사용되는 경우 :
- ┣ request와 response의 어느쪽에 있어서도
- ┣ 캐시가 `엔티티 바디의 미디어 타입을 변경하지`
- ┣ `않도록 지정`함
- ┗ 캐시 서버 등에 의해서 → `이미지 압축을 방지`

#### Cache-Control 확장

1. cache-extension 토큰

- `Cache-Control` 헤더 필드 :
- ┣ cache-extension 토큰을 사용하여
- ┗ 디렉티브 확장 가능

- community 라는 디렉티브 : Cache-Control
- ┣ 헤더 필드에는 없지만 extension tokens에 의해서
- ┣ 추가가 가능함
- ┣ 캐시 서버가 새로운 디렉티브 community 이해 못하는 경우
- ┗ 무시됨

> extension tokes는 이해할 수 있는 캐시 서버에 대해서만 의미

### 6.3.2 Connection

- Connection 헤더 필드의 역할

1. 프록시에 더 이상 전송하지 않는 헤더 필드를 지정

2. 지속적 접속 관리

- 프록시에 더 이상 전송하지 않는 헤더 필드를 지정

> Connection: 더 이상 전송하지 않는 헤더 필드 명

- 클라이언트의 request 혹은 서버의 response에서
- ┣ Connection 헤더 필드를 사용하여 프록시 서버에
- ┣ 더 이상 전송하지 않는 헤더 필드(hop-by-hop 헤더)
- ┗ 지정이 가능

> Connection: Close

- HTTP/1.1에서는 지속적 `접속이 디폴트`로 되어있음
- ┣ 그래서 `request를 송신했던 client`는
- ┣ 접속이 계속 유지되면서 추가 `request를 송신`함
- ┣ 서버 측에서 명시적으로 접속을 끊고 싶을 경우에는
- ┗ Connection 헤더 필드에 Close라고 지정

> Connection: Keep-Alive

- 하지만 HTTP/1.1 이전 버전의 HTTP `지속적 접속`이
- ┣ `디폴트가 아니였음`
- ┣ 그렇기 때문에 오래된 버전의 HTTP → 지속적 접근
- ┣ Connection 헤더 필드 : `Keep-Alive`라고 지정
- ┗ Keep-Alive 헤더 필드와 Connection 헤더 필드를 붙여서 리스폰스

### 6.3.3 Date

- Date 헤더 필드 : HTTP 메시지를 생성한 날짜를 나타냄

- HTTP/1.1 에서는 RFC1123에 다음과 같이 날짜 포맷이 지정

> Date: Tue. 03 Jul 2012 04:40:59 GMT

- 오래된 버전의 HTTP : RFC850에 정의된 다음과 같은 포맷 사용

> Date: Tue. 03-Jul-12 04:40:59 GMT

- 외 에도 다음과 같은 포맷이 존재
- ┣ 표준 C 라이브러리에 있는
- ┗ `asctime()` 함수의 출력 형식과 같음

> Date: Tue Jul 03 04:40:59 2012

### Pragma

- Pragma 헤더 필드 : HTTP/1.1 보다 오래된 버전의 흔적으로
- ┗ HTTP/1.0 와의 후방 호환성만을 위해서 정의되어 있는 헤더 필드

- 지정할 수 있는 형식 : 다음과 같이 1개뿐

> Pragma: no-cache

- 이 헤더 필드 : 일반 헤더 필드
- ┣ client의 request에서만 사용됨
- ┣ client는 캐시된 리소스의 response를 원하지 않음을
- ┗ `모든 중간 서버에 알리기 위해 사용`됨

- 모든 중간 서버 : `HTTP/1.1 기준으로 구성`되어 있다면
- ┣ 캐시 동작 지정 → `Cache-Control: no-cache`를 사용하는 것이
- ┣ 바람직하지만, 중간 서버의 모든 HTTP 버전을 확인하는 경우 없음
- ┗ 고로 : 아래와 같이 양쪽을 보내는 경우도 존재

> Cache-Control: no-cache
> Pragma: no-cache

### 6.3.5 Trailer

- `Trailer` 헤더 필드 : 메시지 바디의 뒤에 기술되어 있는
- ┣ `헤더 필드를 미리 전달 가능`
- ┣ 이 헤더 필드 : HTTP/1.1에 구현되어 있는
- ┗ `청크 전송 인코딩`을 사용하고 있는 경우에 사용

```json

Expires: Tue, 28 Sep 2004 23:59:59 GMT
```

- 위 예에서 Trailer 헤더 필드에 Expires를 지정
- ┣ 메시지 바디의 뒤(청크의 길이가 0의 뒤)에
- ┗ `Expires 헤더 필드`가 나타나고 있음

### 6.3.6 Transfer-Encoding

- Transfer-Encoding 헤더 필드 :
- ┣ 메시지 바디의 전송 코딩 형식을 지원하는 경우
- ┣ 사용하게 됨
- ┗ `HTTP/1.1`에서 `전송 코딩 형식`으로 `청크 전송만이 정의`

```json
Transfer-Encoding: chunked
```

- 이 예의 경우 : Transfer-Encoding 헤더 필드로 지정한 것처럼
- ┣ 청크 전송 코딩이 유효한 상태이고
- ┗ 3,312 bytes 912 bytes 청크 데이터로 분할되어 있는 것을 알 수 있음

### 6.3.7 Upgrade

- `Upgrade 헤더 필드` : HTTP 및 다른 프로토콜의 `새로운 버전이 통신`에
- ┣ 이용되는 경우에 사용
- ┣ 지정하는 대상이 전혀 다른 통신 프로토콜이라고 하더라도
- ┗ 문제가 없음

- ex) Upgrade 헤더 필드에 `TLS/1.0가 지정`
- ┣ 양쪽 모두 Connection 헤더 필드가 지정되어 있는 점에 주목
- ┣ Upgrade 헤더 필드에 의해서 업그레이드 되는 대상 :
- ┣ client에 인접한 서버 사이 Upgrade 헤더 필드를 사용하는 경우
- ┣ `Connection:Upgrade`도 지정할 필요가 있음
- ┣ Upgrade 헤더 필드가 달린 request에 대해서
- ┣ server: 상태 코드 101 `Switching Protocols`
- ┗ 이라는 리스폰스로 응답 가능

### 6.3.8 Via

- Via 헤더 필드 : client와 server 간의
- ┣ `request`, `response` `메서드 경로`를 알기 위해 사용
- ┣ 프록시 혹은 게이트 웨이 : `자신의 서버 정보`를
- ┣ `Via 헤더 필드에 추가`한 뒤에 메시지를 전송
- ┣ 이것은 `traceroute`와 `메일의 Received 헤더`의 기능과 유사
- ┣ `Via 헤더 필드`는 `전송된 메시지의 추적과 request 루프`의
- ┗ 회피등에 사용 → 프록시를 경유하는 경우에는 반드시 부가

- Via 헤더 : 배송 경로를 알기 위해서
- ┣ `TRACE 메서드와 연계해서 자주 사용`
- ┣ ex) 프록시 서버 : `"Max-Forwards: 0"`의 TRACE 리퀘스트가
- ┣ 도달한 경우 → 프록시 서버 : 그 이상 먼저 메시지를 전송 불가
- ┣ 이 경우 프록시 서버 : `Via 헤더에 자기 서버의 정보를 추가`하고
- ┗ `request에 대해서 response함`

### 6.3.9 Warning

- Warning 헤더 : HTTP/1.0 response 헤더(Retry-After)가
- ┣ HTTP/1.1에서 변경 된 것
- ┣ response에 관한 추가 정보를 전달
- ┣ 기본적으로 캐시에 관한 문제의 경고를
- ┗ 유저에 전달함

- Warning 헤더 형식

> Warning: [경고 코드][경고한 호스트:포트 번호]"[경고문]"([날짜])

| 코드 | 경고문                           | 설명                                                                                    |
| ---- | -------------------------------- | --------------------------------------------------------------------------------------- |
| 110  | Response is state                | 프록시가 유효기간이 지난 리소스를 반환                                                  |
| 111  | Revalidation failed              | 프록시가 리소스 유효성 재확인에 실패 <br/> (서버에 도달할 수 없는 등)                   |
| 112  | Disconnection operation          | 프록시가 네트워크로부터 고의로 끊겨 있음                                                |
| 113  | Heuristic expiration             | 리스폰스가 24시간 이상 경과하고 있는 경우 <br/> (캐시의 유효기간을 24시간 이상 설정 시) |
| 199  | Miscellaneous warning            | 임의의 경고문                                                                           |
| 214  | Transformation applied           | 프록시가 인코딩과 미디어 타입 등에 대응해서 <br/> 무언가의 처리를 한 경우               |
| 299  | Miscellaneous persistent warning | 임의의 경고문                                                                           |

## 6.4 리퀘스트 헤더 필드

- request 헤더 필드 : client 측에서 → server 측으로
- ┣ 송신된 `request 메시지에 사용되는 헤더`
- ┣ 1. `request 부가 정보`
- ┣ 2. `client의 정보`
- ┗ 3. `response의 콘텐츠에 관한 우선 순위` 등을 추가

### 6.4.1 Accept

> Accept: text/html, application/xhtml+xml,application/xml;q=0.9._/_,q=0.8

- Accept 헤더 필드 : 유저 에이전트에 처리할 수 잇는
- ┣ `미디어 타입`과, `미디어 타입의 상대적인 우선순위`를
- ┣ 전달하기 위해서 사용
- ┣ 미디어 타입은 : "타입/서브 타입" 으로서 한번에 여러 번
- ┗ 설정이 가능함
- 미디어 타입의 종류

1. 텍스트 파일

- text/html, text/plain, text/css
- application/xhtml+xml, application/xml ...

2. 이미지 파일

- image/jpeg, image/gif, image/png ...

3. 동영상 파일

- video/mpeg, video/quicktime ...

4. 애플리케이션용 바이너리 파일

- application/octet-stream, application/zip ...

- ex) 브라우저 PNG 처리 X → Accept에 image/png 뺌

- 표시하는 미디어 타입에 `우선 순위` :
- ┣ 세미콜론 `(':')`으로 구분하고 `"q="` 이용해서
- ┣ 품질 지수를 더함
- ┣ 품질 계수 : 0 ~ 1 범위의 수치를(소수점 3자리까지)로
- ┣ 1이 높은 쪽임
- ┗ `품질 계수의 지정이 없는 경우`에는 암묵적으로 `"q=1.0"을 나타냄`

- 서버가 `복수의 콘텐츠를 반환할 수 있는 경우`
- ┣ `가장 높은 품질 계수`의 미디어 타입으로 반환할
- ┗ 필요성이 존재

### 6.4.2 Accept-Charset

> Accept-Charset:iso-8859-5, unicode-1-1:q+0.8

- Accept-Charset 헤더 필드 : 유저 에이전트에서 처리할 수 있는
- ┣ `문자셋` → 상대적인 우선 순위를 전달하기 위해서 사용
- ┗ 또한 : 문자셋은 한번에 여러개를 지정 가능

- Accept 헤더 필드와 마찬가지로
- ┣ 품질 지수에 의한 상대적 `우선 순위를 지정`
- ┗ 이 헤더 필드 : `서버 구동형 네고시에이션`에 이용

### 6.4.3 Accept-Encoding

> Accept-Encoding: gzip, deflate

- `Accept-Encoding` 헤더 필드 :
- ┣ 유저 에이전트가 처리할 수 있는 콘텐츠 인코딩과
- ┣ `콘텐츠 코딩의 상대적인 우선 순위를 전달`하기 위해서
- ┣ 사용이됨
- ┗ 코딩의 지정 : `한번에 여러개를 지정 가능`

1. gzip

- 파일 압축 프로그램 gzip(GNU zip)에서 생성된
- ┣ 인코딩 포맷(RFC1952)으로 Lempel-Ziv 부호(LZ77)와
- ┗ 32비트 CRC를 사용

2. compress

- UNIX 파일 압축 프로그램 "compress"에 의해서 만들어진
- ┗ 인코딩 포맷으로 → Lempel-Ziv-Welch 부호(LZW)를 사용

3. deflate

- `Zlib 포맷(RFC1950)과 deflate 압축 알고리즘(RFC1951)`에 의해서
- ┗ 만들어진 인코딩 포맷을 조합한 것

4. identity

- 압축과 변형을 하지 않는 디폴트 인코딩 포맷

- `Accept 헤더 필드와 같이 품질지수에 의해`서
- ┣ `상대적인 우선 순위`를 표시함
- ┣ 또한 : `"*"`(에스터리스크)를 지정하면
- ┗ 와일드 카드로서 `모든 인코딩 포맷을 가리킴`

### 6.4.4 Accept-Language

> Accept-Language: ko-kr, en-us;q=0.7,en:q0.3

- `Accept-Language` 헤더 필드 :
- ┣ 유저 에이전트가 처리할 수 있는 자연어의 세트(ko, en)
- ┣ 자연어 세트의 상대적인 `우선 순위를 전달하기 위해서 사용`
- ┗ 자연어 세트 : 한번에 여러 개를 지정 가능

- Accept 헤더 필드와 같이 : `품질 지수에 의해`
- ┣ `상대적인 우선 순위`를 나타냄
- ┣ 위 예의 경우 : 한국어 리소스가 있는 경우 → 한국어
- ┗ 없으면 → 영어 리소스로 response를 받고 싶다는 것을 의미

### 6.4.5 Authorization

- Authorization 헤더 필드 : 유저 에이전트의
- ┣ `인증 정보(크리덴셜 값)을 전달`하기 위해서 사용
- ┣ 통산 : `서버에 인증을 받으려 하는 유저` 에이전트 :
- ┣ 상태 코드 `401 response` 뒤에 `request에 Authorization 헤더 필드를 포함`
- ┣ 공유 캐시가 `Authorization 헤더 필드를 포함하는 request를 받은 경우`
- ┗ `조금은 다른 동작`을 함

- HTTP 엑세스 인증과 Authorization헤더 필드는 다음 장 설명

### 6.4.6 Expect

> Expect: 100-continue

- Expect 헤더 필드 : `클라이언트가 서버에 특정 동작 요구를 전달`
- ┣ 기대하고 있는 요구에 서버가 응답하지 못해서
- ┣ 에러가 발생하는 경우 : `상태 코드 417 Expectation Failed 반환`
- ┣ 클라이언트 : 이 헤더 필드에 원하는 확장을 딸려 보낼 수 있지만
- ┣ `HTTP/1.1` 사양에는 `"100-continue"(상태코드 100 Continue의 의미만)`
- ┗ 정의 되어 있음

- 상태 코드 100 response를 가진 `client : request`할 때에
- ┗ `Expect : 100-continue`로 지정

### 6.4.7 From

> From: info@hackr.jp

- From 헤더 필드 : 유저 에이전트를 사용하고 있는
- ┣ `유저의 메일 주소를 전달`함
- ┣ 기본적으로 검색 엔진 등의 에이전트 책임자 이메일
- ┗ 에이전트 사용 → From 헤더 필드를 포함해야 함

### 6.4.8 Host

> Host: www.hackr.jp

- Host 헤더 필드 : request한 리소스의 인터넷 호스트와
- ┣ `인터넷 호스트와 포트 번호를 전달`함
- ┣ Host 헤더 필드 : HTTP/1.1에서 유일한 필수 헤더 필드
- ┣ Host 헤더 필드의 존재 이유 → 1대의 서버에서
- ┗ 복수의 도메인을 할당할 수 있는 가상 호스트의 구조와 깊은 관계

- request → 서버로부터 오면 : 호스트 명을 IP 주소로 해결해
- ┣ request가 처리됨
- ┣ 이 때 같은 IP 주소로 `복수의 도메인이 적용되어 있다고 한다면`
- ┣ 어느 도메인에 대한 리퀘스트인지 알 수 없음
- ┣ Host 헤더 필드에 리퀘스트를 받을 호스트명을 명확하게
- ┗ 해둘 필요성이 존재

- 서버에 호스트 명이 설정되어 있지 않은 경우 :
- ┗ 아래와 같이 값을 비워서 보내게됨

> Host:

### 6.4.9 If-Match

- `"If-xxx"` 라는 식의 request 헤더 필드 :
- ┣ 조건부 request라고 부름
- ┣ 조건부 request를 받은 서버 →
- ┗ `조건에 맞는 경우에만 request를 받음`

> If-Match: "123456"

- If-Match 헤더 필드 : 조건부 request의 하나로
- ┣ 서버 상의 리소스를 특정하기 위해서
- ┣ `엔티티 태그(ETag)` 값을 전달함
- ┗ `서버는 약한 ETag 값을 사용 불가`

- 서버 : If-Match의 필드 값과<-> 리소스의 ETag
- ┣ 일치하는 경우에만 리퀘스트를 받아들일 수 있음
- ┣ 일치하지 않으면 상태 코드 `412 Precondition Failed`
- ┗ response를 반환함

### 6.4.10 If-Modified-Since

- 서버 : If-Modified-Since의 필드값에 지정된 날짜 이후
- ┗ `갱신된 리소스라면 request를 받아들임`

> if-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT

- If-Modified-Since 헤더 필드 :
- ┣ 조건부 리퀘스트의 하나로 리소스가 갱신 날짜가
- ┗ `필드 값보다 새롭지 않다면 request를 받아들이겠다는 뜻`을 전달
- GET, HEAD 메소드에서 `If-None-Match 헤더 필드를 사용`함으로써
- ┣ 최신의 리소스를 요구하는 것이 되기 때문에
- ┗ `If-Modified-Since 헤더 필드를 사용 하는 것과 비슷`

### 6.4.12 If-Range

- If-Range 필드 값과 Etag값 혹은 갱신 날짜가 일치하면
- ┗ Range 리퀘스트로 처리

- 일치하지 않았다면 Range 리퀘스트를 무시하고 리소스 전체를 반환

- If-Range 헤더 필드 : 조건부 리퀘스트의 하나로
- ┣ If-Range로 지정한 필드값(ETag 값, 혹은 날짜를 지정)
- ┣ 과 기정한 리소스의 ETag 값, 혹은 날짜 값이 일치하면
- ┣ : Range 리퀘스트로서 처리하고 싶다는 것을 전달함
- ┗ `일치하지 않는다면 리소스 전체를 반환`

- If-Range 헤더 필드를 사용하지 않는 request 가정
- ┣ server측 리소스가 갱신되어 있는 경우
- ┣ client 측에서 가지고 있는 리소스의 일부분은 무효한 것
- ┣ `Range 리퀘스트는 당연히 무효`
- ┣ 서버는 일단 상태 코드 `412 Precondition Failed` 리스폰스를 반환
- ┣ client에서 다시 request를 보내도록 재촉
- ┗ `If-Range 헤더 필드를 사용하는 경우와 비교 → 2배의 수고`

### 6.4.13 If-Unmodified-Since

> If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT

- `If-Unmodified-Since` 헤더 필드 :
- ┣ `If-Modified-Since` 헤더 필드와 반대로 동작을 함
- ┣ 지정된 리소스가 필드 값에 지정된 날짜 이후에
- ┣ `갱신되어 있지 않는 경우에만 request를 받아들이도록 전달`
- ┣ 지정된 날짜 이후에 갱신된 경우 :
- ┗ 상태코드 412 Precondition Failed response를 반환

### 6.4.14 Max-Forwards

- 받아넘길 때마다 Max-Forwards 값을 1씩 뺌
- ┗ 값이 0이 되면 response를 반환

> Max-Forwards: 10

- `Max-Forwards` 헤더 필드 : `TRACE`, `OPTIONS` 메소드에 의해
- ┣ request 할 때에 `전송해도 좋은 서버 수의 최대치`를
- ┣ 10진수 정수로 지정함
- ┣ 서버 : 다음 서버에 request 전송할 때 :
- ┣ Max-Forwards 값에서 1을 빼서 다시 세트
- ┣ Max-Forwards 값이 0인 request 받은 경우에는
- ┗ `전송하지 않고 response를 반환할 필요가 존재`

- HTTP를 사용한 통신 :
- ┣ request가 프록시 서버 등 여러 대의 서버를 경유 존재
- ┣ 도중에 프록시 서버에서 무언가의 원인 →
- ┗ request 전송이 실패 : client에 response 되돌아 오지 않음

- ┣ 이러한 문제가 발생한 경우 원인 조사에
- ┣ `Max-Forwards` 헤더 필드가 활용
- ┣ `필드 값이 0이 되었던 서버가 response`
- ┗ 이를 통해서 `그 서버까지의 상황` 알 수 있음

### 6.4.15 Proxy-Authorization

> Proxy-Authorization: Basic ddaksjfkjfdls

- Proxy-Authorization 헤더 필드 :
- ┣ 프록시 서버에서의 인증 요구를 받아들인 때
- ┗ `인증에 필요한 client의 정보를 전달`
- client와 서버의 HTTP 엑세스 인증과 비슷
- ┣ 다른 점 : client 프록시 사이에 인증이 이루어짐
- ┣ `client와 server의 경우 Authorization 헤더 필드와 같은 역할`
- ┗ HTTP 엑세스 인증 추후에 자세히 설명

### 6.4.16 Range

> Range: bytes=5001-10000

- Range 헤더 필드 : 리소스의 일부분만 취득하는 Range
- ┣ request를 할 때 지정 범위를 전달
- ┣ 위에 소개한 예에서는 5001 바이트부터 10000 바이트 까지
- ┣ 리소스를 요구 중
- ┣ Range 헤더 필드가 달린 request 받아들인 서버가
- ┣ request 처리 가능 → 상태 코드 `206 Partial Content response 반환`
- ┣ Range request를 처리할 수 없는 경우 :
- ┗ 상태 코드 `200 OK와 함께 전체 리소스 반환`

### 6.4.17 Refer

- `Refer`를 보려면 Request 중의 URI가 어느 웹 페이지로부터
- ┗ 발행되었는지 알 수 있음

- `Refer` 헤더 필드 :
- ┣ request가 발생한 본래 리소스의 URI를 전달
- ┣ 기본적으로 `Refer` 헤더 필드는 보내져야 하지만,
- ┣ 브라우저의 주소창에 `직접 URI를 입력한 경우 보안상 우려 ?`
- ┗ 이 경우에는 전달하지 않아도 됨

- 본래 리소스의 URI의 쿼리에 ID 및 패스워드와 비밀 정보 포함인 경우
- ┣ Refer를 통해서 다른 서버에 노출될 우려가 존재함
- ┗ 또한 : `Referrer가 맞지만 → 잘못된 철자로 사용 중`

### 6.4.18 TE

> TE: gzip, deflate:q=0.5

- TE 헤더 필드 :
- ┣ 1. response로 받을 수 있는 전송 코딩 형식
- ┣ 2. 상대적인 우선 순위를 전달
- ┣ `Accept-Encoding 헤더 필드`와 `매우 비슷`
- ┗ 여기선 `전송 코딩이 적용`

- TE 헤더 필드 : 전송 코딩의 지정 이외에
- ┣ Trailer를 동반하는 청크 전송 인코딩 형식 지정 가능
- ┗ 이 경우 : `필드 값에 "trailers"라고 기록`

> TE: trailers

### 6.4.19 User-Agent

- `User-Agent` 헤더 필드 : request를 생성한 브라우저와
- ┣ `유저 에이전트의 이름` 등을 전달하기 위해 사용
- ┣ 로봇 엔진의 request 경우에는 로봇 엔진의 책임자
- ┣ 메일 주소가 부가된 것도 있음
- ┣ 또는 프록시 경유로 리퀘스트의 경우에는
- ┗ `프록시 서버의 이름 등이 부가된 것`도 있음

## 6.5 리스폰스 헤더 필드

- response 헤더 필드 : server 측으로부터
- ┣ client 측으로 송신되는 response 메시지에 적용된 헤더
- ┣ 1. `response의 부가 정보`
- ┣ 2. `서버의 정보`
- ┗ 3. `client에 부가 정보 요구` 등을 나타냄

### 6.5.1 Accept-Ranges

```html
Accept-Ranges: bytes
```

- `Accept-Ranges` 헤더 필드 : server가 리소스의 일부분만 지정해서
- ┣ 취득할 수 있는 Range 리퀘스트를 접수할 수 있는지 여부를 전달
- ┣ 지정 가능한 필드 값 : 2개이며
- ┣ `수신 가능`한 경우 : `'bytes'`
- ┗ `수신 불가능`한 경우에는 : `'none'` 이라고 지정

### 6.5.2 Age

```html
Age: 600
```

- Age 헤더 필드 :
- ┣ `얼마나 오래 전에 오리진 서버`에서
- ┣ `response가 생성`되었는지를 전달함
- ┣ 필드 값의 단위 : `초`
- ┣ response한 서버가 `캐시 서버`라면
- ┣ 캐시된 `리스폰스가 다시 실증되었던 때`부터
- ┣ 검증한 시간이 됨

> 민약 프록시가 리스폰스를 생성했다면 → Age 헤더 필드는 필수

### 6.5.3 ETag

```html
ETag: "293892048klasjdfjk"
```

- ETag 헤더 필드 :
- ┣ `엔티티 태그`라고 불리며
- ┣ 일의적으로 `리소스를 특정하기 위한 문자열 전달`
- ┗ 서버 : `리소스마다 ETag 값을 할당`

- `리소스가 갱신`되면 `ETag 값도 갱신할 필요`가 존재
- ┣ ETag 값의 문제에는 `특별히 룰이 정해져 있지 않고`
- ┗ 서버에 따라 다양한 `ETag 값을 할당`

- 리소스를 캐시할 때는 리소스를 일의적으로 정하고 싶은 순간 존재
- ┣ ex ) http://www.google.com/ 에 한국어 버전 browser 사용하여 엑세스
- ┣ 한국어의 리소스가 반환
- ┣ 반대의 경우 영문 → 영문 리소스가 반환
- ┣ 둘의 경우 URI는 같지만 → `URI 정보만을 가지고는 리소스 특정은 어려움`
- ┗ 도중에 다운로드가 끊겨서 다시 하는 경우 → `ETag 값을 참조해서 리소스 특정`

#### 강력한 ETag 값과 약한 ETag 값

- ETag : 강한(strong) ETag, 약한(weak) ETag 값으로 구별되어 있음

1. 강한 ETag 값

- 강한 ETag : 엔티티가 아주 조금 다르더라도 값은 무조건 변경

```html
ETag: "Usagi-1234"
```

2. 약한 ETag 값

- 약한 ETag : 리소스가 같다는 것만을 의미
- ┣ 의미가 다른 리소스로 그 차이가 있는 경우에만
- ┗ ETag 값이 변화함

```html
ETag: W/"usagi-1234"
```

### 6.5.4 Location

```html
Location: http://www.google.com/sample.html
```

- Location 헤더 필드 : `response의 수신자`에 대해서
- ┣ Request-URI 이외의 `리소스 액세스를 유도하는 경우 사용`
- ┣ 기본적 : "3xx: Redirection" 리스폰스에 대해서
- ┣ 라디이렉트 처의 URI를 기술함
- ┣ 대부분의 브라우저 : Location 헤더 필드를 포함한 리스폰스를 받으면
- ┗ 강제로 리다이렉트 하는 곳의 `리소스에 엑세스를 시도`함

### 6.5.5 Proxy-Authenticate

```json
Proxy-Authenticate: Basic realm="Jang Auth"
```

- `Proxy-Authenticate 헤더 필드` :
- ┣ 프록시 서버에서의 인증 요구를
- ┣ 클라이언트에 전달함
- ┣ client, server → HTTP 엑세스 인증과 비슷함
- ┣ 차이점 : client, `프록시 사이`에서 인증이 이루어짐

- client, server의 경우 `WWW-Authorization 헤더 필드`와 같은
- ┣ 역할의 하게 됨
- ┗ HTTP 인증의 경우 추후에 자세하게 설명

### 6.5.6 Retry-After

```json
Retry-After: 120
```

- Retry-After 헤더 필드 : client가 일정 시간 후에
- ┣ request를 다시 시행해야 하는지를 전달함
- ┣ 주로 상태 코드 `503 Service Unavailable`
- ┗ `리스폰스나 3xx Redirect 리스폰스와 함께 사용`

- 값으로는 날짜(GMT) 이라든가
- ┗ `리스폰스 이후의 몇 초를 지정 가능`

### 6.5.7 Server

```json
Server: Apache/2.2.17(Unix)
```

- Server 헤더 필드 : 서버에 설치되어 있는
- ┣ `HTTP 서버의 소프트웨어를 전달`함
- ┣ 단순히 서버의 소프트웨어 명칭만이 아닌
- ┗ `버전이나 옵션`에 대해서도 기재하는 경우가 존재

```json
Server; Apache/2.2.6 (Unix) PHP/5.2.5
```

### 6.5.8 Vary

```json
Vary: Accept-Language
```

- Vary 헤더 필드 : 캐시를 컨트롤 하기 위해서 사용
- ┣ `오리진 서버` : 프록시 서버에 로컬 캐시를 사용하는 방법에 대한
- ┣ 지시를 전달함
- ┣ 오리진 서버로부터 Vary에 지정되었던 리스폰스를 받아들인
- ┣ 프록시 서버 : 이후 캐시된 때의 `request와 같은 Vary에 지정되어 있는`
- ┗ 헤더 필드를 가진 request에 대해서만 `캐시를 반환 가능`함

- 같은 리소스에 대한 `request라도 Vary에 지정`되었던
- ┣ 헤더 필드가 다른 경우에는 `오리진 서버로부터`
- ┗ `리소스를 취득할 필요가 있음`

### 6.5.9 WWW-Authenticate

```json
WWW-Authenticate: Basic realm="Jangdesign Auth"
```

- `WWW-Authenticate` 헤더 필드 :
- ┣ `HTTP 엑세스 인증`에 사용됨
- ┣ Request-URI애 지정했던 `리소스에 적용할 수 있는`
- ┣ `인중 스키마("Basic" 혹은 "Digest")`와 파라미터를
- ┗ 나타내는 `challenge를 전달`함

- WWW-Authenticate 헤더 필드 : 상태 코드
- ┣ `401 Unauthorized response`에 반드시 포함됨
- ┣ 이 예에서 `realm은 Request-URI에 지정된 보호`되어있던
- ┗ `리소스를 식별하기 위한 문자열임`

## 6.6 엔티티 헤더 필드

- `엔티티 헤더 필드` : `request 메시지와 response 메시지`에
- ┣ 포함된 `엔티티에 사용되는 헤더`로
- ┗ 콘텐츠의 `갱신 시간` 같은 엔티티에 관한 정보를 포함

### 6.6.1 Allow

```json
Allow: GET, HEAD
```

- Allow 헤더 필드 : Request-URI에 지정된 리소스가 제공하는
- ┣ `메소드의 일람을 전달`함
- ┣ 서버가 받을 수 없는 메소드를 수신한 경우
- ┣ 상태 코드 : 405 Method Not Allowed 리스폰스와 함께
- ┗ 수신 가능한 메소드의 일람을 기술한 `Allow 헤더 필드를 반환`

### 6.6.2 Content-Encoding

```json
Content-Encoding: gzip
```

- Content-Encoding 헤더 필드 :
- ┣ 서버가 엔티티 바디에 대해서
- ┣ 실시한 `content 코딩 형식을 전달`

> content-coding : 엔티티의 정보가 누락되지 않도록 압축 지시

- 주로 4가지의 코딩 형식이 사용
  1. Gzip
  2. Compress
  3. Deflate
  4. Identity

### 6.6.3 Content-Language

```json
Content-Language: en
```

- `Content-Language: en` 헤더 필드 :
- ┗ 엔티티 바디에 사용된 `자연어(한국어 영어)를 전달`

### 6.6.4 Content-Length

```json
Content-Length: 15000
```

- Content-Length 헤더 필드 :
- ┣ 엔티티 바디의 크기(단위 : byte)를 전달함
- ┣ `엔티티 바디에 전송 코딩이 실시된 경우`
- ┣ `Content-Length 헤더 필드`는 `사용해서는 안됨`
- ┗ 엔티티 바디의 크기를 산출하는 방법에 대한 내용은 복잡

> RFC2616 4.4 Content len 산출 방법

### 6.6.5 Content-Location

```json
Content-Location: http://google.com/index-ko/html
```

- `Content-Location 헤더 필드` :
- ┣ 메시지 바디에 대응하는 `URI를 전달`함
- ┣ `Location 헤더 필드와 달리`
- ┣ `Content-Location`은 `메시지 바디로 반환`된
- ┗ `리소스의 URI`를 나타냄

- ex ) Accept-Language 헤더 필드를 사용한
- ┣ 서버 구동형 리퀘스트 :
- ┣ 실제로 요구된 오브젝트와는 `다른 페이지가`
- ┣ `반환된 경우` → Content-Location 헤더 필드에
- ┗ URI를 포함함

### 6.6.6 Content-MD5

```json
Content-MD5: OGasldkfjlskdafjklsdjflajdf==
```

- Content-MD5 헤더 필드 :
- ┣ 메시지 바디가 변경되지 않고 도착했는지 확인하기 위해
- ┣ MD5 알고리즘에 의해서 생성된 값을 전달함
- ┣ 메시지 바디에 `MD5 알고리즘을 적용해서 얻은 `
- ┣ `128비트 바이너리 값`에 `Base64 인코딩`을 한 결과를
- ┣ 필드 값에 기록함
- ┣ HTTP 헤더 : 바이너리 값을 기록하는 것이 불가능
- ┗ `Base64로 인코딩`하고 있음

- 유효성을 확인하기 위해서 : `수신한 client 측`에서
- ┣ 메시지 바디에 같은 MD5 알고리즘을 실행함
- ┣ 이렇게 해서 도출한 값과 필드 값에 값을 비교하며
- ┗ 메시지 바디가 올바른지 여부를 확인 가능

> 임베디드 페리티 체크와 비슷

- 이 경우 우발적 컨텐츠 변경은 잡을 수 있지만
- ┣ 악의적으로 변경한 경우 모름
- ┣ client 수신 단계에서도 메시지 바디도
- ┗ `Content-MD5 변조된 상태` → 발견 불가

### 6.6.7 Content-Range

```json
Content-Range: bytes 5001-1000/10000
```

- `Content-Range 헤더 필드` :
- ┣ 범위를 지정해서 일부분만을 request하는
- ┣ `Range 리퀘스트에 대해서 리스폰스를 할 때에 사용`
- ┣ `response로 보낸 엔티티`가 어느 부분에
- ┣ 해당하는가를 전달함
- ┣ 필드 값에는 `현재 보내고 있는 곳을 바이트`로
- ┗ `지정한 범위`와 `전체 사이즈를 기록`함

### 6.6.8 Content-Type

```json
Content-Type: text/html: charset=UTF-8
```

- `Content-Type 헤더 필드` : 엔티티 바디에 포함되는
- ┣ 오브젝트의 미디어 타입을 전달함
- ┣ Accept 헤더 필드와 같이
- ┣ 필드 값 : `"타입/서브 타입"으로 기록`함
- ┣ Charset 파라미터 : "iso-8859-1"과 "enu-kr"등의
- ┗ `문자셋을 지정`함

### 6.6.9 Expires

```json
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

- Expires 헤더 필드 : 리소스의 유효 기간 날짜를 전달
- ┣ 캐시 서버가 Expires 헤더 필드를 포함한
- ┣ 리소스를 수신한 경우 필드 값으로 지정된 날짜까지
- ┗ response의 복사본을 유지하고 request에는 캐시로 응답함

- 지정 날짜가 지난 경우 → 리퀘스트가 온 단계에서 오리진 서버에
- ┗ 리소르를 얻으러 감

- 오리진 서버가 캐시 서버에 캐시되는 것을
- ┣ 원하지 않을 경우에는 `Date 헤더 필드의 필드값`과
- ┣ `같은 날짜로 해두는 것이 바람직`함
- ┣ 다만 `Cache-Control 헤더 필드`에
- ┣ `max-age 디렉티브`가 지정되어 있는 경우 :
- ┗ `Expires 헤더 필드보다 max-age 디렉티브의 지정이 우선`

### 6.6.10 Last-Modified

```json
Last-Modified: wed, 23 May 2021 10:10:10 GMT
```

- Last-Modified 헤더 필드 : 리소스가 마지막으로
- ┣ `갱신되었던 날짜 정보를 전달`함
- ┣ 기본적으로는 Request-URI가 지정된 리소스가 갱신되었던
- ┣ 날짜가 되지만
- ┣ GGI 등의 스크립트로 동적인 데이터를 다룰 경우
- ┗ 그 데이터의 최종 갱신 날짜가 되는 경우도 존재
