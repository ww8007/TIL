(() => {
  'use strict';
  const o = [
    ['1', 'mike', '23'],
    ['2', 'jone', '26'],
  ];
  for (const s of o) {
    const o = s[1],
      c = s[2];
    console.log(`${o} is ${c} years old`);
  }
})();
