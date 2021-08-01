function print(value: number | string) {
  if (typeof value === 'number') {
    console.log(value.toFixed(2));
  } else {
    console.log(value.trim());
  }
}
