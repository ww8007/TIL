import createRouter from "./router";
import createPages from "./pages";

export interface Container {
	textContent: string;
}

const container = document.querySelector("main") as Container;

const pages = createPages(container);

const router = createRouter();

router
	.addRoute("#/", pages.home)
	.addRoute("#/list", pages.list)
	.setNotFound(pages.notFound)
	.start();

const NAV_BTN_SELECTOR = "button[data-navigate]";

document.body.addEventListener("click", (e) => {
	const target = e.target as HTMLElement;
	if (target && target.matches(NAV_BTN_SELECTOR)) {
		const { navigate } = target.dataset;
		navigate && router.navigate(navigate);
	}
});
