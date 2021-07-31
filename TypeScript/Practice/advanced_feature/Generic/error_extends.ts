import { swapProperty } from './extends_advanced';
interface product {
  name: string;
  price: number;
}

const p11: product = {
  name: '시계',
  price: 10000,
};
const p22: product = {
  name: '자전거',
  price: 20000,
};
// const swapProperty = require('./extends_advanced');
swapProperty(p11, p22, 'name');

console.log(p11, p22);
