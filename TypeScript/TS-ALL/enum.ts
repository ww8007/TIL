const enum EDirection {
	Up,
	Down,
	Left,
	Right
}
const ODirection = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
} as const;

const a = EDirection.Up;
const b = EDirection.Left;

const obj = { a: '123', b: 'hello', c: 'world' };

type Key2 = typeof obj;
const obj2: Key2 = {
	a: '123',
	b: 'hello',
	c: 'world'
};

type Key3 = keyof typeof obj;
const obj3: Key3 = 'a';
