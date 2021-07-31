interface GetInfoText3 {
  (name: string, age: number): string;
  totalCall: number;
}
const getInfoText2: GetInfoText3 = function (name, age) {
  getInfoText2.totalCall += 1;
  console.log(`totalCall: ${getInfoText2.totalCall}`);
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age${ageText}`;
};

getInfoText2.totalCall = 0;
