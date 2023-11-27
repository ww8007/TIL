import registry from "./core/registry";
import { State } from "./core/types";
import appView from "./view/app";
import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import applyDiff from "./core/applyDiff";
import stateFactory from "./model/state";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const loadState = () => {
	const serializedState = window.localStorage.getItem("state");

	if (!serializedState) {
		return;
	}

	return JSON.parse(serializedState);
};

const state = stateFactory(loadState());

const { addChangeListener, ...events } = state;

const render = (state: State) => {
	window.requestAnimationFrame(() => {
		const main = document.querySelector("#root") as HTMLElement;

		const newMain = registry.renderRoot(main, state, events);

		applyDiff(document.body, main, newMain);
	});
};

addChangeListener(render);

addChangeListener((state: State) => {
	Promise.resolve().then(() => {
		window.localStorage.setItem("state", JSON.stringify(state));
	});
});

addChangeListener((state: State) => {
	console.log(`Current State (${new Date().getTime()})`, state);
});
