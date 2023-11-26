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

const events: CustomEvents = {
	addItem: (text) => {
		model.addItem(text);
		render(model.getState());
	},
	updateItem: (index, text) => {
		model.updateItem(index, text);
		render(model.getState());
	},
	deleteItem: (index) => {
		model.deleteItem(index);
		render(model.getState());
	},
	toggleItemCompleted: (index) => {
		model.toggleItemCompleted(index);
		render(model.getState());
	},
	completeAll: () => {
		model.completeAll();
		render(model.getState());
	},
	clearCompleted: () => {
		model.clearCompleted();
		render(model.getState());
	},
	changeFilter: (filter) => {
		model.changeFilter(filter);
		render(model.getState());
	}
};

const render = (state: State) => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector("#root") as HTMLElement;

		const newMain = registry.renderRoot(main, state, events);

		applyDiff(document.body, main, newMain);
	});
};

render(model.getState());
