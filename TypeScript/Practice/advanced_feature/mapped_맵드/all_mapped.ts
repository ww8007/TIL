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

type MakeBool<T> = { [P in keyof T]?: boolean };
const pMap: MakeBool<MPerson> = {};
pMap.name = true;
pMap.age = false;
