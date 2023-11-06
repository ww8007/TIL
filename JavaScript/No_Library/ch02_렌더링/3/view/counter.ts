import { State, Todo } from "../type";

const getTodoCount = (todos: Todo[]) => {
	const notCompleted = todos.filter((todo) => !todo.completed);

	const { length } = notCompleted;
	if (length === 1) {
		return "1 Item left";
	}

	return `${length} Items left`;
};

export default (targetElement: HTMLElement, { todos }: State) => {
	const newCounter = targetElement.cloneNode(true);

	newCounter.textContent = getTodoCount(todos);
	console.log("newCounter", newCounter);
	return newCounter as HTMLElement;
};
