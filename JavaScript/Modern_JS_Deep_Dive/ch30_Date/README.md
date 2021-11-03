# 30. Date

- `표준 빌트인 객체 Date` : 날짜와 시간
- ┣ (연, 월, 일, 시 분, 초, 밀리초)을 위한
- ┗ `메서드를 제공`하는 `빌트인 객체`이면서 `생성자 함수`임

- UTC : 국재 표준시를 말함
- ┣ UTC : GMT(그리니치 평균시)로 불리기도 함
- ┣ UTC, GMT의 경우 `초의 소수점 단위`에서만
- ┣ 차이점이 존재하기 때문에
- ┗ 일상에서는 혼용되어 사용(UTC 더 많이 사용)

- KST(한국 표준시) : UTC + 9 시간임
- ┣ KST : UTC보다 9시간이 빠르다고 할 수 잇음
- ┣ UTC 00:00 AM → KST 09:00 AM
- ┣ 현재 날짜와 시간은 JS 코드가 실행된 시스템의
- ┗ 시계에 의해서 결정됨

## 목차

- [30. Date](#30-date)
  - [목차](#목차)
  - [30.1 Date 생성자 함수](#301-date-생성자-함수)
    - [30.1.1 new Date()](#3011-new-date)
    - [30.1.2 new Date(milliseconds)](#3012-new-datemilliseconds)
    - [30.1.3 new Date(dateString)](#3013-new-datedatestring)
    - [30.1.4 new Date(year, month[,day,hour,minute,second,millisecond])](#3014-new-dateyear-monthdayhourminutesecondmillisecond)
  - [30.2 Date 메서드](#302-date-메서드)
    - [30.2.1 Date.now](#3021-datenow)
    - [30.2.2 Date.parse](#3022-dateparse)
    - [30.2.3 Date.UTC](#3023-dateutc)
    - [30.2.4 Date.prototype.getFullYear](#3024-dateprototypegetfullyear)
    - [30.2.5 Date.prototype.setFullYear](#3025-dateprototypesetfullyear)
    - [30.2.6 Date.prototype.getMonth](#3026-dateprototypegetmonth)
    - [30.2.7 Date.prototype.setMOnth](#3027-dateprototypesetmonth)
    - [30.2.8 Date.prototype.getDate](#3028-dateprototypegetdate)
    - [30.2.9 Date.prototype.setDate](#3029-dateprototypesetdate)
    - [30.2.10 Date.prototype.getDay](#30210-dateprototypegetday)
    - [30.2.11 Date.prototype.getHours](#30211-dateprototypegethours)
    - [30.2.12 Date.prototype.setHours](#30212-dateprototypesethours)
    - [30.2.13 Date.prototype.getMinutes](#30213-dateprototypegetminutes)
    - [30.2.14 Date.prototype.setMinutes](#30214-dateprototypesetminutes)
    - [30.2.15 Date.prototype.getSeconds](#30215-dateprototypegetseconds)
    - [30.2.16 Date.prototype.setSeconds](#30216-dateprototypesetseconds)
    - [30.2.17 Date.prototype.getMilliseconds](#30217-dateprototypegetmilliseconds)
    - [30.2.18 Date.prototype.setMilliseconds](#30218-dateprototypesetmilliseconds)
    - [30.2.19 Date.prototype.getTime](#30219-dateprototypegettime)
    - [30.2.20 Date.prototype.setTime](#30220-dateprototypesettime)
    - [30.2.21 Date.prototype.getTimezoneOffset](#30221-dateprototypegettimezoneoffset)
    - [30.2.22 Date.prototype.toDateString](#30222-dateprototypetodatestring)
    - [30.2.24 Date.prototype.toISOString](#30224-dateprototypetoisostring)
    - [30.2.25 Date.prototype.toLocaleString](#30225-dateprototypetolocalestring)
    - [30.2.26 Date.prototype.toLocaleTimeString](#30226-dateprototypetolocaletimestring)

## 30.1 Date 생성자 함수

- Date : 생성자 함수임
- ┣ Date 생성자 함수로 생성한 → Date 객체
- ┣ 내부적으로 날짜와 시간을 나타내는 `정수값을 가짐`
- ┣ 모든 시간의 기점 : `1970년 1월 1일 0시`
- ┣ 현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우
- ┣ Date 생성자 함수에 명시적으로 해당 날짜와
- ┣ 시간 정보를 인수로 지정함
- ┗ Date 생성자 함수로 객체를 생성하는 방법 : 4가지

### 30.1.1 new Date()

- Date 생성자 함수 : new 연산자와 함께 호출하면
- ┣ 현재 날짜와 시간을 가지는 Date 객체를 반환함
- ┣ Date 객체 : `내부적으로 날짜와 시간`을 나타내는
- ┣ 정수값을 가지지만 `Date 객체를 콘솔에 출력`하면
- ┗ `기본적으로 날짜와 시간 정보를 출력함`

```js
new Date(); // Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)
```

- Date 생성자 함수를 new 연산자 없이 호출하면
- ┣ Date 객체를 반환하는 것이 아닌
- ┗ `날짜와 시간 정보를 나타내는 문자열을 반환`함

```js
Date(); // "Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)"
```

### 30.1.2 new Date(milliseconds)

- Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면
- ┣ `1970년 1월 1일 00:00:00(UTC)` 기점으로
- ┣ 인수로 전달된 `밀리초만큼 경과한 날짜와 시간을 나타내는`
- ┗ Date 객체를 반환함

```js
// 한국 표준시 KST : 협정 세계시 UTC에 9시간을 더한 시간임
new Date(0); // Thu Jan 01 1970 09:00:00 GMT +0900 (대한민국 표준시)

// 86400000ms : 1day를 의미함
1s = 1000ms
1m = 60s
new Date(86400000); // Fri Jan 02 1970 09:00:00 GMT +0900 (대한민국 표준시)
```

### 30.1.3 new Date(dateString)

- Date 생성자 함수에 `날짜와 시간을 나타내는`
- ┣ `문자열을 인수로 전달`하면
- ┣ `지정된 날짜와 시간을 나타내는`
- ┣ `Date 객체를 반환`하게 됨
- ┣ 이때 : `인수로 전달한 문자열`의 경우
- ┗ `Date.parse 메서드`에 의해 해석이 가능한 형식이어야함

```js
new Date('May 26, 2020 10:00:00');
// Tue May 26 2020 10:00:00 GMT +0900 (대한민국 표준시)

new Date('2020/03/26/10:00:00');
// Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

### 30.1.4 new Date(year, month[,day,hour,minute,second,millisecond])

- Date 생성자 함수에 연,월,일,시,분,초 밀리초를
- ┣ 의미하는 숫자를 인수로 전달하면
- ┣ 지정된 날짜와 시간을 나타내는
- ┣ Date 객체를 반환함
- ┣ 이때 `연, 월은 반드시 지정해야함`
- ┗ `지정하지 않은 옵션 정보는 0또는 1로 초기화 됨`

| 인수        | 내용                                                                |
| ----------- | ------------------------------------------------------------------- |
| year        | 연을 나타내는 1900년 이후의 정수, 0부터 99는 1900부터 1999로 처리됨 |
| month       | 월을 나타내는 0 ~ 11 까지의 정수(주의:0부터 시작 0 = 1월)           |
| day         | 일을 나타내는 1 ~ 31 까지의 정수                                    |
| hour        | 시를 나타내는 0 ~ 23 까지의 정수                                    |
| minute      | 분을 나타내는 0 ~ 59 까지의 정수                                    |
| second      | 초를 나타내는 0 ~ 59 까지의 정수                                    |
| millisecond | 밀리초를 나타내는 0 ~ 999까지의 정수                                |

- 연, 월을 지정하지 않은 경우 :
- ┣ 1970년 1월 1일 00:00:00(UTC)를 나타내는
- ┗ Date 객체를 반환함

```js
// 월을 나타내는 2는 3월을 의미함
// 2020/3/1/00:00:00
new Date(2020, 2);
// Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미함
// 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// 이게 더 가독성이 좋음
new Date('2020/3/26/10:00:00:00');
```

## 30.2 Date 메서드

### 30.2.1 Date.now

- 1970년 1월 1일 00:00:00(UTC)를 기점으로
- ┗ 현재 시간까지 경과한 밀리초를 숫자로 반환함

```js
Date.now(); // 1593971539112
```

### 30.2.2 Date.parse

- 1970년 1월 1일 00:00:00(UTC)를 기점으로
- ┣ 인수로 전달된 지정 시간(new Date(dateString)의 인수와)
- ┗ 동일한 형식까지의 밀리초를 숫자로 반환함

```js
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // 86400000
// KST
Date.parse('Jan 2, 1970 09:00:00'); // 86400000

// KST
Date.parse('1970/01/02/09:00:00'); // 86400000
```

### 30.2.3 Date.UTC

- 1970년 1월 1일 00:00:00(UTC) 기점으로
- ┣ 인수로 전달된 지정 시간까지의 밀리초를
- ┣ 숫자로 변환하게됨
- ┣ Date.UTC 메서드 : `new Date(year, month[,day,hour,minute,second, millisecond])`
- ┣ 와 같은 형식의 인수를 사용해야함
- ┣ `Date.UTC 메서드의 인수` :
- ┣ 로컬 타임(KST)가 아닌 → `UTC로 인식됨`
- ┣ `month` : 월을 의미하는 0 ~ 11 까지의 인수
- ┗ `0 부터 시작하니 주의 필요`

```js
Date.UTC(1970, 0, 2); // 86400000
Date.UTC('1970/1/2'); // NaN
```

### 30.2.4 Date.prototype.getFullYear

- Date 객체의 연도를 나타내는 정수를 반환함

```js
new Date('2020/07/24').getFullYear(); // 2020
```

### 30.2.5 Date.prototype.setFullYear

- Date 객체에 연도를 나타내는 정수를 설정함
- ┗ 옵션으로 월, 일도 설정이 가능함

```js
const today = new Date();

// 년도 지정
today.setFullYear(2000);
today.getFullYear(); // 2000

// 년도/월/일 지정
today.setFullYear(1900, 0, 1);
today.getFullYear(); // 1900
```

### 30.2.6 Date.prototype.getMonth

- Date 객체의 월을 나타내는
- ┣ 0 ~ 11의 정수를 반환함
- ┗ 1월 : 0, 12월 : 11임

```js
new Date('2020/07/24').getMonth(); // 6
```

### 30.2.7 Date.prototype.setMOnth

- Date 객체의 월을 나타내는
- ┣ 0 ~ 11의 정수를 설정함
- ┣ 1월 : 0, 12월 : 11
- ┗ `월 이외의 옵션에 일도 설정 가능`

```js
const today = new Date();

// 월 지정
today.setMonth(0); // 1월
today.getMonth(); // 0

// 월/일 지정
today.setMonth(11, 1); // 12월 1일
today.getMonth(); // 11
```

### 30.2.8 Date.prototype.getDate

- Date 객체의 날짜( 1 ~ 31 )를 나타내는 정수를 반환함

```js
new Date('2020/07/24').getDate(); // 24
```

### 30.2.9 Date.prototype.setDate

- Date 객체에 날짜(1~31)을 나타내는 정수를 설정함

```js
const tody = new Date();

// 날짜 지정
today.setDate(1);
today.getDate(); //1
```

### 30.2.10 Date.prototype.getDay

- Date 객체의 요일(0~6)을 나타내는 정수를 반환함

| 요일   | 반환값 |
| ------ | ------ |
| 일요일 | 0      |
| 월요일 | 1      |
| 화요일 | 2      |
| 수요일 | 3      |
| 목요일 | 4      |
| 금요일 | 5      |
| 토요일 | 6      |

```js
new Date('2020/07/24').getDay(); // 5
```

### 30.2.11 Date.prototype.getHours

- Date 객체의 시간(0~23)을 나타내는 정수를 반환함

```js
new Date('2020/07/24/12:00').getHours(); // 12
```

### 30.2.12 Date.prototype.setHours

- Date 객체에 시간 (0 ~ 23)을 나타내는 정수를 설정함
- ┗ 시간 이외에 옵션으로 분, 초, 밀리초도 설정 가능

```js
const today = new Date();

// 시간 지정
today.setHours(7);
today.getHOurs();

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00
today.getHours();
```

### 30.2.13 Date.prototype.getMinutes

- Date 객체의 분 (0 ~ 59)을 나타내는 정수를 반환함

```js
new Date('2020/07/24/12:30').getMinutes(); // 30
```

### 30.2.14 Date.prototype.setMinutes

- Date 객체에 분 (0 ~ 59)을 나타내는 정수를 설정함
- ┗ 분 이외에 옵션으로 초, 밀리초도 설정이 가능함

```js
const today = new Date();

// 분 지정
today.setMinutes(50);
today.getMinutes(); // 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999
today.getMinutes(); // 5
```

### 30.2.15 Date.prototype.getSeconds

- Date 객체의 초 (0~59)를 나타내는 정수를 반환함

```js
new Date('2021/07/24:12:30:10').getSeconds(); // 10
```

### 30.2.16 Date.prototype.setSeconds

- Date 객체에 초 (0 ~ 59)를 나타내는 정수를 설정함
- ┗ 초 이외에 옵션으로 밀리초 설정 가능

### 30.2.17 Date.prototype.getMilliseconds

- Date 객체의 밀리초(0 ~ 999)를 나타내는 정수를 반환함

```js
new Date('2020/07/24/12:30:00:150').getMilliseconds(); // 150
```

### 30.2.18 Date.prototype.setMilliseconds

- Date 객체에 밀리초(0~999)를 나타는 정수를 설정

### 30.2.19 Date.prototype.getTime

- `1970년 1월 1일 00:00:00(UTC)` 기점으로
- ┗ Date 객체의 시간까지 경과된 밀리초를 반환함

```js
new Date('2020/07/24/12:30').getTime(); // 1595561400000
```

### 30.2.20 Date.prototype.setTime

- Date 객체에 1970년 1월 1일 00:00:00(UTC)를 기점으로
- ┗ 경과된 밀리초를 설정함

```js
const today = new Date();

today.setTime(86400000);
console.log(today);
```

### 30.2.21 Date.prototype.getTimezoneOffset

- UTC와 Date 객체에 지정된 `locale 시간과의 차이를`
- ┣ `분 단위로 반환`하게 됨
- ┣ KST는 9시간을 더한 시간임
- ┗ 즉 : `UTC = KST - 9h 임`

```js
const today = new Date(); // today의 지정 로캘은 KST임

// UTC와 today의 지정 로켈 KST와의 차이는 -9시간임
today.getTimezoneOffset() / 60; // -9
```

### 30.2.22 Date.prototype.toDateString

- 사람이 읽을 수 있는 형식의 문자열로
- ┗ Date 객체의 날짜를 반환함

```js
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 2020 12:30:00 GMT +0900 (대한민국 표준시)
today.toDateString(); // Fri Jul 24 2020
```

### 30.2.24 Date.prototype.toISOString

- ISO 8601 형식으로 Date 객체의 날짜와 시간을
- ┗ 표현한 문자열을 반환함

```js
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 12:30:00 GMT +0900 (대한민국 표준시)
today.toISOString(); // 2020-07-24T03:30:30:00.000Z

today.toISOString().slice(0, 10); // 2020-07-24
today.toISOString().slice(0, 10).replace(/-/g, ''); // 20200724
```

### 30.2.25 Date.prototype.toLocaleString

- `인수로 전달한 로캘을 기준`으로
- ┣ Date 객체의 `날짜와 시간을 표현한 문자열을 반환`
- ┗ 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용

```js
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // 2020/7/24 12:30:00
```

### 30.2.26 Date.prototype.toLocaleTimeString

- 인수로 전달한 로캘을 기준으로
- ┣ `Date 객체의 시간을 표현한 문자열을 반환함`
- ┣ 인수를 생략한 경우 브라우저가
- ┗ 동작 중인 시스템의 로캘을 적용
