import axios, { AxiosRequestConfig } from "axios";
import type { RawAxiosRequestHeaders } from "axios";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestParams {
	method?: RequestMethod;
	url: string;
	headers?: RawAxiosRequestHeaders;
	body?: any;
}

interface ResponseData<T> {
	status: number;
	data?: T;
}

const request = async <T>(params: RequestParams) => {
	const { method = "GET", url, headers = {}, body } = params;

	const config: AxiosRequestConfig = {
		url,
		method,
		headers,
		data: body
	};

	return axios(config) as Promise<ResponseData<T>>;
};

const get = async <T>(
	url: string,
	headers?: RawAxiosRequestHeaders
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "GET" });
	return response.data!;
};

const post = async <T>(
	url: string,
	body: any,
	headers?: RawAxiosRequestHeaders
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "POST", body });
	return response.data!;
};

const put = async <T>(
	url: string,
	body: any,
	headers?: RawAxiosRequestHeaders
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "PUT", body });
	return response.data!;
};

const patch = async <T>(
	url: string,
	body: any,
	headers?: RawAxiosRequestHeaders
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "PATCH", body });
	return response.data!;
};

const deleteRequest = async <T>(
	url: string,
	headers?: RawAxiosRequestHeaders
): Promise<T> => {
	const response = await request<T>({ url, headers, method: "DELETE" });
	return response.data!;
};

const http = {
	get,
	post,
	put,
	patch,
	delete: deleteRequest
};

export default http;
