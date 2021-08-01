interface MPerson {
  name: string;
  age: number;
}
interface PersonOptional {
  name?: string;
  age?: number;
}
interface PersonReadOnly {
  readonly name: string;
  readonly age: number;
}

type T11 = MPerson['name'];
type ReadOnly<T> = { readonly [P in keyof T]: T[P] };
type Partial2<T> = { [P in keyof T]?: T[P] };
type T2 = Partial2<MPerson>;
type T3 = ReadOnly<MPerson>;
