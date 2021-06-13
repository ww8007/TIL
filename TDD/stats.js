exports.max = (numbers) => Math.max(...numbers);
exports.min = (numbers) => Math.min(...numbers);
exports.avg = (numbers) =>
  numbers.reduce((acc, cur, index, { length }) => acc + cur / length, 0);
