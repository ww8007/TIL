interface YearPriceMap {
  [year: number]: number;
  [year: string]: number | string;
}

const yearMap: YearPriceMap = {};
yearMap[1998] = 1000;
// yearMap[1998] = 'abc'; // type error
yearMap['2000'] = 1234;
yearMap['2000'] = 'million';
