function sum(a, b) {
  return a + b;
}

function sumOf(numbers) {
  return numbers.reduce((acc, crr) => acc + crr, 0);
}

exports.sum = sum;
exports.sumOf = sumOf;
