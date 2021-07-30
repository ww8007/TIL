var Fruit;
(function (Fruit) {
  Fruit[(Fruit['Apple'] = 0)] = 'Apple';
  Fruit[(Fruit['Banana'] = 5)] = 'Banana';
  Fruit[(Fruit['Orange'] = 5)] = 'Orange';
})(Fruit || (Fruit = {}));
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
