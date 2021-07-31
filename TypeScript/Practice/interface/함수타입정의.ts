interface GetInfoText {
  (name: string, age: number): string;
}

const InfoText: GetInfoText = function (name, age) {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age${ageText}`;
};
