function pivotIndex(nums: number[]): number {
    let rSum = nums.reduce(add);
    let lSum = 0;

    let pastP = 0;
    for (let i = 0; i < nums.length; i++) {
        const pivot = nums[i];
        rSum -= pivot;
        lSum += pastP;
        if (rSum === lSum) return i;
        pastP = pivot; 
    }

    return -1;
};

const add = (a: number, b: number) => a + b;