import NYStyleCheesePizza from "../nyStyle/NYStyleCheesePizza";
import NYStyleClamPizza from "../nyStyle/NYStyleClamPizza";
import NYStylePepperoniPizza from "../nyStyle/NYStylePepperoniPizza";
import NYStyleVeggiePizza from "../nyStyle/NYStyleVeggiePizza";
import Pizza from "../Pizza";
import PizzaStore from "./PizzaStore";

type PizzaTypes = "cheese" | "veggie" | "clam" | "pepperoni";

type PizzaType = Record<PizzaTypes, Pizza>;

const OBJ: PizzaType = {
	cheese: new NYStyleCheesePizza(),
	veggie: new NYStyleVeggiePizza(),
	clam: new NYStyleClamPizza(),
	pepperoni: new NYStylePepperoniPizza()
} as const;

export default class NYPizzaStore extends PizzaStore {
	createPizza(item: PizzaTypes): Pizza {
		let pizza = OBJ[item];
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();
		return pizza;
	}
}
