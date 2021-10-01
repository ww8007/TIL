# 4. 결과를 전달하는 HTTP 상태 코드

- 클라이어트가 `HTTP 리퀘스트`를 보낸 `결과`
- ┣ 즉 : 1. 서버가 정상적으로 처리되었는지
- ┗ 2. 에러가 발생했는지 알려줌 → 상태 코드

## 목차

- [4. 결과를 전달하는 HTTP 상태 코드](#4-결과를-전달하는-http-상태-코드)
  - [목차](#목차)
  - [4.1 상태 코드는 서버로부터 리퀘스트 결과를 전달한다](#41-상태-코드는-서버로부터-리퀘스트-결과를-전달한다)
  - [4.2 2xx 성공(Success)](#42-2xx-성공success)
    - [4.2.1 200 OK](#421-200-ok)
    - [4.2.2 204 No Content](#422-204-no-content)
    - [4.2.3 206 Partial Content](#423-206-partial-content)
  - [4.3 3xx 리다이렉트(Redirection)](#43-3xx-리다이렉트redirection)
    - [4.3.1 301 Moved Permanently](#431-301-moved-permanently)
    - [4.3.2 302 Found](#432-302-found)
    - [4.3.3 See Other](#433-see-other)
    - [4.3.4 304 Not Modified](#434-304-not-modified)
    - [4.3.5 307 Temporary Redirect](#435-307-temporary-redirect)
  - [4.4 4xx 클라이언트 에러(Client Error)](#44-4xx-클라이언트-에러client-error)
    - [4.4.1 400 Bad Request](#441-400-bad-request)
    - [4.4.2 401 Unauthorized](#442-401-unauthorized)
    - [4.4.3 403 Forbidden](#443-403-forbidden)
    - [4.4.4 Not Found](#444-not-found)
  - [4.5 5xx 서버 에러(Server Error)](#45-5xx-서버-에러server-error)
    - [4.5.1 500 Internal Server Error](#451-500-internal-server-error)
    - [4.5.2 503 Service Unavailable](#452-503-service-unavailable)

## 4.1 상태 코드는 서버로부터 리퀘스트 결과를 전달한다

- 클라이언트 → 서버 : request 보낼 때
- ┣ 서버에서 그 결과가 어떻게 되었는지 알려주는 것이
- ┣ 상태 코드의 역할
- ┗ 정상/오류를 확인 가능함

- 상태 코드 : `200 OK` 같은 예시로
- ┣ 1. 3자리 숫자와, 2. 설명으로 나타냄
- ┣ 숫자의 첫 번째 자리 : response 클래스
- ┗ 나머지 자리 : 분류가 없음

> 상태 코드 클래스

|     | 클래스        | 설명                                        |
| --- | ------------- | ------------------------------------------- |
| 1xx | informational | 리퀘스트를 받아들여 처리중                  |
| 2xx | Success       | 리퀘스트를 정상적으로 처리                  |
| 3xx | Redirection   | 리퀘스트를 완료하기 위해서 추가 동작이 필요 |
| 4xx | Client Error  | 서버 : request 이해 불가능                  |
| 5xx | Server Error  | 서버 : request 처리 실패                    |

- `클래스의 정의`만 지킨다면 :
- ┣ RFC2616에서 정의된 `상태 코드를 변경`하거나
- ┣ 서버 독자의 상태 코드를 `만들어도 상관없음`
- ┣ HTTP 상태 코드는 60여 가지 종류 이상이 있지만
- ┗ 대표적으로 사용하는 `14종류`에 대해서만 학습

## 4.2 2xx 성공(Success)

- 2xx response : request 정상적으로 처리 되었음

### 4.2.1 200 OK

- client가 보낸 request 서버가 정상적으로 처리 하였음
- ┣ 상태 코드와 함께 되돌아 오는 정보 :
- ┗ 메소드에 따라서 달라짐

- ex ) `GET 메서드`
- ┣ request된 리소스에 엔티티가
- ┗ response로 보내짐

- ex ) `HEAd 메서드`
- ┣ request된 리소스에 대응하는 엔티티 헤더 필드
- ┗ 메시지 바디 동반 X → 리스퐅스로 되돌아옴

### 4.2.2 204 No Content

- 서버가 r`equest를 받아서 처리`하는 데는 `성공`
- ┣ But : response에 엔티티 바디를 포함하지는 않음
- ┣ 어떠한 `엔티티 바디도 되돌려 보내면 안됨`
- ┗ request, response 동작을 하여도 `화면이 안변함`

> 클라이언트 → 서버로 정보를 보내는 것만 필요할 때 사용

### 4.2.3 206 Partial Content

- `Range`에 의해서 `범위가 지정`된 → request에 의해서
- ┣ 서버가 `부분적으로 GET 리퀘스트`를 받았음
- ┗ response : `Content-Range`로 지정된 범위의 `엔티티 포함`

## 4.3 3xx 리다이렉트(Redirection)

- request가 정상적으로 처리를 종료하기 위해서
- ┗ 브라우저에서 특별한 처리를 해주어야 함을 의미

### 4.3.1 301 Moved Permanently

- `response` : `request된 리소스`에 새로운 URI가 부여
- ┣ 그 이후로 그 리소스를 참조하는 URI를 사용해야 한다는 의미
- ┣ 북마크하고 있는 경우 → Location 헤더 필드에서 가리키고 있는
- ┗ URI에 북마크를 다시 하는게 좋다는 것을 나타냄

> URI 주소에 마지막 부분에 /(슬래시) 안 붙인 경우 종종 발생

### 4.3.2 302 Found

- `request 리소스`에는 `새로운 URI가 할당`되어 있기 때문에
- ┣ 그 URI를 참조해 주길 바란다는 의미
- ┣ 301과 비슷해 보이지만
- ┗ `차이점` : `일시적인 이동`이라고 생각하면 됨

- ex ) 북마크
- ┣ 301 : 북마크를 아예 변경함(영구적 이동)
- ┗ 302 : 돌려준 페이지에 대해서 북마크를 진행함(일시적)

### 4.3.3 See Other

- request에 대한 `리소스는 다른 URI`에 있기 때문에
- ┣ `GET 메서드`를 사용해서 얻어야 한다는 것
- ┣ 302와 비슷해 보이지만
- ┗ `차이점` : `redirect 주소`를 무조건 <span style='background-color: #dcffe4'>GET 메서드</span>로 호출

- ex ) POST 메서드로 엑세스한 프로그램
- ┣ 별도의 URI → GET 메서드로 redirect 하고 싶은 경우
- ┗ 303을 사용하게 됨

> 정리

    301, 302, 303 response 코드가 되돌아 오면
    ┣ 대부분의 브라우저 :
    ┣ POST를 → GET 으로 바꾸어서
    ┣ 1. 리퀘스트 엔티티 바디 삭제
    ┣ 2. 리퀘스트를 자동적으로 재송신
    ┣ 301, 302는 POST → GET 금지하고는 있지만
    ┗ 이렇게 구현 되어 있는 것이 대부분

### 4.3.4 304 Not Modified

- client가 조건부 리퀘스트를 요청한 경우
- ┣ 리소스에 대한 엑세스는 <span style='background-color: #fff5b1'>허락</span> 하지만
- ┣ 조건이 충족되지 않음 표시
- ┣ response 바디에 → 어떤 것도 포함시켜서는 안됨
- ┗ 304 : 3xx에 분류되어 있지만 <span style='background-color: #fff5b1'>redirect와는 관계 없음</span>

### 4.3.5 307 Temporary Redirect

- 302 Found와 `같은 의미`를 지니지만
- ┣ 302의 경우 : POST → GET 치환 금지 되어 있지만 구현
- ┣ 307 : POST에서 GET으로 치환을 안함
- ┗ But : 브라우저마다 리스폰스를 처리하는 동작이 다를 수 있음

## 4.4 4xx 클라이언트 에러(Client Error)

- 4xx response : <span style='background-color: #fff5b1'>클라이언트 원인</span>으로 → 에러가 발생

### 4.4.1 400 Bad Request

- request 구문이 잘못되었음을 나타냄
- ┣ 에러가 발생한 경우 : request 내용을 재검토하고 나서
- ┣ `재송신의 필요성`이 존재
- ┗ 브라우저 → 이를 <span style='background-color: #fff5b1'>200 OK</span>와 같이 취급

### 4.4.2 401 Unauthorized

- 송신한 request에 HTTP 인증 →
- ┣ (BASIC 인증, DIGEST 인증) 정보가 필요함을 나타냄
- ┣ 이미 1번 리퀘스트가 이루어진 경우 :
- ┗ 유저 인증에 실패했음을 표시

- 401을 포함한 리스폰스를 되돌리는 경우 :
- ┣ request 된 리소스에 적용된 <span style='background-color: #fff5b1'>challenge</span>를 포함한
- ┣ <span style='background-color: #fff5b1'>WWW-Authenticate</span> 헤더 필드를 포함할 필요가 있음
- ┣ 브라우저 : 처음 401 response 받은 경우 : 인증을 위한
- ┗ 다이얼로그가 표시됨

### 4.4.3 403 Forbidden

- request된 리소스의 엑세스가 거부되었음
- ┣ 서버 측 : <span style='background-color: #fff5b1'>거부의 이유를 분명히</span> 할 필요가 존재
- ┣ 이유를 명확하게 하는 경우 : 엔티티 바디에 기재해서
- ┗ 유저 측에 표시함

- 원인의 이유 : 1. 파일 시스템의 퍼미션이 부여 X
- ┗ 2. 엑세스 권한에 문제(허가되지 않는 송신 IP 주소 엑세스)

### 4.4.4 Not Found

- `request한 리소스` → `서버상에 없다는 것`을 나타냄
- ┣ 서버 측에 해당 리퀘스트를 거부하고 싶은 이유를
- ┗ 분명히 하고 싶은 경우에도 이용할 수 있음

## 4.5 5xx 서버 에러(Server Error)

- 5xx response : 서버 원인으로 에러가 발생하고 있음

### 4.5.1 500 Internal Server Error

- 서버에서 `request를 처리하는 도중`에 에러가 발생
- ┗ 웹 에플리케이션에 에러가 발생하는 경우, 일식적인 오류

### 4.5.2 503 Service Unavailable

- 일시적으로 서버가 `과부하 상태`, `점검중 `
- ┣ → 리퀘스트를 처리할 수 없음을 나타냄
- ┣ 상태가 해소되기까지 걸리는 경우에는
- ┗ `Retry-After 헤더 필드`에 따라 클라이언트에 전달이 바람직

> 상태 코드가 현재 상황과 불일치 할 수 있음

    response로 되돌아오는 상태 코드의 대부분
    ┣ 유저가 다른 내용을 알기 어렵게 되어 있음
    ┣ ex ) 웹 애플리케이션 오류가 나더라도
    ┗ [200 OK] 되돌아오는 경우가 존재
