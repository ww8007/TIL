function identify<T extends number | string>(p1: T): T {
  return p1;
}
identify(1);
identify('a');
// identify([]); // type error
