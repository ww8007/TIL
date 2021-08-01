type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : any;
type Tone = ReturnType2<() => string>; // string
function f1(s: string): number {
  return s.length;
}

type Tt2 = ReturnType2<typeof f1>; // number

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type Tz = Unpacked<string>; // string
type To = Unpacked<string[]>; // string
type Tt = Unpacked<() => string>; // string
type Tth = Unpacked<Promise<string>>; // string
type Tf = Unpacked<Promise<string>[]>; // Promise<string>
type Tfi = Unpacked<Unpacked<Promise<string>[]>>; // string
