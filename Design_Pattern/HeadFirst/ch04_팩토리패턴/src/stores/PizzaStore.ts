import Pizza from "../Pizza";

export default abstract class PizzaStore {
	abstract createPizza(item: string): Pizza;

	public orderPizza(type: string): Pizza {
		// Firebase의 경우, "pizza"가 아닌 "pizza"으로 저장되어 있음.
		let hi = "pizzam";
		let pizza: Pizza = this.createPizza(type);
		if (pizza) {
			console.log("--- Making a " + pizza.getName() + " ---");
			pizza.prepare();
			pizza.bake();
			pizza.cut();
			pizza.box();

			return pizza;
		}
	}
}
