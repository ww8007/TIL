import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';
let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);
// console.log([...m.entries()]);
// console.log([...m.keys()]);
// console.log([...m.values()]);

const entries = function* (obj) {
	for (const k in obj) {
		yield [k, obj[k]];
	}
};

_.go(
	m,
	L.filter(([k, v]) => v % 2),
	_.takeAll,
	(entries) => new Map(entries),
	console.log
);

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;
console.log(_.reduce(add, s));

class Model {
	constructor(attrs = {}) {
		this._attrs = attrs;
	}
	get(k) {
		return this._attrs[k];
	}
	set() {
		this._attrs[k] = v;
		return this;
	}
}

class Collection {
	constructor(models = []) {
		this._models = models;
	}
	at(idx) {
		return this._models[idx];
	}
	add(model) {
		this._models.push(model);
		return this;
	}
	*[Symbol.iterator]() {
		for (const model of this._models) {
			yield model;
		}
	}
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));
console.log(coll.at(2).get('name'));

_.go(
	coll,
	L.map((m) => m.get('name')),
	_.each(console.log)
);

class Product extends Model {}

const addAll = _.reduce(add);

class Products extends Collection {
	getPrices() {
		return L.map((p) => p.get('price', this));
	}
	totalPrice() {
		return addAll(this.getPrices());
	}
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());
