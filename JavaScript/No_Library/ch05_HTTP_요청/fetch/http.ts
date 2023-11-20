type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestParams {
	method?: RequestMethod;
	url: string;
	headers?: HeadersInit;
	body?: any;
}

interface ResponseData<T> {
	status: number;
	data?: T;
}

const parseResponse = async <T>(
	response: Response
): Promise<ResponseData<T>> => {
	const { status } = response;
	let data: T | undefined;

	if (status !== 204) {
		data = (await response.json()) as T;
	}

	return {
		status,
		data
	};
};

const request = async <T>(params: RequestParams): Promise<ResponseData<T>> => {
	const { method = "GET", url, headers = {}, body } = params;

	const config: RequestInit = {
		method,
		headers: new Headers(headers)
	};

	if (body) {
		config.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, config);
		return parseResponse(response);
	} catch (error) {
		throw new Error("HTTP Error");
	}
};

const get = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
	const response = await request<T>({ url, headers, method: "GET" });
	return response.data!;
};

const post = async <T>(
	url: string,
	body: any,
	headers?: HeadersInit
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "POST", body });
	return response.data!;
};

const put = async <T>(
	url: string,
	body: any,
	headers?: HeadersInit
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "PUT", body });
	return response.data!;
};

const patch = async <T>(
	url: string,
	body: any,
	headers?: HeadersInit
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "PATCH", body });
	return response.data!;
};

const deleteRequest = async <T>(
	url: string,
	headers?: HeadersInit
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "DELETE" });
	return response.data!;
};

export default {
	get,
	post,
	put,
	patch,
	delete: deleteRequest
};
