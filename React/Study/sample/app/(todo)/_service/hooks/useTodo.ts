"use client";
import { useState } from "react";

export interface TM_FILENAME_BASEProps {}

const useTodo = () => {
	const [todo, setTodo] = useState([]);

	return {
		todo,
		setTodo
	};
};

export default useTodo;
