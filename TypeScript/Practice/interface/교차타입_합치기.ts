interface Person22 {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
type PP = Person22 & Product;
const pp: PP = {
  name: 'a',
  age: 23,
  price: 1000,
};
