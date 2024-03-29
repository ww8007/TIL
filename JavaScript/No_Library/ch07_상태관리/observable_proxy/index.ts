import registry from "./core/registry";
import { State } from "./core/types";
import appView from "./view/app";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import applyDiff from "./core/applyDiff";
import { modelFactory } from "./model/model";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const model = modelFactory();

const render = (state: State) => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector("#root") as HTMLElement;

		const newMain = registry.renderRoot(main, state, model);

		applyDiff(document.body, main, newMain);
	});
};

model.addChangeListener(render);
