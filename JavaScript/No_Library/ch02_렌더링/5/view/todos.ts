import { State, Todo } from "../core/type";

const getTodoElement = (todo: Todo) => {
	const { text, completed } = todo;

	return `
      <li ${completed ? 'class="completed"' : ""}>
        <div class="view">
          <input 
            ${completed ? "checked" : ""}
            class="toggle" 
            type="checkbox">
          <label>${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
      </li>`;
};

export default (targetElement: HTMLElement, { todos }: State) => {
	const newTodoList = targetElement.cloneNode(true) as HTMLElement;
	const todosElements = todos.map(getTodoElement).join("");
	newTodoList.innerHTML = todosElements;
	return newTodoList;
};
