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
