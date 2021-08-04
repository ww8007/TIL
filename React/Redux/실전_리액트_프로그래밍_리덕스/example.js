function addTodo({ title, priority }) {
  return { type: 'todo/APP', title, priority };
}

function removeTodo({ id }) {
  return { type: 'todo/REMOVE', id };
}
