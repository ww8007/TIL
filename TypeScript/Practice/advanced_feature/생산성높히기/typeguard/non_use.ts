function print(value: number | string) {
  if (typeof value === 'number') {
    console.log((value as number).toFixed(2));
  } else {
    console.log((value as string).trim());
  }
}
