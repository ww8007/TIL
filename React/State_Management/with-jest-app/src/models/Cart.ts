import Item from './item';

export default class Cart {
	items: Item[] = [];

	constructor({ items = [] }: { items?: Item[] }) {
		this.items = items;
	}

	addItem({ productId, quantity }: { productId: number; quantity: number }) {
		const id = Math.max(0, ...this.items.map((i) => i.id)) + 1;
		const item = new Item({ id, productId, quantity });

		return new Cart({
			items: [...this.items, item]
		});
	}
}
