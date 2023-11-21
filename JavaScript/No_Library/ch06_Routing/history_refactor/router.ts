export interface Params {
	[key: string]: string;
}

interface Route {
	testRegExp: RegExp;
	callback: (params: any) => void;
	params: string[];
}

interface Router {
	addRoute(fragment: string, callback: (params: any) => void): Router;
	navigate: (fragment: string) => void;
	setNotFound: (cb: () => void) => Router;
	start: () => void;
}

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";
const TICKTIME = 250;
const NAV_BTN_SELECTOR = "a[data-navigation]";

const extractUrlParams = (route: Route, pathname: string) => {
	const params = {} as Params;

	if (route.params.length === 0) {
		return params;
	}

	const matches = pathname.match(route.testRegExp) as string[];

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
	let lastPathname: string;

	const router = {} as Router;

	const checkRoutes = () => {
		const { pathname } = window.location;
		if (lastPathname === pathname) {
			return;
		}

		lastPathname = pathname;

		const currentRoute = routes.find((route) => {
			const { testRegExp } = route;
			return testRegExp.test(pathname);
		});

		if (!currentRoute) {
			notFound();
			return;
		}

		const urlParams = extractUrlParams(currentRoute, pathname);

		currentRoute.callback(urlParams);
	};

	router.addRoute = (path, callback) => {
		const params: string[] = [];

		const parsedPath = path
			.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
				params.push(paramName);
				return URL_FRAGMENT_REGEXP;
			})
			.replace(/\//g, "\\/");

		routes.push({
			testRegExp: new RegExp(`^${parsedPath}$`),
			callback,
			params
		});

		return router;
	};

	router.setNotFound = (cb) => {
		notFound = cb;
		return router;
	};

	router.navigate = (path) => {
		window.history.pushState(null, "", path);
	};

	router.start = () => {
		checkRoutes();
		window.setInterval(checkRoutes, TICKTIME);

		document.body.addEventListener("click", (e) => {
			const target = e.target as HTMLLinkElement;
			if (target.matches(NAV_BTN_SELECTOR)) {
				// 라우터의 표준 탐색 비활성화
				e.preventDefault();
				router.navigate(target.href);
			}
		});
	};

	return router;
};
