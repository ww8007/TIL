declare global {
	interface Window {
		faker: {
			random: {
				number: (max: number) => number;
				boolean: () => boolean;
				words: (count: number) => string;
			};
		};
	}
}

const { faker } = window;

const createElement = () => ({
	text: faker.random.words(2),
	completed: faker.random.boolean()
});

const repeat = (
	elementFactory: () => { text: string; completed: boolean },
	number: number
) => {
	const array = [];
	for (let index = 0; index < number; index++) {
		array.push(elementFactory());
	}
	return array;
};

export default () => {
	const howMany = faker.random.number(10);
	return repeat(createElement, howMany);
};
