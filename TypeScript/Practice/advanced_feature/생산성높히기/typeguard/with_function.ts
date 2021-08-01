function isPerson(x: any): x is Person {
  return (x as Person).age !== undefined;
}
function print(value: Person | Product) {
  if (isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
