interface Person11 {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}
class SomePerson implements Person11 {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  isYoungerThan(age: number) {
    return this.age < age;
  }
}
