# Docker

### 소개

- 다양한 클라우드 서비스 제공
- 개발, 테스트, 서비스 환경 하나로 묶어서 사용할 수 있다는 것이 가장 장점
- 컨테이너 모두 공유를 가능하다.

> 컨테이너 기술

    리눅스에서 제공
    이를 통해서 도커가 가능

### 가상화

- 가상머신

  - 컴퓨터 안에서 컴퓨터를 생성하기 위한 방법
  - 1960년대 새로 생성
  - 서버에 가상머신을 생성하여 효율적으로 사용하는 것이 목적이다.
  - 이미지 하나로 서버를 여러개 생성 가능

- 클라우드 서비스

  - 웹호스팅 : 실제 물리적인 서버를 공유
  - 클라우드 : 가상 머신 안에 실제로 컴퓨터가 운영

- 단점
  - 성능적인 손실이 생기게된다.
  - cpu 안에 가상화 기능을 넣게 됨

> 이로 인해서 반가상화 기능 출시

    이것도 문제가 있음

- 가상 머신 - 각각의 운영환경을 설정하기 때문에 성능 문제가 큼

  - 이미지 용량도 크다는 것이 문제이다.
  - 서버 운영에 관련한 배포와 운영 문제가 생김

- 도커 : 리눅스 컨테이너 사용

## 도커의 특징

- 도커의 컨테이너

  - 게스트 os를 별도로 설치하지 않음
  - 프로그램과 라이브러리만 격리해서 설치
  - 이미지 용량 크게 줄어듬
  - 하드웨어 계층의 가상화 개념이 없음
  - 호스트와 게스트의 성능 차이가 크지 않음

- 데브 옵스

  - 운영과 서버 관리의 개념에서 장점이 많음
  - 이미지 관리 버전 제공
  - 이미지를 올리고 받을 수 있음
  - 도커 허브 제공

- 개발과 서버 운영에 매우 큰 장점을 가짐

> 이미지, 컨테이너의 차이점

    이미지 : 서버 프로그램, 소스 코드, 컴파일된 실행파일을 묶은 것
        저장소에 올리고 사용하는 형식
        실행파일
    컨테이너 : 런타임 상태임
        이미지를 여러개의 컨테이너
        프로세스

- 유니온 파일 시스템 형식

  - 도커 : 바뀐 부분만 실행
  - 컨테이너 : 베이스, 바뀐 이미지

- 각 이미지 의존 관계를 가짐

- 어느 곳에서도 같은 환경을 제공할 수 있다는 점이 매우 큰 장점이다.

### 도커 설치 및 사용

- 터미널 상에서 사용

> docker version

    모든 내용 나옴

> docker -v

    health check 과정

- 이미지 검색
  docker search

- docker pull
  - 깃허브 pull : 코드에 반영
  - docker pull ubuntu
    - docker pull ubuntu:latest

> 구체적인 특정 버전을 설치하고 싶은 경우 버전 명을 명시시켜 주면 된다.

> docker run

    docker run ubuntu -d -it
    -d : background
    -it : 터미널 입력을 위한 옵션
    ubuntu:latest /bin/bash

> docker ps -a

    현재 실행 중인 docker 의 모든 컨테이너를 보여줌

> docker stop [컨테이너 아이디]

## Docker compose 와 Dockerfile

> 명령어

- FROM
  - 설치할 프레임워크 명
    - 이미지 불러오기
    - 어느 도커 이미지에서 불러올지 결정
    -
- WORKDIR

  - /usr/src/app

- COPY
  - package.json ./
  - 저 파일을 복사
- RUN

  - npm install

- COPY

  - app src에 있는 것들을 번들

- EXPOSE

  - 포트를 오픈

- CMD

  - 터미널 명령어 - ["node", "server.js"]
  - node server.js

- context : 현재 폴더에 빌드를 해라

- build

  - ./

- 도커에서 특정 버전을 지정해주는 것이 좋음
-
- links

  - 컨테이너 있는 mongo_db:mongo_db
  - 컨테이너에 있는 이름을 나에게 연결하겠다는 의미

- depends_on

  - flask가 구동되기 전에
  - 종속되는 파일을 먼저 구성

- bridge

  - 브릿지라는 이름으로
  - 네트워크 분리 개념을 사용가능하다.

- restart

  - always
  - 프로그램 코드를 바꾼 경우 재 컴파일을 해줌
  -

- 컨테이너는 임시로 떠있는 개념이기 때문에 로컬에 volume을 생성해서 사용을 한다.

- volumes

  - ./mysql/db:/var/lib/mysql

- build

  - 커스터 마이징을 하냐 안하냐의 차이가 이 점이다.
  -

- 도커의 디버그 모드를 설정이 가능하다.

  - .env dev=1

- docker run idle container
- docker exec -it into container

> 실행 명령어

    docker build -t app .
    docker run -p -8000:8080 -d app
    포트 : 외부 -> 내부

## 실행중인 도커 중지 및 쉘 접근

- 도커 중지

sudo docker stop [id]

- 도커 쉘로 접근

docker exec -it [id] /bin/bash
docker exec -it 5f7ab000cc5f /bin/bash
