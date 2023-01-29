interface Product {
	id: number;
	name: string;
	price: number;
}

const logProduct = (product: Product) => {
	const id: number = product.id;
	const name: string = product.name;
	const price: number = product.price;
	console.log(id, name, price);
};

const logProduct2 = (product: Product) => {
	const { id, name, price } = product;
	console.log(id, name, price);
};

const elmo: Product = {
	name: "Elmo",
	id: 1,
	price: 10
};

const cache: { [ticker: string]: number } = {};

function getQuote(ticker: string): Promise<number> {
	if (ticker in cache) {
		return Promise.resolve(cache[ticker]);
	}
	return fetch("https://example.com/quote?ticket=" + ticker)
		.then((response) => response.json())
		.then((quote) => {
			cache[ticker] = quote;
			return quote;
		});
}

interface Vector2D {
	x: number;
	y: number;
}

function add(a: Vector2D, b: Vector2D) {
	return { x: a.x + b.x, y: a.y + b.y };
}

add({ x: 1, y: 2 }, { x: 3, y: 4 });
