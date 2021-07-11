async function myFunc() {
  await new Promise((res) => setTimeout(res, 1000)); //-1-
  const [{ add }, { default: _ }] = await Promise.all([
    import(/* webpackPreload: true */ './util'), //-2-
    import(/* webpackPrefetch: true */ 'lodash'), //-3-
  ]);
  console.log('value', _.fill([1, 2, 3], add(30, 20)));
}
myFunc();
