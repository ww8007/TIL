interface PersonExtends {
  name: string;
  age?: number;
  price?: number;
}
interface Korean2 extends PersonExtends {
  liveInSeoul: boolean;
}
export function swapProperty<
  T extends PersonExtends,
  K extends keyof PersonExtends
>(p1: T, p2: T, name: K): void {
  const temp = p1[name];
  p1[name] = p2[name];
  p2[name] = temp;
}

const pE: Korean2 = {
  name: '홍길동',
  age: 23,
  liveInSeoul: true,
};

const p222: Korean2 = {
  name: '김삿갓',
  age: 31,
  liveInSeoul: false,
};
console.log(swapProperty(pE, p222, 'age'));
console.log(pE, p222);
