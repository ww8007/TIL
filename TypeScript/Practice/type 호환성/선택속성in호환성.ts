interface PersonInterface {
  name: string;
  //   age?: number;
}
interface ProductInterface {
  name: string;
  age: number;
}
// -1-
const person1: PersonInterface = { name: 'mike', age: 23 };
const product1: ProductInterface = person;

// 위의 경우 불가
// --------------
// 아래의 경우 person < product -> 할당 가능

interface PersonInterface2 {
  name: string;
  age: number;
}
interface ProductInterface2 {
  name: string;
  age?: number;
}
// -1-
const person2: PersonInterface2 = { name: 'mike', age: 23 };
const product2: ProductInterface2 = person;
