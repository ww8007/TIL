interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface Jap extends Person {
  liveInTokyo: boolean;
}

const p1: Person = { name: 'mike', age: 23 };
const p2: Korean = { name: 'mike', age: 25, liveInSeoul: true };
const p3: Jap = { name: 'mike', age: 27, liveInTokyo: false };
const arr13 = [p1, p2, p3];
const arr23 = [p2, p3];
