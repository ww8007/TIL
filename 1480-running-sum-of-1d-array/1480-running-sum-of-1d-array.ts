function runningSum(nums: number[]): number[] {
  return nums.reduce((acc, cur, i) => {
    return [...acc, i ? acc[i - 1] + cur : cur];
  }, <number[]>[]);
}
