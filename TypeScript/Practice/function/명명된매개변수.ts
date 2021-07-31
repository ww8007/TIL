function getInfoText({
  name,
  age = 15,
  language,
}: {
  name: string;
  age?: number;
  language?: string;
}): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}

interface Param {
  name: string;
  age?: number;
  language?: string;
}
function getInfoText2({ name, age = 15, language }: Param) {
  // ...
}
