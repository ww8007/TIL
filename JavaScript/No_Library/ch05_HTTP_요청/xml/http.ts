interface RequestParams {
	method?: string;
	url: string;
	headers?: HeadersInit;
	body?: unknown;
}

interface Response<T> {
	status: number;
	data: T;
}

const setHeaders = (xhr: XMLHttpRequest, headers: HeadersInit) => {
	Object.entries(headers).forEach((entry) => {
		const [name, value] = entry;

		xhr.setRequestHeader(name, value);
	});
};

const parseResponse = (xhr: XMLHttpRequest) => {
	const { status, responseText } = xhr;
	console.log("responseText", responseText);
	let data;
	if (status !== 204) {
		data = JSON.parse(responseText);
	}

	return {
		status,
		data
	};
};

const request = <T>(params: RequestParams): Promise<Response<T>> => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		const { method = "GET", url, headers = {}, body } = params;

		xhr.open(method, url);

		setHeaders(xhr, headers);

		xhr.send(JSON.stringify(body));

		xhr.onerror = () => {
			reject(new Error("HTTP Error"));
		};

		xhr.ontimeout = () => {
			reject(new Error("Timeout Error"));
		};

		xhr.onload = () => resolve(parseResponse(xhr));
	});
};

const get = async (url: string, headers?: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: "GET"
	});

	return response.data;
};

const post = async (url: string, body: unknown, headers?: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: "POST",
		body
	});
	return response.data;
};

const put = async (url: string, body: unknown, headers?: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: "PUT",
		body
	});
	return response.data;
};

const patch = async (url: string, body: unknown, headers?: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: "PATCH",
		body
	});
	return response.data;
};

const deleteRequest = async (url: string, headers?: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: "DELETE"
	});
	return response.data;
};

export default {
	get,
	post,
	put,
	patch,
	delete: deleteRequest
};
