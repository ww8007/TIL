import createRouter from "./router.js";
import createPages from "./pages.js";

export interface Container {
	textContent: string;
}

const container = document.querySelector("main") as Container;

const pages = createPages(container);

const router = createRouter();

router
	.addRoute("/", pages.home)
	.addRoute("/list", pages.list)
	.addRoute("/list/:id", pages.detail)
	.addRoute("/list/:id/:anotherId", pages.anotherDetail)
	.setNotFound(pages.notFound)
	.start();
