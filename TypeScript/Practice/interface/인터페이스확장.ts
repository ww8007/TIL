interface PersonExtend {
  name: string;
  age: number;
}

interface Programmer {
  Lang: string;
}

interface Korean extends PersonExtend, Programmer {
  isLiveInSeoul: boolean;
}

// interface Korean {
//   name: string;
//   age: number;
//   isLiveInSeoul: boolean;
// }
