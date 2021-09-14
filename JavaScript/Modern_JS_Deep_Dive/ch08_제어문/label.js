'use strict';

foo: {
	console.log(1);
	break foo; // foo 레이블 블록문 탈출
	console.log(2);
}
console.log('Done!');
