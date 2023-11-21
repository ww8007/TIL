import {
	AxiosHeaders,
	AxiosRequestHeaders,
	RawAxiosRequestHeaders
} from "axios";
import http from "./http";

export interface Todo {
	text?: string;
	completed: boolean;
	id: string;
}

const HEADERS: RawAxiosRequestHeaders = {
	"Content-Type": "application/json"
};

const BASE_URL = "/api/todos";

const list = () => http.get(BASE_URL) as Promise<Todo[]>;

const create = (text: string) => {
	const todo = {
		text,
		completed: false
	};

	return http.post(BASE_URL, todo, HEADERS);
};

const update = (newTodo: Todo) => {
	const url = `${BASE_URL}/${newTodo.id}`;
	return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id: string) => {
	const url = `${BASE_URL}/${id}`;
	return http.delete(url);
};

export default {
	list,
	create,
	update,
	delete: deleteTodo
};
