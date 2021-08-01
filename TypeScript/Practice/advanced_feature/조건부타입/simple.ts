// T extends U ? X : Y
type IsString<T> = T extends string ? 'yes' : 'no';
type Ts = IsString<string>; // 'yes'
type Tn = IsString<number>; // 'no'

type TUnion = IsString<string | number>;
type TType = IsString<string> | IsString<number>;
