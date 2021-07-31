interface Person3 {
  name: string;
  age: number | undefined;
}
// const p3: Person3 = { name: 'mike' }; // type error
const p4: Person3 = { name: 'mike', age: undefined };
