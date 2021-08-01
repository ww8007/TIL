const arr1 = [10, 20, 30];
const [n1, n2, n3] = arr1;
// arr1.push('a'); // type error

const arr2 = { id: 'abcd', age: 123, lan: 'kor' };
//const arr2 = {id: string, age: number, lan: string};
const { id, age, lan } = arr2;
// console.log(id === age); // type error
