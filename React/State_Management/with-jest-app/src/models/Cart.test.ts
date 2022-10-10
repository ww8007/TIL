import Cart from './Cart';

describe('Cart', () => {
	let cart: Cart;

	beforeEach(() => {
		cart = new Cart();
	});

	it('adds an item', () => {
		cart.addItem({ productId: 1, quantity: 3 });
	});
});
