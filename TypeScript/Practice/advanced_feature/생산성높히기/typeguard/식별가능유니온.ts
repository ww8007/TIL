interface Person {
  type: 'person';
  name: string;
  age: number;
}
interface Product {
  type: 'product';
  name: string;
  age: number;
}
function print(value: Person | Product) {
  if (value.type === 'person') {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
