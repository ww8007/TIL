type Te = number | string | never; // string | number
type Exclude2<T, U> = T extends U ? never : T;
type Ttwo = Exclude2<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7
type TThree = Exclude2<string | number | (() => void), Function>; // string | number
type Extract2<T, U> = T extends U ? T : never;
type TFour = Extract2<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5
