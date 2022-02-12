const initialState = {
	tasks: []
};

export default function reducer(state = initialState, action) {
	if (action.type === 'setTasks') {
		const { tasks } = action.payload;
		return {
			...state,
			tasks
		};
	}
	if (action.type === 'deleteTask') {
		const { id } = action.payload;
		const { tasks } = state;
		return {
			...state,
			tasks: tasks.filter((task) => task.id !== id)
		};
	}
	return state;
}
