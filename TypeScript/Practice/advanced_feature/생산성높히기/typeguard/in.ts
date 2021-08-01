interface Person2 {
  type: 'person'; // -1-
  name: string;
  age: number;
}
interface Product2 {
  type: 'product'; // -1-
  name: string;
  price: number;
}

function print(value: Person2 | Product2) {
  if ('age' in value) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
