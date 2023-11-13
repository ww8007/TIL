const axios = require("axios").default;
const https = require("https");
const fetch = require("node-fetch");

type fetcherFunction = (url: string, args?: any) => Promise<any>;

function createFetcher() {
	const _identifer = Symbol("_createFetcher_");
	let fetchStrategy: fetcherFunction;

	const isFetcher = (fn: fetcherFunction) => _identifer in fn;

	function createFetch(fn: fetcherFunction) {
		const fetchFn = async function _fetch(url: string, args?: any) {
			return fn(url, args);
		};
		fetchFn[_identifer] = true;
		return fetchFn;
	}

	return {
		get fetch() {
			return fetchStrategy;
		},
		create(fn: fetcherFunction) {
			return createFetch(fn);
		},
		use(fetcher: fetcherFunction) {
			if (!isFetcher(fetcher)) {
				throw new Error(`The fetcher provided is invalid`);
			}
			fetchStrategy = fetcher;
			return this;
		}
	};
}

const fetcher = createFetcher();
