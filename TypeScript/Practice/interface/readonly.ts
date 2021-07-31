interface ReadOnly {
  readonly name: string;
  age?: number;
}
const p5: ReadOnly = {
  name: 'mike',
};
// p5.name = 'jone';
