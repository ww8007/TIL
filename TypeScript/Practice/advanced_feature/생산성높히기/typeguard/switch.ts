interface Person {
  type: 'person'; // -1-
  name: string;
  age: number;
}
interface Product {
  type: 'product'; // -1-
  name: string;
  age: number;
}

function print(value: Person | Product) {
  switch (value.type) {
    case 'person':
      console.log(value.age);
      break;
    case 'product':
      console.log(value.price);
      break;
  }
}
