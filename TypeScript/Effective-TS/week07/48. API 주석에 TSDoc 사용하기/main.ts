/** 인사말을 생성합니다. 결과는 보기 좋게 꾸며 집니다 */
function getGreeting(name: string) {
	return `Hello ${name.toUpperCase()}`;
}

/**
 * 인사말을 생성합니다.
 * @param name 인사할 사람의 이름
 * @param title 그 사람의 칭호
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function getFullTSDocGreeting(name: string, title: string) {
	return `Hello ${title} ${name.toUpperCase()}`;
}

//** 특정 시간과 장소에서 수행된 측정 */
interface Measurement {
	/** 측정된 시간 */
	time: Date;
	/** 측정된 장소 */
	location: string;
	/** 측정된 값 */
	value: number;
}

/**
 * 이 interface_는 **세 가지** 속성을 가집니다.
 * <span style="color:red">1. x</span>
 * 2. y
 * 3. z
 */
interface Vector3D {
	x: number;
	y: number;
	z: number;
}
