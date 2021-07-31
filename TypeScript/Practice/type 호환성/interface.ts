interface PersonInterface {
  name: string;
  age: number;
}
interface ProductInterface {
  name: string;
  age: number;
}
const person: PersonInterface = { name: 'mike', age: 23 };
const product: ProductInterface = person;
