export interface Params {
	[key: string]: string;
}

interface Route {
	testRegExp: RegExp;
	params: string[];
	component: (params: Params) => void;
}

interface Router {
	addRoute(fragment: string, component: (params: Params) => void): Router;
	addRoute(fragment: string, component: () => void): Router;
	navigate: (fragment: string) => void;
	setNotFound: (cb: () => void) => Router;
	start: () => void;
}

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

const extractUrlParams = (route: Route, windowHash: string) => {
	const params: Params = {};

	if (route.params.length === 0) {
		return params;
	}

	const matches = windowHash.match(route.testRegExp) as string[];

	matches.shift();

	matches.forEach((paramValue, index) => {
		const paramName = route.params[index];
		params[paramName] = paramValue;
	});

	return params;
};

export default () => {
	const routes: Route[] = [];
	let notFound = () => {};

	const router = {} as Router;

	const checkRoutes = () => {
		const { hash } = window.location;

		const currentRoute = routes.find((route) => {
			const { testRegExp } = route;
			return testRegExp.test(hash);
		});

		if (!currentRoute) {
			notFound();
			return;
		}

		const urlParams = extractUrlParams(currentRoute, window.location.hash);

		currentRoute.component(urlParams);
	};

	router.addRoute = (fragment, component) => {
		const params: string[] = [];

		const parsedFragment = fragment
			.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
				params.push(paramName);
				return URL_FRAGMENT_REGEXP;
			})
			.replace(/\//g, "\\/");

		console.log(`^${parsedFragment}$`);

		routes.push({
			testRegExp: new RegExp(`^${parsedFragment}$`),
			component,
			params
		});

		return router;
	};

	router.setNotFound = (cb) => {
		notFound = cb;
		return router;
	};

	router.navigate = (fragment) => {
		window.location.hash = fragment;
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
