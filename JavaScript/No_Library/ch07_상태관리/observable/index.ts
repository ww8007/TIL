import registry from "./core/registry";
import { CustomEvents, State } from "./core/types";
import appView from "./view/app";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import applyDiff from "./core/applyDiff";

import modelFactory from "./model/model";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const model = modelFactory();

const { addChangeListener, ...events } = model;

const render = (state: State) => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector("#root") as HTMLElement;

		const newMain = registry.renderRoot(main, state, events);

		applyDiff(document.body, main, newMain);
	});
};

addChangeListener(render);
