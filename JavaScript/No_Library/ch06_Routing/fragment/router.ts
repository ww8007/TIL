interface Route {
	fragment: string;
	component: () => void;
}

interface Router {
	addRoute: (fragment: string, component: () => void) => Router;
	setNotFound: (cb: () => void) => Router;
	start: () => void;
}

export default () => {
	const routes: Route[] = [];
	let notFound = () => {};

	const router: Router = {} as Router;

	const checkRoutes = () => {
		const currentRoute = routes.find((route) => {
			return route.fragment === window.location.hash;
		});

		if (!currentRoute) {
			notFound();
			return;
		}

		currentRoute.component();
	};

	router.addRoute = (fragment, component) => {
		routes.push({
			fragment,
			component
		});

		return router;
	};

	router.setNotFound = (cb) => {
		notFound = cb;
		return router;
	};

	router.start = () => {
		window.addEventListener("hashchange", checkRoutes);

		if (!window.location.hash) {
			window.location.hash = "#/";
		}

		checkRoutes();
	};

	return router;
};
